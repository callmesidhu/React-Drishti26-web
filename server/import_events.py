#!/usr/bin/env python
import json
import os
import re
import shutil
import sys
from pathlib import Path

import django

"""Import events data from json to database"""


# Docker compose command to import events data........
""""docker compose run --rm \
  -v "$PWD:/workspace" \
  server \
  python /workspace/server/import_events.py \
    /workspace/client/src/data/workshop.json \
    /workspace/client/src/data/competition.json \
    /workspace/client/src/data/daksha.json"""


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from api.models import Event, EventLink  # noqa: E402
from django.conf import settings  # noqa: E402

DATA_KEYS = {
    "workshopsData": Event.EventType.WORKSHOP,
    "competitionsData": Event.EventType.COMPETITION,
    "dakshaEventsData": Event.EventType.DAKSHA,
}


def lines_to_text(value):
    if isinstance(value, list):
        return "\n".join(str(line).strip() for line in value if str(line).strip())
    return str(value or "").strip()


def get_prize_pool(event_data):
    details = event_data.get("details", [])
    if not isinstance(details, list):
        return 0

    for detail in details:
        if re.search(r"prize\s*pool|price\s*pool", str(detail), re.IGNORECASE):
            digits = re.sub(r"\D", "", str(detail))
            return int(digits or 0)

    return 0


def copy_poster(image_path):
    image_path = str(image_path or "").strip()
    if not image_path:
        return ""

    relative_image_path = image_path.lstrip("/")
    repo_root = Path(__file__).resolve().parent.parent
    candidate_roots = [
        repo_root / "public",
        repo_root / "client" / "public",
    ]

    assets_root = os.environ.get("EVENT_ASSETS_ROOT")
    if assets_root:
        candidate_roots.insert(0, Path(assets_root).expanduser().resolve())

    source_path = None
    for candidate_root in candidate_roots:
        candidate_path = candidate_root / relative_image_path
        if candidate_path.exists():
            source_path = candidate_path
            break

    if source_path is None:
        print(f"Poster not found, storing original path: {image_path}")
        return relative_image_path

    destination_dir = Path(settings.MEDIA_ROOT) / "events" / "posters"
    destination_dir.mkdir(parents=True, exist_ok=True)
    destination_path = destination_dir / source_path.name
    shutil.copy2(source_path, destination_path)

    return str(Path("events") / "posters" / source_path.name)


def get_links(event_data):
    links = []

    for option in event_data.get("registerOptions", []):
        label = option.get("label")
        url = option.get("url")
        if label and url:
            links.append((label, url))

    if event_data.get("registerUrl"):
        links.append(("REGISTER", event_data["registerUrl"]))

    if event_data.get("Guidelines"):
        links.append(("GUIDELINES", event_data["Guidelines"]))

    return links


def import_event(event_data, event_type):
    slug = event_data.get("slug")
    title = event_data.get("title")

    if not slug or not title:
        raise ValueError(f"Event is missing slug/title: {event_data}")

    event, created = Event.objects.update_or_create(
        slug=slug,
        defaults={
            "title": title,
            "event_type": event_type,
            "area": event_data.get("area", ""),
            "description": event_data.get("description", ""),
            "poster": copy_poster(event_data.get("image")),
            "details": lines_to_text(event_data.get("details")),
            "eligibility": lines_to_text(event_data.get("eligibility")),
            "is_published": True,
        },
    )

    EventLink.objects.filter(event=event).delete()
    for index, (label, url) in enumerate(get_links(event_data)):
        EventLink.objects.create(event=event, label=label, url=url, sort_order=index)

    print(f"{'Created' if created else 'Updated'}: {event.title}")


def import_json_file(json_file):
    with Path(json_file).open(encoding="utf-8") as handle:
        data = json.load(handle)

    imported_count = 0
    for data_key, event_type in DATA_KEYS.items():
        for event_data in data.get(data_key, []):
            import_event(event_data, event_type)
            imported_count += 1

    if imported_count == 0:
        print(f"No events found in {json_file}")

    return imported_count


def mark_featured_competitions(json_files):
    competition_events = []

    for json_file in json_files:
        with Path(json_file).open(encoding="utf-8") as handle:
            data = json.load(handle)

        competition_events.extend(data.get("competitionsData", []))

    featured_slugs = [
        event_data["slug"]
        for event_data in sorted(competition_events, key=get_prize_pool, reverse=True)[
            :3
        ]
        if event_data.get("slug")
    ]

    Event.objects.filter(event_type=Event.EventType.COMPETITION).update(
        is_featured=False
    )
    Event.objects.filter(slug__in=featured_slugs).update(is_featured=True)

    if featured_slugs:
        print(f"Marked featured competitions: {', '.join(featured_slugs)}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python import_events.py <json-file> [<json-file> ...]")
        raise SystemExit(1)

    total_count = 0
    for json_file in sys.argv[1:]:
        total_count += import_json_file(json_file)

    mark_featured_competitions(sys.argv[1:])
    print(f"Done. Imported {total_count} event(s).")


if __name__ == "__main__":
    main()
