import React, {useEffect, useState} from 'react';
import './wordle.scss';

function Wordle() {

  const letterStatus = ['grey', 'yellow', 'green'];
  
  const [values, setValues]=useState([
    {
      letter: '',
      status: 0,
      focus: true,
    },
    {
      letter: '',
      status: 0,
      focus: false,
    },
    {
      letter: '',
      status: 0,
      focus: false,
    },
    {
      letter: '',
      status: 0,
      focus: false,
    },
    {
      letter: '',
      status: 0,
      focus: false,
    },
  ]);

  useEffect(() => {
    let onKeyPress = event => {
      const {key, keyCode} = event;
      if((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123)) {
        let copy = [...values];
        let currentIndex = 0;
        copy = copy.map((value, index) => {
          if(value.focus) {
            currentIndex = index;
            return {
              ...value,
              letter: key,
              focus: false,
            }
          } else {
            return value;
          }
        })
        currentIndex < copy.length - 1 ? copy[currentIndex + 1].focus = true : copy[0].focus = true;

        setValues(copy);
      }
    };

    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    }
  }, [values]);

  useEffect(() => {
    let onKeyDown = event => {
      const  {keyCode} = event;
      if(keyCode === 8) {
        console.log('delete')
      }

      if(keyCode === 13) {
        console.log('enter')
      }
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  })

  const onBoxClick = (status, focus, pos) => {
    setValues(values.map((value, index) => {
      if(pos !== index) {
        return {
          ...value,
          focus: false,
        }
      } else {
        if(focus) {
          return {
            ...value,
            status: status > 1 ? 0 : status + 1,
          }
        } else {
          return {
            ...value,
            focus: true
          }
        }
      }
    }));
  }

  return <div className='wordle'>
    {
      values.map((value, index) => 
        <div
          className={`letterInput ${letterStatus[value.status]} ${value.focus ? 'focusBox' : ''}`}
          type='text'
          onClick={() => onBoxClick(value.status, value.focus, index)}
          key={index}
        >
          {value.letter}
        </div>
      )
    }
  </div>
  
}

export default Wordle;
