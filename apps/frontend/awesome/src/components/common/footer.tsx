import { Link } from 'react-router';

import { PAGE_PATH, PAGE_TITLE } from '@/lib/constants/route.constant';

const author = 'Zerovoyage';
const year = new Date().getFullYear();
const githubUrl = 'https://github.com/99mini/voyage';

const Footer = () => {
  const path = window.location.pathname;

  if (path.startsWith('/preview')) {
    return null;
  }

  return (
    <footer className="py-2 px-4 border-t border-gray-200">
      <div className="container mx-auto flex flex-col justify-center items-center gap-4">
        {/* SITE INFO */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="w-full flex flex-col gap-4">
            <h3 className="text-lg font-bold">{'UI Components'}</h3>
            <ul className="flex flex-col gap-2">
              {Object.entries(PAGE_PATH)
                .slice(1)
                .map(([key, value]) => (
                  <li key={value} className="">
                    <Link className="text-gray-600 transition hover:text-gray-800 hover:underline" to={value}>
                      {PAGE_TITLE[key as keyof typeof PAGE_TITLE]}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {/* COPYRIGHT */}
        <div className="flex flex-col justify-center items-center">
          <p>{`© ${year} ${author}. All rights reserved.`}</p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 transition hover:text-blue-600 hover:underline"
          >
            {`GitHub`}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
