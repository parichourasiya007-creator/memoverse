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
  copyDir('dist', 'docs');
  if (fs.existsSync('dist/assets')) {
    copyDir('dist/assets', 'assets');
  }
  if (fs.existsSync('dist/index.html')) {
    fs.copyFileSync('dist/index.html', 'index.html');
  }
  console.log('✅ Postbuild sync complete: dist -> docs, assets, index.html!');
}
