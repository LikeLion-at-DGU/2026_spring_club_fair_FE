import Router from './router/Router';
import useVh from '@hooks/useCalcVh';
function App() {
  useVh();
  return <Router />;
}

export default App;
