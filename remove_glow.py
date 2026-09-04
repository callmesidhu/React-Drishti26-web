import os
import re

glow_colors = [
    '212,175,55',
    '255,219,134',
    '#D4AF37',
    '#FFDB86',
    '183,128,0',
    '#B78000',
    '#D89720',
    '#DF9F28'
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Regex to find drop-shadow-[...] and shadow-[...]
    # We want to match whole words like shadow-[...] 
    # Example: shadow-[0_0_12px_rgba(212,175,55,0.6)]
    
    def replacer(match):
        text = match.group(0)
        # Don't remove if it's a black shadow (e.g. rgba(0,0,0,x)) unless it also has gold
        # Wait, if it has a gold color, we strip it out.
        if any(color in text for color in glow_colors):
            return ""
        return text

    # Match shadow-[...] and drop-shadow-[...]
    # Also hover:shadow-[...] etc
    # We match an optional prefix like hover:, focus:, etc.
    content = re.sub(r'(?:hover:|focus:|active:|group-hover:)?(?:drop-)?shadow-\[[^\]]*\]', replacer, content)

    # Replace specific yellow colors with gold (#D4AF37)
    content = content.replace('#FFDB86', '#D4AF37')
    content = content.replace('#ffdb86', '#D4AF37')
    content = content.replace('#B78000', '#D4AF37')
    content = content.replace('#b78000', '#D4AF37')
    content = content.replace('#D89720', '#D4AF37')
    content = content.replace('#d89720', '#D4AF37')
    content = content.replace('#DF9F28', '#D4AF37')
    content = content.replace('#df9f28', '#D4AF37')
    
    # Wait, the title text is `text-gold-gradient` or `bg-gold-gradient`. If they want NO yellow, maybe we should also simplify the gradient to solid gold?
    # The gradient in index.css: linear-gradient(175deg, #B78000 0%, #FFDB86 45%, #A27200 65%, #A37200 79%, #D4AF37 92%)
    # If we replaced #FFDB86 and #B78000 with #D4AF37, the gradient is now mostly solid gold! 
    
    # We should clean up multiple spaces left by removing the shadow classes
    content = re.sub(r' +', ' ', content)
    # But wait, replacing ALL multiple spaces in the file will ruin indentation!
    # Instead, let's only replace multiple spaces that are on the same line and NOT at the beginning of the line.
    # Actually, it's safer to just let the extra spaces be, or only replace spaces inside classNames.
    # Let's do a safer regex for spaces inside class="..."
    
    def clean_spaces(match):
        return 'class="' + re.sub(r' +', ' ', match.group(1)).strip() + '"'

    content = re.sub(r'class="([^"]*)"', clean_spaces, content)
    content = re.sub(r'className="([^"]*)"', clean_spaces, content)
    content = re.sub(r"className='([^']*)'", lambda m: "className='" + re.sub(r' +', ' ', m.group(1)).strip() + "'", content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('client/src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css') or file.endswith('.js'):
            process_file(os.path.join(root, file))
