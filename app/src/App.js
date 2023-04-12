import { ExistingContracts } from './components/ExistingContracts';
import { NewContract } from './components/NewContract';
import './App.css';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <div className='left'>
          <NewContract />
        </div>
        <div className="right">
          <ExistingContracts />
        </div>
      </div>
    </>
  );
}

export default App;
