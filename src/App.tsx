import { DummyProvider } from './context/dummyContext';
import Dummy from './page/dummy';

function App() {
  return (
    <DummyProvider>
      <Dummy />
    </DummyProvider>
  );
}

export default App;
