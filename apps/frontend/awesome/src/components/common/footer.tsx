import { Link, useLocation } from 'react-router';

import { cn } from '@packages/vds';

import { PAGE_PATH, PAGE_TITLE } from '@/lib/constants/route.constant';

const author = 'Zerovoyage';
const year = new Date().getFullYear();
const githubUrl = 'https://github.com/99mini/voyage';
const version = '0.2.1';

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <footer className={cn('bg-white border-t border-gray-200 py-4 px-6')}>
      <div className="container mx-auto flex flex-col justify-center items-center gap-4">
        {/* SITE INFO */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600">{`© ${year} ${author}. All rights reserved.`}</p>
          </div>
          {version && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm text-gray-600">{`Version: ${version}`}</p>
            </div>
          )}
        </div>

        {/* LINKS */}
        <div className="w-full flex flex-row justify-center items-center gap-4">
          {Object.entries(PAGE_PATH).map(([key, value]) => (
            <Link
              key={value}
              to={value}
              className={cn(
                'text-sm text-gray-600 hover:text-gray-900',
                path === value && 'text-gray-900 font-semibold',
              )}
            >
              {PAGE_TITLE[key as keyof typeof PAGE_TITLE]}
            </Link>
          ))}
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {`GitHub`}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
