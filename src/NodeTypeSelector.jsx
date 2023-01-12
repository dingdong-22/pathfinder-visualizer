function NodeTypeSelector(props) {
    return (
        <div className="node-type-selector">
          <button onClick={() => props.setNodeType("target")}>Target Node</button>
          <button onClick={() => props.setNodeType("wall")}>Wall Node</button>
          <p>Current type: {props.nodeType}</p>
        </div>
      );
}

export default NodeTypeSelector;
