import os

def restore_colors(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Restore the button gradients
    content = content.replace('from-[#D4AF37] via-[#D4AF37] to-[#D4AF37]', 'from-[#B78000] via-[#FFDB86] to-[#D4AF37]')
    
    # In index.css, restore the text-gold-gradient and bg-gold-gradient and scrollbar
    if 'index.css' in filepath:
        content = content.replace(
            'linear-gradient(175deg, #D4AF37 0%, #D4AF37 45%, #A27200 65%, #A37200 79%, #D4AF37 92%)',
            'linear-gradient(175deg, #B78000 0%, #FFDB86 45%, #A27200 65%, #A37200 79%, #D4AF37 92%)'
        )
        content = content.replace(
            'linear-gradient(180deg, #D4AF37 0%, #D4AF37 45%, #A27200 65%, #A37200 79%, #D4AF37 92%, #D4AF37 100%)',
            'linear-gradient(180deg, #B78000 0%, #FFDB86 45%, #A27200 65%, #A37200 79%, #D4AF37 92%, #D4AF37 100%)'
        )

    # For text that was changed to solid gold but should be gradient
    # The user says "all the title text and yellow like text (non white text) and all button"
    # So wherever we have text-gold, maybe we should change it to text-gold-gradient?
    # Let's just restore the gradients first and see.

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Restored {filepath}")

for root, dirs, files in os.walk('client/src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css') or file.endswith('.js'):
            restore_colors(os.path.join(root, file))
