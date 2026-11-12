// Builds the project website (GitHub Pages) into dist/site.
//
//   npm run build:site         the project page only
//   npm run build:site:demo    the project page plus the live demo in demo/
//   npx serve dist/site        to look at the page locally (the demo needs the /harbor/ path)
//
// The page is plain HTML, CSS and JS in site/, and works when opened straight from the
// repository: its images point at ../docs/images/. This script copies the pages and
// site/assets, copies docs/images to images/ and rewrites the image paths to match.
//
// With --demo, it also copies the Angular app from dist/harbor-backup/browser to demo/.
// Build the app first with the base href GitHub Pages serves it from:
//   ng build harbor-backup --base-href /harbor/demo/

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'site');
const out = join(root, 'dist', 'site');
const withDemo = process.argv.includes('--demo');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const pages = readdirSync(src).filter((f) => f.endsWith('.html'));
for (const page of pages) {
  const html = readFileSync(join(src, page), 'utf8').replaceAll('../docs/images/', 'images/');
  if (html.includes('../')) throw new Error(`${page}: a path still points outside the site`);
  writeFileSync(join(out, page), html);
}

cpSync(join(src, 'assets'), join(out, 'assets'), { recursive: true });
cpSync(join(root, 'docs', 'images'), join(out, 'images'), { recursive: true });
writeFileSync(join(out, '.nojekyll'), '');

if (withDemo) {
  const app = join(root, 'dist', 'harbor-backup', 'browser');
  if (!existsSync(join(app, 'index.html'))) {
    throw new Error(`No app build in ${app}. Run: ng build harbor-backup --base-href /harbor/demo/`);
  }
  if (!readFileSync(join(app, 'index.html'), 'utf8').includes('<base href="/harbor/demo/">')) {
    throw new Error('The app was built without --base-href /harbor/demo/: its scripts would not load on GitHub Pages');
  }
  cpSync(app, join(out, 'demo'), { recursive: true });
}

console.log(`Site built: ${pages.length} page(s)${withDemo ? ' and the demo' : ''} → ${out}`);
