import React from 'react';

interface PageTitleProps extends Omit<React.HTMLProps<HTMLHeadingElement>, 'children'> {
  children: React.ReactNode;
}

const PageTitle = ({ children, className, ...props }: PageTitleProps) => {
  return (
    <h1 className={`${className ? className : ''} text-2xl font-bold mb-4`} {...props}>
      {children}
    </h1>
  );
};

export default PageTitle;
