const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'editors-config-v2.ts');
const targetFile = path.join(__dirname, 'editors-config.ts');

try {
  const content = fs.readFileSync(sourceFile, 'utf-8');
  fs.writeFileSync(targetFile, content, 'utf-8');
  console.log('Successfully updated editors-config.ts');
  process.exit(0);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
