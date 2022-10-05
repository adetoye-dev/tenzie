import { useState, useEffect } from "react";
import "./App.css";
import Die from "./Die";
import Confetti from "react-confetti";
import { allNewDice } from "./utilities";
import { generateNewDie } from "./utilities";

const App = () => {
  const [dice, setDice] = useState(allNewDice);
  const [completed, setCompleted] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState({
    sec: 0,
    min: 0,
  });
  const bestTime = JSON.parse(localStorage.getItem("tenzie.timer")) || "";
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const allEqual = dice.every((die) => die.value === dice[0].value);

    if (allHeld && allEqual) {
      setCompleted(true);
      setIsRunning(false);
      if (bestTime) {
        if (timer.min <= bestTime.min) {
          if (timer.sec <= bestTime.sec) {
            localStorage.setItem("tenzie.timer", JSON.stringify(timer));
          }
        }
      } else {
        localStorage.setItem("tenzie.timer", JSON.stringify(timer));
      }
    }
  }, [dice]);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimer((oldTimer) => {
          if (oldTimer.sec < 59) {
            return { ...oldTimer, sec: oldTimer.sec + 1 };
          }
          return { min: oldTimer.min + 1, sec: 0 };
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isRunning]);

  const holdDice = (dieId) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const rollDice = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
    if (completed) {
      setDice(allNewDice());
      setCompleted(false);
      setIsRunning(false);
      setRollCount(0);
      setTimer({ min: 0, sec: 0 });
      return;
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    setRollCount((oldCount) => oldCount + 1);
  };

  const dieElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="main">
      {completed && <Confetti />}
      <div className="timers">
        <span className="best-time">
          <i className="fa-solid fa-star"></i>Best Time
          <br />
          {bestTime ? (
            <span>
              {bestTime.min < 10 && 0}
              {bestTime.min}:{bestTime.sec < 10 && 0}
              {bestTime.sec}
            </span>
          ) : (
            "00:00"
          )}
        </span>
        <span className="current-time">
          Current Time
          <br />
          {timer.min < 10 && 0}
          {timer.min}:{timer.sec < 10 && 0}
          {timer.sec}
        </span>
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dieElements}</div>
      <span className="roll-counter">Total Roll: {rollCount}</span>
      <button className="roll-dice" onClick={rollDice}>
        {completed ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default App;
