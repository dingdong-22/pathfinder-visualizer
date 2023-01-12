function InfoDisplay(props) {
  return (
    <div className="info-display">
      <div>
        {props.mainPath.size > 0 ? `Path length: ${props.mainPath.size}` : null}
      </div>
    </div>
  );
}

export default InfoDisplay;
