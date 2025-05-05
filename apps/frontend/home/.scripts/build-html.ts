import fs from 'fs';
import path from 'path';

import { render } from '../src/entry-server';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const manifestPath = path.resolve(__dirname, '../dist/.vite/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const entry = manifest['src/entry-client.tsx'];
const jsFile = entry?.file;
const cssFiles = entry?.css || [];

console.log('manifest js:', jsFile);
console.log('manifest css:', cssFiles);

const cssLinks = cssFiles.map((href: string) => `<link rel="stylesheet" href="./${href}">`).join('\n');

const jsScript = jsFile ? `<script type="module" src="./${jsFile}"></script>` : '';

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>zerovoyage</title>
    <meta property="og:title" content="zerovoyage" />
    <meta property="og:description" content="zerovoyage" />
    <meta property="og:url" content="https://zerovoyage.com/" />
    <meta name="description" content="zerovoyage" />
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2L0YWL45W7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-2L0YWL45W7');
    </script>
    ${cssLinks}
  </head>
  <body>
    <div id="root">${render()}</div>
    ${jsScript}
  </body>
</html>
`;

fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), html);
console.log('✅ Static HTML generated.');
