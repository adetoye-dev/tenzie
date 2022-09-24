const Die = (props) => {
  const style = { backgroundColor: props.isHeld ? "#59E391" : "white" };
  return (
    <div className="die-face" style={style}>
      {props.value}
    </div>
  );
};

export default Die;
