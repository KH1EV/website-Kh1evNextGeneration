const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/app', function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Change max-w-7xl to max-w-4xl for all paragraph descriptions
    // Look for <p className="... max-w-7xl ...">
    content = content.replace(/(<p className="[^"]*)max-w-7xl([^"]*")/g, '$1max-w-4xl$2');
    
    // Some might still be max-w-6xl or max-w-5xl or max-w-2xl if they were skipped
    content = content.replace(/(<p className="[^"]*hero-text[^"]*)max-w-[2356]xl([^"]*")/g, '$1max-w-4xl$2');
    
    // Also, handle login page which might have been manually updated
    if (filePath.includes('login') || filePath.includes('page.tsx')) {
      content = content.replace(/(<p className="[^"]*text-neutral-400[^"]*)max-w-[a-zA-Z0-9\[\]\-]+([^"]*")/g, '$1max-w-4xl$2');
    }

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated max-w for <p> in', filePath);
    }
  }
});
