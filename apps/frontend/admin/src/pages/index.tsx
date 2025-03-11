import { Link } from 'react-router';

import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE, ROUTE_PATH } from '@/lib/route-constants';

function Home() {
  return (
    <RootLayout title={PAGE_TITLE.ROOT}>
      <ul className="space-y-2">
        {Object.entries(ROUTE_PATH).map(([key, path]) => {
          const title = PAGE_TITLE[key as keyof typeof PAGE_TITLE];
          return (
            <li key={title} className="text-blue-400 underline hover:text-blue-600">
              <Link to={path} about={'This is a link to ' + title} aria-description={'This is a link to ' + title}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </RootLayout>
  );
}

export default Home;
