import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GoalsPage from './pages/goals';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoalsPage />
    </QueryClientProvider>
  );
}

export default App;
