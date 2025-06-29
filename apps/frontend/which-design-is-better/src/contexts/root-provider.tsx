import ReactQueryProvider from './react-query';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default RootProvider;
