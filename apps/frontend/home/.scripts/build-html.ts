import fs from 'fs';
import path from 'path';

import { render } from '../src/entry-server';

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
  </head>
  <body>
    <div id="root">${render()}</div>
    <script type="module" src="/entry-client.js"></script>
  </body>
</html>
`;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), html);
console.log('✅ Static HTML generated.');
