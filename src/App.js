import { useState, useEffect } from 'react';
import './App.css';
import wowAmazingMagic from './laila.mp3';
import drums from './drums.mp3';
import yes from './no.mp3';
import no from './yes.mp3';

// import bg from './bg.mp3';

import Select from 'react-select';
import { Selector } from './styles';
import useSound from 'use-sound';

let fadecolor;
function App() {
  const [play] = useSound(wowAmazingMagic);
  const [pDrums] = useSound(drums);
  const [pYes] = useSound(yes);
  const [pNo] = useSound(no);
  let [namesState, setNamesState] = useState('Starting...');
  let [score, setScore] = useState([0, '+']);
  let [gameState, setGameState] = useState(0);
  let [gameDiff, setGameDiff] = useState(1000);
  let [gameWpn, setGameWep] = useState('grid-container-knife');

  const options = [
    { value: 1500, label: 'Junior' },
    { value: 1000, label: 'Senior' },
    { value: 500, label: 'Alumni' },
  ];
  const Wepoptions = [
    { value: 'grid-container-knife', label: 'Knife' },
    { value: 'grid-container-gun', label: 'Gun' },
    { value: 'grid-container-hammer', label: 'Hammer' },
  ];

  let changeGameState = () => {
    setGameState(1);
    setCounter(30);
    setScore([0, '+']);
  };

  const [counter, setCounter] = useState(30);

  let changeScore = (selection, op) => {
    shuffleMethod();
    if (op === '+') {
      score = [score[0] + selection, '+'];
      fadecolor = 'fade';
    } else if (op === '-') {
      fadecolor = 'fadeRed';
      score = [score[0] + selection, '-'];
    }

    setScore(score);
  };

  useEffect(() => {
    setTimeout((a) => shuffleMethod(a), gameDiff);
    const timer =
      counter > 0 &&
      setTimeout(() => setCounter((counter) => counter - 1), 1000);
    return function () {
      clearInterval(timer);
    };
  }, [counter]);

  const shuffleMethod = (a) => {
    if (counter === 0) {
      if (localStorage.getItem('score') < score[0]) {
        localStorage.setItem('score', score[0]);
        play();
      }
      setGameState(0);
    }
    let numData = [0, 0, 1, 0, 0, 0, 0];
    numData.push(Math.floor(Math.random() * 5));
    numData.push(Math.floor(Math.random() * 5));
    numData = numData.sort(() => Math.random() - 0.5);

    setNamesState(
      (namesState) =>
        (namesState = numData.map((name) => {
          if (name === 0) {
            return <div className="grid-item"></div>;
          } else if (name === 1) {
            return (
              <div className="grid-item">
                <img
                  onClick={() => {
                    changeScore(1, '+');
                    pYes();
                  }}
                  className="ins-img"
                  src="https://i.ibb.co/h1VkLtC/heart.png"
                />
              </div>
            );
          } else if (name === 2) {
            return (
              <div className="grid-item">
                <img
                  onClick={() => {
                    changeScore(3, '+');
                    pYes();
                  }}
                  className="ins-img"
                  src="https://i.ibb.co/Zg61jWt/GZAs-Tge-B-400x400.jpg"
                />
              </div>
            );
          } else if (name === 3) {
            return (
              <div className="grid-item-love">
                <img
                  onClick={() => {
                    changeScore(-2, '-');
                    pNo();
                  }}
                  className="ins-img"
                  src="https://i.ibb.co/C24h6z1/1612774893546.jpg"
                />
              </div>
            );
          } else if (name === 4) {
            return (
              <div className="grid-item-love">
                <img
                  onClick={() => {
                    changeScore(-2, '-');
                    pNo();
                  }}
                  className="ins-img"
                  src="https://i.ibb.co/d5wHvYQ/1621265920666.jpg"
                />
              </div>
            );
          }
        }))
    );
  };
  if (gameState === 1) {
    return (
      <div className="App">
        <div className={fadecolor}>
          Score: {score[0]}
          <br />
        </div>
        <br />
        Time left: {counter}
        <div className={gameWpn}>{namesState}</div>
        <button
          className="button"
          onClick={() => {
            setGameState(0);
          }}
        >
          Reset
        </button>
      </div>
    );
  } else if (gameState === 0) {
    return (
      <div className="main-menu">
        <img src="https://i.ibb.co/vBnxCTG/title.png" />
        <br />
        <button
          className="button"
          onClick={() => {
            changeGameState();
            pDrums();
          }}
        >
          Start
        </button>
        <Selector>
          Choose the difficulty :
          <Select
            placeholder={'Junior'}
            options={options}
            onChange={(e) => setGameDiff(e.value)}
          />
        </Selector>
        <Selector>
          Choose your weapon :
          <Select
            placeholder={'Knife'}
            options={Wepoptions}
            onChange={(e) => setGameWep(e.value)}
          />
        </Selector>
        Your highest score was: {localStorage.getItem('score')}
        <br />
        <button
          className="button"
          onClick={() => {
            localStorage.removeItem('score');
            window.location.reload(false);
          }}
        >
          Clear Scores
        </button>
        <br />
        Instructions: <br />
        Laila for 1 point <br />
        Zeinab for 5 points! <br />
        You lose 2 points for Hajar and Ahmad
      </div>
    );
  }
}

export default App;
