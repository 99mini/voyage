import 'dotenv/config';
import { themes as prismThemes } from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

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
  // organizationName: '99mini', // Usually your GitHub org/user name.
  // projectName: '99mini/voyage', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // plugins
  plugins: ['docusaurus-lunr-search'],

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

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
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
          trackingID: ['GTM-T5H7BW9D', 'G-XGTRW7NV9N'],
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
          label: 'Docs',
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
              label: 'Zero Voyage',
              href: 'https://about.zerovoyage.com',
            },
            {
              label: 'Crypto Monitor',
              href: 'https://crypto-monitor-swart.vercel.app/zerovoyage.com',
            },
            {
              label: 'Tool',
              href: 'https://tool.zerovoyage.com',
            },
            {
              label: 'Design',
              href: 'https://design.zerovoyage.com',
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
            {
              label: 'tags',
              to: 'docs/tags',
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

  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],
};

export default config;
