import fs from 'node:fs';
import path from 'node:path';

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Running MEMOVERSE postbuild sync...');
if (fs.existsSync('dist')) {
  // Ensure .nojekyll and 404.html exist in dist
  fs.writeFileSync(path.join('dist', '.nojekyll'), '');
  if (fs.existsSync(path.join('dist', 'index.html'))) {
    fs.copyFileSync(path.join('dist', 'index.html'), path.join('dist', '404.html'));
  }
  if (fs.existsSync('docs')) {
    fs.rmSync('docs', { recursive: true, force: true });
  }
  copyDir('dist', 'docs');
  console.log('✅ Postbuild sync complete: dist -> docs!');
}

