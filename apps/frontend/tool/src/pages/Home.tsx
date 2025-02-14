import { ROUTE_PATH, PAGE_TITLE } from '@/constant';
import { Link } from 'react-router';

function Home() {
  return (
    <div className="container mx-auto">
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
    </div>
  );
}

export default Home;
