import { cn } from '@packages/vds';

import { pascalCaseToKebabCase } from '@/lib/utils/string';

import Description from './description';

type ItemLayoutProps = {
  title: string;
  description?: string;
  hash?: string;
  children: React.ReactNode;
};

const ItemLayout = ({ title, description, hash, children }: ItemLayoutProps) => {
  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center">
      {hash ? (
        <a href={`#${pascalCaseToKebabCase(hash)}`} className="relative">
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
