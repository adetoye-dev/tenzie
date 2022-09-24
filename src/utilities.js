import { nanoid } from "nanoid";

export const allNewDice = () => {
  const diceArray = [];
  for (let i = 0; i < 9; i++) {
    diceArray.push(generateNewDie());
  }
  return diceArray;
};

export const generateNewDie = () => {
  return {
    value: Math.ceil(Math.random() * 6),
    id: nanoid(),
    isHeld: false,
  };
};
