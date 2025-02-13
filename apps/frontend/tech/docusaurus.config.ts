import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'voyage tech blog',
  tagline: 'zero voyage 기술 블로그',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://tech.zerovoyage.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '99mini', // Usually your GitHub org/user name.
  projectName: '99mini/voyage', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
    localeConfigs: {
      ko: {
        label: '한국어',
        htmlLang: 'ko',
      },
    },
    // locales: ['ko', 'en'],
    // localeConfigs: {
    //   ko: {
    //     label: '한국어',
    //     htmlLang: 'ko',
    //   },
    //   en: {
    //     label: 'English',
    //     htmlLang: 'en',
    //   },
    // },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'GTM-T5H7BW9D',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Tech',
      logo: {
        alt: 'Tech Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'computerScience',
          position: 'left',
          label: 'CS',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        // TODO: 국제화를 위해서는 서버를 같이 배포해야됨.
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
        {
          href: 'https://github.com/99mini',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'computer science',
              to: '/docs/intro',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/99mini',
            },
            {
              label: 'mail',
              to: 'mailto:0mini9939@gmail.com',
            },
          ],
        },
        {
          title: 'Production',
          items: [
            {
              label: 'Tool',
              href: 'https://tool.zerovoyage.com',
            },
          ],
        },
        {
          title: 'Etc',
          items: [
            {
              label: 'sitemap',
              href: 'https://tech.zerovoyage.com/sitemap.xml',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zero Voyage Tech. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
