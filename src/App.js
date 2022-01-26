import './App.scss';
import {Header, Wordle, GuessList} from './components';
import {useState} from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [message, setMessage] = useState('');

  const handleWordle = word => {
    if(word) {
      setWords([...words, word]);
      setMessage('');
    } else {
      setMessage('The word needs five letters!');
    }
  }
  return (
    <div className="App">
      <Header />
      {
        words.map((word, index) => <GuessList key={index} word={word}  />)
      }
      <Wordle handleWordle={handleWordle}  />
      <div className='message'>{message}</div>
    </div>
  );
}

export default App;
