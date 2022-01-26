import "./App.scss";
import { Header, Wordle, GuessList } from "./components";
import { useState } from "react";
import allWords from "./common/words.json";

function App() {
  const [words, setWords] = useState([]);
  const [message, setMessage] = useState("");

  const handleWordle = (word) => {
    if (word) {
      setWords([...words, word]);
      setMessage("");
    } else {
      setMessage("The word needs five letters!");
    }
  };

  const filters = words.flatMap((word) => {
    return word.map(({ letter, status }, index) => {
      switch (status) {
        case "grey":
          return (input) => !input.includes(letter);
        case "yellow":
          return (input) => input.includes(letter) && input[index] !== letter;
        case "green":
          return (input) => input[index] === letter;
        default:
          return false;
      }
    });
  });

  let candidates = allWords;

  for (const filter of filters) {
    candidates = candidates.filter(filter);
  }

  return (
    <div className="App">
      <Header />
      {words.map((word, index) => (
        <GuessList key={index} word={word} />
      ))}
      <Wordle handleWordle={handleWordle} />
      <div className="message">{message}</div>
      <div className="candidateList">
      {candidates.map((candidate, index) => <div key={index} className="candidate">{candidate}</div>)}
      </div>
    </div>
  );
}

export default App;
