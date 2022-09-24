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

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const allEqual = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allEqual) {
      setCompleted(true);
    }
  }, [dice]);

  const holdDice = (dieId) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const rollDice = () => {
    if (completed) {
      setDice(allNewDice());
      setCompleted(false);
      setRollCount(0);
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
