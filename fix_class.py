import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Replace 'class="' with 'className="'
    # Note: we should avoid replacing in index.html if we process it. But we only process .jsx
    content = content.replace('class="', 'className="')

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for root, dirs, files in os.walk('client/src'):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))
