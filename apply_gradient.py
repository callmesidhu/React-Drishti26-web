import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Replace 'text-gold' (and text-gold/XX) with 'text-gold-gradient'
    # But carefully avoid replacing already 'text-gold-gradient'
    def replace_text_gold(m):
        suffix = m.group(1)
        # If it's already followed by -gradient, don't change
        if suffix and '-gradient' in suffix:
            return m.group(0)
        
        opacity = m.group(3)
        if opacity:
            return f"text-gold-gradient opacity-{opacity}"
        else:
            return "text-gold-gradient"

    content = re.sub(r'text-gold((/(\d+))?(\b|-gradient)?)', lambda m: 
        m.group(0) if m.group(4) == '-gradient' else (
            f"text-gold-gradient opacity-{m.group(3)}" if m.group(3) else "text-gold-gradient"
        ), content)

    # Replace 'bg-gold' (and bg-gold/XX) with 'bg-gold-gradient'
    content = re.sub(r'\bbg-gold((/(\d+))?(\b|-gradient)?)', lambda m: 
        m.group(0) if m.group(4) == '-gradient' else (
            f"bg-gold-gradient opacity-{m.group(3)}" if m.group(3) else "bg-gold-gradient"
        ), content)

    # Replace the tailwind gradient background (from-[#B78000] via-[#FFDB86] to-[#D4AF37]) with bg-gold-gradient
    content = re.sub(r'bg-gradient-to-r from-\[[^\]]+\] via-\[[^\]]+\] to-\[[^\]]+\]', 'bg-gold-gradient', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Applied gradients to {filepath}")

for root, dirs, files in os.walk('client/src'):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))
