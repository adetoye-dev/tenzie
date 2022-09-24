import { useState } from "react";
import "./App.css";

function App() {
  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container"></div>
      <span className="roll-counter">Total Roll: 0</span>
      <button className="roll-dice">Roll</button>
    </main>
  );
}

export default App;
