import React, { useEffect, useState, useRef } from "react";
import "./wordle.scss";

const notMobile = navigator.userAgentData?.mobile === false;

const EMPTY_WORD = (focus = notMobile) => [
  {
    letter: "",
    status: 0,
    focus,
  },
  {
    letter: "",
    status: 0,
    focus: false,
  },
  {
    letter: "",
    status: 0,
    focus: false,
  },
  {
    letter: "",
    status: 0,
    focus: false,
  },
  {
    letter: "",
    status: 0,
    focus: false,
  },
];

function Wordle(props) {
  const inputRef = useRef();

  const letterStatus = ["grey", "yellow", "green"];

  const [word, setWord] = useState(() => EMPTY_WORD());

  useEffect(() => {
    let onKeyPress = (event) => {
      const { key, keyCode } = event;
      if ((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123)) {
        let currentIndex = 0;
        let copy = word.map((value, index) => {
          if (value.focus) {
            currentIndex = index;
            return {
              ...value,
              letter: key,
              focus: false,
            };
          } else {
            return value;
          }
        });
        currentIndex < copy.length - 1
          ? (copy[currentIndex + 1].focus = true)
          : (copy[0].focus = true);

        setWord(copy);
      }
    };

    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [word]);

  useEffect(() => {
    let onKeyDown = (event) => {
      const { keyCode } = event;
      let currentIndex = 0;
      let getNewWord = (newFocusValue) =>
        word.map((value, index) => {
          if (value.focus) {
            currentIndex = index;
            return {
              ...value,
              ...newFocusValue,
            };
          } else {
            return value;
          }
        });

      if (keyCode === 37) {
        let copy = getNewWord({ focus: false });
        currentIndex > 0
          ? (copy[currentIndex - 1].focus = true)
          : (copy[copy.length - 1].focus = true);

        setWord(copy);
      }

      if (keyCode === 39) {
        let copy = getNewWord({ focus: false });
        currentIndex < copy.length - 1
          ? (copy[currentIndex + 1].focus = true)
          : (copy[0].focus = true);

        setWord(copy);
      }

      if (keyCode === 8) {
        let copy = getNewWord({
          letter: "",
          status: 0,
          focus: false,
        });
        currentIndex > 0
          ? (copy[currentIndex - 1].focus = true)
          : (copy[0].focus = true);
        setWord(copy);
      }

      if (keyCode === 13) {
        const letters = word.map((item) => ({
          letter: item.letter.toLowerCase(),
          status: letterStatus[item.status],
        }));
        let result;
        if (letters.filter((item) => !item.letter).length) {
          result = false;
        } else {
          result = letters;
          setWord(EMPTY_WORD(true));
        }
        props.handleWordle(result);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  const onBoxClick = (status, focus, pos) => {
    let input = inputRef.current;

    input.value = "";
    input.focus();

    setWord(
      word.map((value, index) => {
        if (pos !== index) {
          return {
            ...value,
            focus: false,
          };
        } else {
          if (focus) {
            return {
              ...value,
              status: status > 1 ? 0 : status + 1,
            };
          } else {
            return {
              ...value,
              focus: true,
            };
          }
        }
      })
    );
  };

  return (
    <div>
      <input
        ref={inputRef}
        style={{ opacity: "0", position: "absolute" }}
        defaultValue=""
      />
      <div className="wordle">
        {word.map((value, index) => (
          <div
            className={`letterInput ${letterStatus[value.status]} ${
              value.focus ? "focusBox" : ""
            }`}
            type="text"
            onClick={() => onBoxClick(value.status, value.focus, index)}
            key={index}
          >
            {value.letter}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wordle;
