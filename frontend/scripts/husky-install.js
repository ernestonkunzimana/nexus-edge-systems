const { execSync } = require('child_process');

// Skip husky install when running in CI or when HUSKY=0 is set
if (process.env.CI || process.env.HUSKY === '0') {
  console.log('Skipping husky install in CI or when HUSKY=0 is set');
  process.exit(0);
}

try {
  console.log('Running husky install...');
  execSync('npx husky install', { stdio: 'inherit' });
} catch (err) {
  console.warn('husky install failed, continuing. Error:', err && err.message);
  // Do not fail the install if husky cannot be installed
  process.exit(0);
}
