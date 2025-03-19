import { cn } from '@packages/vds';

import { pascalCaseToKebabCase } from '@/lib/utils/string';

const ThemeLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-8 py-4 sm:px-0 px-4 w-full items-center justify-center">
      <a
        href={`#${pascalCaseToKebabCase(title)}`}
        className={cn(
          'w-full transition relative',
          'text-xl sm:text-2xl font-bold text-gray-800',
          'hover:underline hover:text-blue-400 hover:cursor-pointer',
        )}
      >
        <h2
          className={cn(
            'hover:before:content-["#"] hover:before:absolute hover:before:top-0 hover:before:sm:left-[-24px] hover:before:left-[-16px]',
          )}
        >
          {title}
        </h2>
      </a>
      {children}
    </div>
  );
};

export default ThemeLayout;
