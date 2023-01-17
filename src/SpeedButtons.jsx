function SpeedButtons(props) {
  function increaseSpeed(inc) {
    if (inc) {
      if (props.speed > 20) {
        props.setSpeed(props.speed / 2);
      }
    } else {
      if (props.speed < 2000) {
        props.setSpeed(props.speed * 2);
      }
    }
  }
  return (
    <div className="speed-container">
      <div>
        <button className="speed-button" onClick={() => increaseSpeed(false)}>
          &lt;&lt;
        </button>
        <button className="speed-button" onClick={() => increaseSpeed(true)}>
          &gt;&gt;
        </button>
      </div>

      {/* <p className="speed-text">{props.speed < 50 ? "Fast" : props.speed > 250 ? "Slow" : "Normal"}</p> */}

      <p className="speed-text">{`Iterations per second : ~${
        1000 / props.speed
      }`}</p>
    </div>
  );
}

export default SpeedButtons;
