import { useEffect } from 'react';
import RootRouter from './RootRouter';

import './index.css';
import { healthCheck } from './apis';

const App = () => {
  useEffect(() => {
    const isFirstVisit = Boolean(localStorage.getItem('firstVisit'));
    if (!isFirstVisit) {
      localStorage.setItem('firstVisit', 'true');
      healthCheck('rest').then((res) => {
        console.log(res);
      });
    }
  }, []);

  return <RootRouter />;
};

export default App;
