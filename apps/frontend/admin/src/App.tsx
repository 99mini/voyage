import RootProvider from './contexts/root-provider';
import RootRouter from './routes/root-router';

import './index.css';

const App = () => {
  return (
    <RootProvider>
      <RootRouter />
    </RootProvider>
  );
};

export default App;
