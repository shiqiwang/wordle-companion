import React from "react";

import './guess.scss';

function GuessList(props) {
  const {word} = props;
  return <div className="guessList">
    {word.map((letter, index) => 
      <div
        className={`guess ${letter.status}`}
        key={index}
      >
        {letter.letter}
      </div>
    )}
  </div>
}

export default GuessList;
