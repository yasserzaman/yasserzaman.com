import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function listContents(dir, depth=0) {
  if (depth > 2) return;
  try {
    const list = readdirSync(dir);
    console.log("  ".repeat(depth) + "Dir: " + dir);
    list.forEach(file => {
      if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next') return;
      const full = join(dir, file);
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          listContents(full, depth + 1);
        } else {
          console.log("  ".repeat(depth + 1) + "- " + file + " (" + stat.size + " bytes)");
        }
      } catch (e) {}
    });
  } catch (e) {
    console.log("Error listing " + dir);
  }
}

console.log("--- Listing parent /app ---");
listContents('/app');
console.log("--- Listing / ---");
listContents('/');
