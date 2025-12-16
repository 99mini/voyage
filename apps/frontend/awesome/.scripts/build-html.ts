import fs from 'fs';
import path from 'path';

import { render } from '../src/entry-server';

// 경로별 메타데이터 정의
const ROUTE_METADATA: Record<
  string,
  {
    path: string;
    title: string;
    description: string;
    filename: string;
  }
> = {
  root: {
    path: '/',
    title: 'Awesome Web',
    description: 'Awesome Web - Explore amazing tools and features',
    filename: 'index.html',
  },
  clock: {
    path: '/clock',
    title: 'Clock - Awesome Web',
    description: 'Beautiful clock interface',
    filename: 'clock.html',
  },
  graph: {
    path: '/graph',
    title: 'Graph - Awesome Web',
    description: 'Interactive graph visualization',
    filename: 'graph.html',
  },
  analog: {
    path: '/analog',
    title: 'Analog - Awesome Web',
    description: 'Analog clock and visualization',
    filename: 'analog.html',
  },
};

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

  // 각 경로별로 HTML 생성
  for (const metadata of Object.values(ROUTE_METADATA)) {
    console.log(`\n🔨 Generating ${metadata.filename} for ${metadata.path}...`);

    const renderedContent = render(metadata.path);

    const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${metadata.title}</title>
      <meta property="og:title" content="${metadata.title}" />
      <meta property="og:description" content="${metadata.description}" />
      <meta property="og:url" content="https://awesome.zerovoyage.com${metadata.path}" />
      <meta name="description" content="${metadata.description}" />
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
      <div id="root">${renderedContent}</div>
      ${jsScript}
    </body>
  </html>
  `;

    const outputPath = path.resolve(__dirname, `../dist/${metadata.filename}`);
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Generated: ${metadata.filename}`);
  }

  fs.writeFileSync(path.resolve(__dirname, '../dist/404.html'), html404);
  console.log('✅ Generated: 404.html');
};

buildHTMLAsync()
  .then(() => console.log('\n✅ All static HTML files generated successfully!'))
  .catch((err) => console.error('❌ Static HTML generation failed.', err));
