#!/usr/bin/env node
/**
 * validate-images.cjs
 *
 * Scans src/data/destinations.ts and src/data/packages.ts for all
 * /images/... references and checks that each file exists under public/.
 *
 * Exits with code 1 (and prints a clear error list) if any images are missing.
 * Run:  node scripts/validate-images.cjs
 * Or:   npm run validate-images
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const PUBLIC    = path.join(ROOT, 'public');
const DATA_FILES = [
  path.join(ROOT, 'src', 'data', 'destinations.ts'),
  path.join(ROOT, 'src', 'data', 'packages.ts'),
];

// Match any string literal that starts with /images/
const IMAGE_PATH_RE = /['"](\/images\/[^'"]+)['"]/g;

function extractImagePaths(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const paths = new Set();
  let m;
  IMAGE_PATH_RE.lastIndex = 0;
  while ((m = IMAGE_PATH_RE.exec(src)) !== null) {
    paths.add(m[1]);
  }
  return paths;
}

function main() {
  const allPaths = new Set();
  for (const file of DATA_FILES) {
    for (const p of extractImagePaths(file)) {
      allPaths.add(p);
    }
  }

  const missing = [];
  for (const imgPath of [...allPaths].sort()) {
    const fullPath = path.join(PUBLIC, imgPath);
    if (!fs.existsSync(fullPath)) {
      missing.push(imgPath);
    }
  }

  const total = allPaths.size;

  if (missing.length === 0) {
    console.log(`✅  All ${total} image references verified — every file exists in public/images/.`);
    process.exit(0);
  } else {
    console.error(`\n❌  Image validation failed: ${missing.length} of ${total} referenced image(s) are missing from public/images/\n`);
    for (const p of missing) {
      console.error(`   • ${p}`);
    }
    console.error('\nAdd the missing files to public/images/ or update the paths in src/data/destinations.ts / src/data/packages.ts.\n');
    process.exit(1);
  }
}

main();
