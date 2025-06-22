import fs from 'fs';
import path from 'path';

import { render } from '../src/entry-server';

const buildHTMLAsync = async () => {
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

  const html404 = fs.readFileSync(path.resolve(__dirname, '../404.html'), 'utf-8');

  const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Awesome Web</title>
      <meta property="og:title" content="Awesome Web" />
      <meta property="og:description" content="Awesome Web" />
      <meta property="og:url" content="https://awesome.zerovoyage.com/" />
      <meta name="description" content="Awesome Web" />
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-V5CT85XR4C"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-V5CT85XR4C');
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
  fs.writeFileSync(path.resolve(__dirname, '../dist/404.html'), html404);
};

buildHTMLAsync()
  .then(() => console.log('✅ Static HTML generated.'))
  .catch((err) => console.error('❌ Static HTML generation failed.', err));
