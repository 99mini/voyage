import RootRouter from './routes/root-router';

import RootProvider from './contexts/root-provider';

const App = () => {
  return (
    <RootProvider>
      <RootRouter />
    </RootProvider>
  );
};

export default App;
