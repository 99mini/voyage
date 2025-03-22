import PageTitle from '../common/page-title';

type RootLayoutProps = {
  title?: string;
  children: React.ReactNode;
};

const RootLayout = ({ title, children }: RootLayoutProps) => {
  return (
    <div className="container mx-auto flex flex-col flex-grow">
      {title && <PageTitle>{title}</PageTitle>}
      {children}
    </div>
  );
};

export default RootLayout;
