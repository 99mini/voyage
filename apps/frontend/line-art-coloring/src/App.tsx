import RootRouter from './routes/root-router';

import RootProvider from './contexts/root-provider';

import './index.css';

const App = () => {
  return (
    <RootProvider>
      <RootRouter />
    </RootProvider>
  );
};

export default App;
