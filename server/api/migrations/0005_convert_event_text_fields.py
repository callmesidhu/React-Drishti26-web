from django.db import migrations, models


def table_sql(schema_editor, table_name):
    if schema_editor.connection.vendor != "sqlite":
        return ""

    with schema_editor.connection.cursor() as cursor:
        cursor.execute(
            "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = %s",
            [table_name],
        )
        row = cursor.fetchone()
    return row[0] if row else ""


def convert_json_field_to_text(schema_editor, model, field_name):
    sql = table_sql(schema_editor, model._meta.db_table)
    if f'JSON_VALID("{field_name}")' not in sql and f"JSON_VALID({field_name})" not in sql:
        return

    old_field = models.JSONField(default=list, blank=True)
    old_field.set_attributes_from_name(field_name)
    old_field.model = model

    new_field = models.TextField(blank=True)
    new_field.set_attributes_from_name(field_name)
    new_field.model = model

    schema_editor.alter_field(model, old_field, new_field, strict=False)


def convert_event_text_fields(apps, schema_editor):
    Event = apps.get_model("api", "Event")

    convert_json_field_to_text(schema_editor, Event, "details")
    convert_json_field_to_text(schema_editor, Event, "eligibility")


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_cleanup_event_schema"),
    ]

    operations = [
        migrations.RunPython(convert_event_text_fields, migrations.RunPython.noop),
    ]
