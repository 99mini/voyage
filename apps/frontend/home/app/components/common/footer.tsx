import React from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { siteUrl } from '~/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-2">
            <h4 className="text-base font-bold">{'사이트 맵'}</h4>
            {siteMap.map((site) => (
              <a key={site.href} href={site.href} className="text-sm hover:underline hover:text-blue-400">
                {site.text}
              </a>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            <h4 className="text-base font-bold">{'Projects'}</h4>
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center space-x-2 hover:underline hover:text-blue-400"
              >
                <span>{project.text}</span>
                {project.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 items-center justify-center text-sm text-gray-400">
          <p>{metadata.copyright}</p>
          <a href="https://github.com/99mini" className="hover:underline">
            {metadata.author}
          </a>
        </div>
      </div>
    </footer>
  );
}

const metadata = {
  author: '99mini',
  copyright: `© ${new Date().getFullYear()} zerovoyage. All rights reserved.`,
};

const siteMap: {
  href: string;
  text: string;
}[] = [
  { href: `${siteUrl}/`, text: '홈' },
  { href: `${siteUrl}/sitemap.xml`, text: '사이트맵' },
];

const projects: {
  href: string;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    href: 'https://tool.zerovoyage.com/',
    text: '웹 도구',
    icon: <SquareArrowOutUpRight className="w-4 h-4" />,
  },
  {
    href: 'https://tech.zerovoyage.com',
    text: '기술 블로그',
    icon: <SquareArrowOutUpRight className="w-4 h-4" />,
  },
  {
    href: 'https://coin.zerovoyage.com',
    text: 'Crypto Analytics',
    icon: <SquareArrowOutUpRight className="w-4 h-4" />,
  },
];
