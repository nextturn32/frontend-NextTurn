// build.js
const fs = require('fs');
const { execSync } = require('child_process');

console.log('Building TailwindCSS...');
execSync('npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify', { stdio: 'inherit' });

// Ensure dist folder exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

console.log('Build completed!');