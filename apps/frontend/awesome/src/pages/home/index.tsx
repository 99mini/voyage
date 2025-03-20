import { Link } from 'react-router';

import Preview from '@/components/layout/preview';
import RootLayout from '@/components/layout/root-layout';

import { PAGE_PATH, PAGE_TITLE } from '@/lib/constants/route.constant';

const HomePage = () => {
  return (
    <RootLayout title={PAGE_TITLE.ROOT}>
      {Object.entries(PAGE_PATH)
        .filter(([key]) => key !== 'ROOT')
        .map(([key, path]) => (
          <div key={path} className="flex flex-col mb-8 ">
            <h2 className="text-2xl font-bold mb-2">{PAGE_TITLE[key as keyof typeof PAGE_TITLE]}</h2>
            <Link to={path} className="text-blue-400 hover:text-blue-600 hover:underline mb-2">
              {`${PAGE_TITLE[key as keyof typeof PAGE_TITLE]} 페이지 이동`}
            </Link>
            <Preview src={path} />
          </div>
        ))}
    </RootLayout>
  );
};

export default HomePage;
