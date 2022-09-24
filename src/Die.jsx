import { useState, useEffect } from "react";

const Die = (props) => {
  const style = { backgroundColor: props.isHeld ? "#59E391" : "grey" };
  const [diceNumber, setDiceNumber] = useState("");

  useEffect(() => {
    if (props.value === 1) {
      setDiceNumber("one");
    } else if (props.value === 2) {
      setDiceNumber("two");
    } else if (props.value === 3) {
      setDiceNumber("three");
    } else if (props.value === 4) {
      setDiceNumber("four");
    } else if (props.value === 5) {
      setDiceNumber("five");
    } else if (props.value === 6) {
      setDiceNumber("six");
    }
  }, []);

  return (
    <div className="die-face" style={style} onClick={props.holdDice}>
      <h2 className="die-num">
        <i className={`fa-solid fa-dice-${diceNumber}`}></i>
      </h2>
    </div>
  );
};

export default Die;
