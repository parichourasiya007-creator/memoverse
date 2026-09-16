import { execSync } from 'child_process';

try {
  console.log('📌 Adding changes...');
  execSync('git add -A', { stdio: 'inherit' });
  
  console.log('📌 Committing to main...');
  execSync('git commit -m "Fix global theme contrast, badge readability, and game feedback colors"', { stdio: 'inherit' });
  
  console.log('📌 Pushing to main...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('📌 Running npm run deploy for gh-pages...');
  execSync('node scripts/deploy-gh-pages.js', { stdio: 'inherit' });
  
  console.log('🎉 ALL CHANGES COMMITTED TO MAIN AND DEPLOYED TO GH-PAGES!');
} catch (err) {
  console.error('Error during git push/deploy:', err.message);
}
