import { useState } from "react";
import Selector from "./Selector";

function Board() {
  let [nodeType, setNodeType] = useState("target");

  let [nodes, setNodes] = useState([]);
  let [walls, setWalls] = useState([]);
  let [path, setPaths] = useState([]);

  function switchNode(id) {
    if (nodeType === "target") {
      if (walls.includes(id)) {
        return;
      }
      let nodeIdx = nodes.indexOf(id);
      let newNodes = [...nodes];
      if (nodeIdx === -1) {
        newNodes.push(id);
      } else {
        newNodes.splice(nodeIdx, 1);
      }

      setNodes(newNodes);
    } else if (nodeType === "wall") {
      if (nodes.includes(id)) {
        return;
      }
      let wallIdx = walls.indexOf(id);
      let newWalls = [...walls];
      if (wallIdx === -1) {
        newWalls.push(id);
      } else {
        newWalls.splice(wallIdx, 1);
      }
      setWalls(newWalls);
    }
  }

  function createBoard(n, m, nodes, walls) {
    let board = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let hash = `${i},${j}`;
        if (nodes.includes(hash)) {
          board.push(
            <button
              className="empty-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            >
              {nodes.indexOf(hash)}
            </button>
          );
        } else if (walls.includes(hash)) {
          board.push(
            <button
              className="empty-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            >
              X
            </button>
          );
        } else {
          board.push(
            <button
              className="empty-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            ></button>
          );
        }
      }
    }
    return board;
  }

  return (
    <div>
      <Selector nodeType={nodeType} setNodeType={setNodeType} />
      <div className="board">{createBoard(15, 10, nodes, walls)}</div>
    </div>
  );
}

export default Board;
