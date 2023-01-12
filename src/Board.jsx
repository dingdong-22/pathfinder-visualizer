import { useState } from "react";
import Selector from "./Selector";

function Board() {
  let [nodeType, setNodeType] = useState("target");

  let [targets, setTargets] = useState([]);
  let [walls, setWalls] = useState(new Set());
  let [visited, setVisited] = useState(new Set());
  let [displayStack, setDisplayStack] = useState(new Set());
  let [stack, setStack] = useState([]);
  let [mainPath, setMainPath] = useState(new Set());

  let n = 25;
  let m = 60;

  function switchNode(id) {
    if (nodeType === "target") {
      if (walls.has(id)) {
        return;
      }
      console.log("Targets:", targets);
      let nodeIdx = targets.indexOf(id);
      let newTargets = [...targets];
      if (nodeIdx === -1) {
        newTargets.push(id);
      } else {
        newTargets.splice(nodeIdx, 1);
      }

      setTargets(newTargets);
    } else if (nodeType === "wall") {
      if (targets.includes(id)) {
        return;
      }
      console.log("Walls:", walls);
      let newWalls = new Set(walls);
      if (newWalls.has(id)) {
        newWalls.delete(id);
      } else {
        newWalls.add(id);
      }
      setWalls(newWalls);
    }
  }

  function createBoard(n, m, targets, walls) {
    let board = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let hash = `${i},${j}`;
        if (targets.includes(hash)) {
          board.push(
            <button
              className="target-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            >
              {targets.indexOf(hash)}
            </button>
          );
        } else if (walls.has(hash)) {
          board.push(
            <button
              className="wall-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            >
              X
            </button>
          );
        } else if (displayStack.has(hash)) {
          board.push(
            <button
              className="stack-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            >
              S
            </button>
          );
        } else if (visited.has(hash)) {
          board.push(
            <button
              className="visited-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            >
              V
            </button>
          );
        } else if (mainPath.has(hash)) {
          board.push(
            <button
              className="main-path-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onClick={(e) => switchNode(e.target.id)}
            >
              M
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
      <Selector
        n={n}
        m={m}
        targets={targets}
        setTargets={setTargets}
        walls={walls}
        setWalls={setWalls}
        nodeType={nodeType}
        setNodeType={setNodeType}
        visited={visited}
        setVisited={setVisited}
        stack={stack}
        setStack={setStack}
        displayStack={displayStack}
        setDisplayStack={setDisplayStack}
        mainPath={mainPath}
        setMainPath={setMainPath}
      />
      <div className="board">{createBoard(n, m, targets, walls)}</div>
    </div>
  );
}

export default Board;
