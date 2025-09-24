// build.js
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

console.log('Building CSS...');

// Read input CSS
const inputCss = fs.readFileSync('./src/input.css', 'utf8');

// Process with TailwindCSS
postcss([
  tailwindcss,
  require('autoprefixer')
])
.process(inputCss, {
  from: './src/input.css',
  to: './dist/output.css'
})
.then(result => {
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Write output CSS
  fs.writeFileSync('./dist/output.css', result.css);
  
  // Copy HTML files
  const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
  htmlFiles.forEach(file => {
    fs.copyFileSync(file, path.join('dist', file));
  });
  
  // Copy assets if exists
  if (fs.existsSync('assets')) {
    const cpx = require('cpx');
    cpx.copySync('assets/**/*', 'dist/assets/');
  }
  
  console.log('Build completed successfully!');
})
.catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});