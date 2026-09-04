const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetRegex1 = /drop-shadow-\[.*?\]/g;
const targetRegex2 = /shadow-\[.*?\]/g;

// Glow colors to match
const glowColors = [
  '212,175,55',
  '255,219,134',
  '#D4AF37',
  '#FFDB86',
  '183,128,0',
  '255,255,255'
];

walkDir('client/src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.css') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Remove drop-shadow if it has a gold/yellow color
    content = content.replace(targetRegex1, (match) => {
      if (glowColors.some(c => match.includes(c))) {
        changed = true;
        return '';
      }
      return match;
    });

    // Remove shadow if it has a gold/yellow color
    content = content.replace(targetRegex2, (match) => {
      // Don't remove black shadows
      if (glowColors.some(c => match.includes(c)) && !match.includes('0,0,0')) {
        changed = true;
        return '';
      }
      return match;
    });

    // Replace #FFDB86 with #D4AF37
    if (content.includes('#FFDB86')) {
        content = content.replace(/#FFDB86/gi, '#D4AF37');
        changed = true;
    }
    
    // Replace text-yellow-500, text-yellow-400 etc with text-gold
    if (content.match(/text-yellow-\d00/)) {
        content = content.replace(/text-yellow-\d00/g, 'text-gold');
        changed = true;
    }

    if (changed) {
      // clean up double spaces from removed classes
      content = content.replace(/  +/g, ' ');
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});
