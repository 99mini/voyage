import { Link } from 'react-router';

import { PAGE_PATH, PAGE_TITLE } from '@/lib/constants/route.constant';

const Header = () => {
  return (
    <header className="py-2 px-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center ">
        <h1 className="text-2xl font-bold">
          <Link to={PAGE_PATH.ROOT}>{'Awesome'}</Link>
        </h1>
        <div className="flex gap-4">
          {Object.entries(PAGE_PATH)
            .slice(1)
            .map(([key, value]) => (
              <Link key={value} to={value} className="text-blue-400 underline hover:text-blue-600">
                {PAGE_TITLE[key as keyof typeof PAGE_TITLE]}
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
