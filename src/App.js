import "./App.scss";
import { Header, Wordle, GuessList } from "./components";
import { useState } from "react";
import allWords from "./common/words.json";

function App() {
  const [words, setWords] = useState([]);

  const handleWordle = (word) => {
    if (word) {
      setWords([...words, word]);
    }
  };

  const filters = words.flatMap((word) => {
    const rightLetterSet = new Set(
      word
        .filter(({ status }) => status === "yellow" || status === "green")
        .map(({ letter }) => letter)
    );
    return word.map(({ letter, status }, index) => {
      switch (status) {
        case "grey":
          return (input) =>
            rightLetterSet.has(letter) || !input.includes(letter);
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
      <div>
        {words.map((word, index) => (
          <GuessList key={index} word={word} />
        ))}
      </div>
      {words.length > 0 && <div className="line"></div>}
      <Wordle handleWordle={handleWordle} />
      <div className="candidateList">
        {words.length > 0 ? (
          candidates.map((candidate, index) => (
            <div key={index} className="candidate">
              {candidate}
            </div>
          ))
        ) : (
          <ol className="guide">
            <li>Type the word you guessed.</li>
            <li>Toggle a letter by click to match Wordle output.</li>
            <li>[Enter] to see guess suggestions.</li>
          </ol>
        )}
      </div>
    </div>
  );
}

export default App;
