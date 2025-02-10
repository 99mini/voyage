import { useEffect } from 'react';
import RootRouter from './RootRouter';

import './index.css';
import { healthCheck } from './apis';

const App = () => {
  /** 첫 방문자 확인 */
  useEffect(() => {
    const isFirstVisit = Boolean(localStorage.getItem('firstVisit'));
    if (!isFirstVisit) {
      localStorage.setItem('firstVisit', 'true');

      /** health check */
      healthCheck('rest').then((res) => {
        console.log(res);
      });
    }
  }, []);

  return <RootRouter />;
};

export default App;
