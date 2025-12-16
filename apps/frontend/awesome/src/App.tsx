import RootRouter from './routes/root-router';

import RootProvider from './contexts/root-provider';

interface AppProps {
  location?: string;
}

const App = ({ location }: AppProps = {}) => {
  return (
    <RootProvider>
      <RootRouter location={location} />
    </RootProvider>
  );
};

export default App;
