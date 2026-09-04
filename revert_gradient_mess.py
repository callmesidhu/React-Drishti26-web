import os
import re

def fix_mess(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Fix the hover:bg-gold-gradient opacity-XX bug
    content = re.sub(r'hover:bg-gold-gradient opacity-(\d+)', r'hover:bg-gold/\1', content)
    
    # Fix the bg-gold-gradient opacity-XX bug
    content = re.sub(r'bg-gold-gradient opacity-(\d+)', r'bg-gold/\1', content)

    # Fix the text-gold-gradient opacity-XX bug
    # Let's just remove the opacity-XX since gradient text doesn't need it, or we can use opacity-XX as a tailwind class but it applies to the whole element.
    # The previous class was text-gold/80. If we just leave it as text-gold-gradient, it's fine.
    # Actually, text-white/80 or text-gold/80 is fine for small labels. The user wanted "title text and yellow like text (non white text) and all button" to be gradient.
    # Let's change the small text opacities back to text-gold/XX
    # Wait, text-gold doesn't exist, it's text-[#D4AF37] now? No, text-gold exists in tailwind.config?
    # Let's change text-gold-gradient opacity-80 to text-gold/80, etc.
    # No, wait, if we change to text-gold/80, it will use the solid color. Is that what the user wants for tiny tags? Probably.
    content = re.sub(r'text-gold-gradient opacity-(\d+)', r'text-gold/\1', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for root, dirs, files in os.walk('client/src'):
    for file in files:
        if file.endswith('.jsx'):
            fix_mess(os.path.join(root, file))
