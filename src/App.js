import './App.scss';
import {Header, Wordle} from './components';

function App() {
  const handleWordle = letters => {
    console.log(letters);
  }
  return (
    <div className="App">
      <Header />
      <Wordle handleWordle={handleWordle}  />
    </div>
  );
}

export default App;
