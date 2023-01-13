function InfoDisplay(props) {
  return (
    <div className="info-display">
      <div>
        {props.iterations > 0 ? `Iterations: ${props.iterations}` : null}
      </div>
      <div>
        {props.mainPath.size > 0 ? `Path length: ${props.mainPath.size}` : null}
      </div>
    </div>
  );
}

export default InfoDisplay;
