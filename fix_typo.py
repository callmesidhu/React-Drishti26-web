import os

def fix_typos(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    content = content.replace('text-gold-gradient-gradient', 'text-gold-gradient')
    content = content.replace('bg-gold-gradient-gradient', 'bg-gold-gradient')

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for root, dirs, files in os.walk('client/src'):
    for file in files:
        if file.endswith('.jsx'):
            fix_typos(os.path.join(root, file))
