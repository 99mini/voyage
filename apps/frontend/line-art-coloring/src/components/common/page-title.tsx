import React from 'react';

import { cn } from '@packages/vds';

interface PageTitleProps extends Omit<React.HTMLProps<HTMLHeadingElement>, 'children'> {
  children: React.ReactNode;
}

const PageTitle = ({ children, className, ...props }: PageTitleProps) => {
  return (
    <h1 className={cn('text-2xl font-bold mb-4', className)} {...props}>
      {children}
    </h1>
  );
};

export default PageTitle;
