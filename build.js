// build.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

try {
  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  // Build TailwindCSS using Node API
  console.log('Building TailwindCSS...');
  const tailwind = require('tailwindcss/lib/cli.js');
  tailwind([
    '-i', './src/input.css',
    '-o', './dist/output.css',
    '--minify'
  ]);

  // Copy HTML files
  console.log('Copying HTML files...');
  const cpx = require('cpx');
  cpx.copySync('*.html', 'dist/');
  
  // Copy assets if they exist
  if (fs.existsSync('assets')) {
    console.log('Copying assets...');
    cpx.copySync('assets/**/*', 'dist/assets/');
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}