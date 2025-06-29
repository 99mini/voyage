import RootProvider from './contexts/root-provider';

import RootRouter from './root-router';

const App = () => {
  return (
    <RootProvider>
      <RootRouter />
    </RootProvider>
  );
};

export default App;
