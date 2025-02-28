const ROUTE_PATH = {
  ROOT: '/',
  VERTICAL_IMAGE_MERGER: '/vertical-image-merger',
  GIF_GENERATOR: '/gif-generator',
  RANDOM_PASSWORD_GENERATOR: '/random-password-generator',
};

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${Object.values(ROUTE_PATH)
      .map(
        (route) => `
    <url>
      <loc>https://tool.zerovoyage.com${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    `,
      )
      .join('')}    
</urlset>`;

console.log(SITEMAP);
