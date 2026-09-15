import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distPath = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist directory does not exist. Run npm run build first.');
  process.exit(1);
}

// Add .nojekyll and copy 404.html if needed
fs.writeFileSync(path.join(distPath, '.nojekyll'), '');
if (!fs.existsSync(path.join(distPath, '404.html')) && fs.existsSync(path.join(distPath, 'index.html'))) {
  fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'));
}

console.log('📦 Deploying dist build to gh-pages branch...');

try {
  // Initialize temporary git repo in dist
  execSync('git init', { cwd: distPath, stdio: 'inherit' });
  execSync('git config user.name "parichourasiya007-creator"', { cwd: distPath, stdio: 'inherit' });
  execSync('git config user.email "parichourasiya007@gmail.com"', { cwd: distPath, stdio: 'inherit' });
  execSync('git add -A', { cwd: distPath, stdio: 'inherit' });
  execSync('git commit -m "Deploy production build to gh-pages"', { cwd: distPath, stdio: 'inherit' });
  execSync('git remote add origin https://github.com/parichourasiya007-creator/memoverse.git', { cwd: distPath, stdio: 'inherit' });
  execSync('git push -f origin HEAD:gh-pages', { cwd: distPath, stdio: 'inherit' });
  console.log('✅ SUCCESS: Deployed dist/ directly to origin/gh-pages!');
} catch (err) {
  console.error('❌ Deployment to gh-pages failed:', err);
  process.exit(1);
} finally {
  const gitInDist = path.join(distPath, '.git');
  if (fs.existsSync(gitInDist)) {
    fs.rmSync(gitInDist, { recursive: true, force: true });
  }
}
