from django.db import migrations


def drop_column_if_exists(schema_editor, table_name, column_name):
    with schema_editor.connection.cursor() as cursor:
        existing_columns = {
            column.name
            for column in schema_editor.connection.introspection.get_table_description(
                cursor,
                table_name,
            )
        }

    if column_name in existing_columns:
        quoted_table = schema_editor.quote_name(table_name)
        quoted_column = schema_editor.quote_name(column_name)
        schema_editor.execute(f"ALTER TABLE {quoted_table} DROP COLUMN {quoted_column}")


def cleanup_event_schema(apps, schema_editor):
    for column_name in ("category", "poster_alt", "guidelines_title", "sort_order"):
        drop_column_if_exists(schema_editor, "api_event", column_name)

    for column_name in ("link_type", "created_at"):
        drop_column_if_exists(schema_editor, "api_eventlink", column_name)


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_event_alter_campusambassador_referral_code_eventlink"),
    ]

    operations = [
        migrations.RunPython(cleanup_event_schema, migrations.RunPython.noop),
    ]
