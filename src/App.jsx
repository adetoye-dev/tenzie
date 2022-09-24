import { useState } from "react";
import "./App.css";
import Die from "./Die";
import { allNewDice } from "./utilities";
import { generateNewDie } from "./utilities";

const App = () => {
  const [dice, setDice] = useState(allNewDice);

  const holdDice = (dieId) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const rollDice = () => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dieElements}</div>
      <span className="roll-counter">Total Roll: 0</span>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
};

export default App;
