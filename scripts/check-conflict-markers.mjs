import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'coverage']);
const SKIP_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.ico', '.lock']);
const markerPattern = /^(<<<<<<<|=======|>>>>>>>)/m;

const files = [];

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = full.replace(`${ROOT}/`, '');
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      walk(full);
      continue;
    }
    if ([...SKIP_EXT].some((ext) => rel.endsWith(ext))) continue;
    files.push(full);
  }
};

walk(ROOT);

const offenders = [];
for (const file of files) {
  const content = readFileSync(file, 'utf8');
  if (markerPattern.test(content)) offenders.push(file.replace(`${ROOT}/`, ''));
}

if (offenders.length) {
  console.error('Merge conflict markers found in:');
  offenders.forEach((f) => console.error(` - ${f}`));
  process.exit(1);
}

console.log('No merge conflict markers found.');
