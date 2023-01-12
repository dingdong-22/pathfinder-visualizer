function NodeTypeSelector(props) {
  function switchType(type) {
    let body = document.querySelector("body");
    if (type === "target") {
      props.setNodeType(type);
      body.style.setProperty(
        "--clr-node-type-target",
        "var(--clr-node-type-on)"
      );
      body.style.setProperty(
        "--clr-node-type-wall",
        "var(--clr-node-type-off)"
      );
    } else if (type === "wall") {
      props.setNodeType(type);
      body.style.setProperty(
        "--clr-node-type-target",
        "var(--clr-node-type-off)"
      );
      body.style.setProperty("--clr-node-type-wall", "var(--clr-node-type-on)");
    }
  }

  return (
    <div className="node-type-selector">
      <div className="node-type-selector-label">Node Type</div>
      <button
        className="node-type-target-button"
        onClick={() => switchType("target")}
      >
        Target Node
      </button>
      <button
        className="node-type-wall-button"
        onClick={() => switchType("wall")}
      >
        Wall Node
      </button>
    </div>
  );
}

export default NodeTypeSelector;
