import { Link } from 'react-router';

import { cn } from '@packages/vds';

import Preview from '@/components/layout/preview';
import RootLayout from '@/components/layout/root-layout';

import { PAGE_PATH, PAGE_TITLE } from '@/lib/constants/route.constant';
import { generateSafeHash } from '@/lib/utils/string';

const HomePage = () => {
  return (
    <RootLayout title={PAGE_TITLE.ROOT}>
      {Object.entries(PAGE_PATH)
        .filter(([key]) => key !== 'ROOT')
        .map(([key, path]) => (
          <div key={path} className="flex flex-col mb-8 ">
            <a href={`#${generateSafeHash(path)}`} className="relative">
              <h2
                className={cn(
                  'text-2xl font-bold mb-2',
                  'hover:underline hover:text-blue-400 hover:cursor-pointer',
                  'hover:before:content-["#"] hover:before:absolute hover:before:top-0 hover:before:sm:left-[-24px] hover:before:left-[-16px]',
                )}
              >
                {PAGE_TITLE[key as keyof typeof PAGE_TITLE]}
              </h2>
            </a>

            <Link to={path} className="text-blue-400 hover:text-blue-600 hover:underline mb-2">
              {`${PAGE_TITLE[key as keyof typeof PAGE_TITLE]} 페이지 이동`}
            </Link>
            <Preview src={`preview${path}`} />
          </div>
        ))}
    </RootLayout>
  );
};

export default HomePage;
