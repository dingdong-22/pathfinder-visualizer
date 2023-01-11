function Selector(props) {
  return (
    <div className="selector">
      <button onClick={() => props.setNodeType("target")}>Target Node</button>
      <button onClick={() => props.setNodeType("wall")}>Wall Node</button>
    </div>
  );
}

export default Selector;
