import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = path.join(__dirname, '..', 'node_modules', '7z-wasm', '7zz.wasm');
const destFile = path.join(__dirname, '..', 'public', '7zz.wasm');

fs.copyFile(sourceFile, destFile, (err) => {
  if (err) {
    console.error('Error copying file:', err);
    process.exit(1);
  }
  console.log('7zz.wasm file copied successfully');
});
