function NodeTypeSelector(props) {
  return (
    <div className="node-type-selector">
      <div className="node-type-selector-label">Node Type</div>
      <button
        className="node-type-target-button"
        onClick={() => props.setNodeType("target")}
      >
        Target Node
      </button>
      <button
        className="node-type-wall-button"
        onClick={() => props.setNodeType("wall")}
      >
        Wall Node
      </button>
    </div>
  );
}

export default NodeTypeSelector;
