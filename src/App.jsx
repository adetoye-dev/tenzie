import { useState } from "react";
import "./App.css";
import Die from "./Die";
import { allNewDice } from "./utilities";
import { generateNewDie } from "./utilities";

function App() {
  const [dice, setDice] = useState(allNewDice);

  const dieElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} />
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
      <button className="roll-dice">Roll</button>
    </main>
  );
}

export default App;
