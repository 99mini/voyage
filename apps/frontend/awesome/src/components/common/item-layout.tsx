import { cn } from '@packages/vds';

import useScrollToHash from '@/hooks/use-scroll-to-hash';

import { pascalCaseToKebabCase } from '@/lib/utils/string';

import Description from './description';

type ItemLayoutProps = {
  title: string;
  description?: string;
  hash?: string;
  children: React.ReactNode;
};

const ItemLayout = ({ title, description, hash, children }: ItemLayoutProps) => {
  // 해시가 있으면 해당 해시로 스크롤할 수 있는 ref 생성
  const hashValue = hash ? pascalCaseToKebabCase(hash) : undefined;
  const ref = useScrollToHash(hashValue);

  return (
    <div ref={ref} id={hashValue} className="flex flex-col gap-2 w-full items-center justify-center">
      {hash ? (
        <a href={`#${hashValue}`} className="relative w-full">
          <h3
            className={cn(
              'w-full sm:text-xl text-lg font-bold transition',
              'hover:underline hover:text-blue-400 hover:cursor-pointer',
              'hover:before:content-["#"] hover:before:absolute hover:before:top-0 hover:before:sm:left-[-24px] hover:before:left-[-16px]',
            )}
          >
            {title}
          </h3>
        </a>
      ) : (
        <h3 className={cn('w-full sm:text-xl text-lg font-bold')}>{title}</h3>
      )}
      {children}
      {description && <Description>{description}</Description>}
    </div>
  );
};

export default ItemLayout;
