import { useState } from "react";
import InfoDisplay from "./InfoDisplay";
import MazeSelector from "./MazeSelector";
import NodeTypeSelector from "./NodeTypeSelector";
import SearchSelector from "./SearchSelector";
import SpeedButtons from "./SpeedButtons";

function Board() {
  let [nodeType, setNodeType] = useState("target");
  let [targets, setTargets] = useState([]);
  let [walls, setWalls] = useState(new Set());
  let [visited, setVisited] = useState(new Set());
  let [displayStack, setDisplayStack] = useState(new Set());
  let [stack, setStack] = useState([]);
  let [mainPath, setMainPath] = useState(new Set());
  let [iterations, setIterations] = useState(0);
  let [mouseDown, setMouseDown] = useState(false);
  let [mazeDisplay, setMazeDisplay] = useState(new Set());

  let [speed, setSpeed] = useState(250 / 2 ** 3);

  let n = 23;
  let m = 63;

  function dragDraw(e) {
    if (mouseDown) {
      placeNode(e.target.id);
    }
  }

  function placeNode(id) {
    if (nodeType === "target") {
      if (walls.has(id)) {
        return;
      }
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
              onMouseDown={(e) => {
                setMouseDown(true);
                placeNode(e.target.id);
              }}
              onMouseEnter={(e) => dragDraw(e)}
              onMouseUp={() => setMouseDown(false)}
            >
              {targets.indexOf(hash)}
            </button>
          );
        } else if (mazeDisplay.has(hash)) {
          board.push(
            <button
              className="maze-display-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onMouseDown={(e) => {
                setMouseDown(true);
                placeNode(e.target.id);
              }}
              onMouseEnter={(e) => dragDraw(e)}
              onMouseUp={() => setMouseDown(false)}
            ></button>
          );
        } else if (walls.has(hash)) {
          board.push(
            <button
              className="wall-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onMouseDown={(e) => {
                setMouseDown(true);
                placeNode(e.target.id);
              }}
              onMouseEnter={(e) => dragDraw(e)}
              onMouseUp={() => setMouseDown(false)}
            ></button>
          );
        } else if (displayStack.has(hash)) {
          board.push(
            <button
              className="stack-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onMouseDown={(e) => {
                setMouseDown(true);
                placeNode(e.target.id);
              }}
              onMouseEnter={(e) => dragDraw(e)}
              onMouseUp={() => setMouseDown(false)}
            ></button>
          );
        } else if (visited.has(hash)) {
          board.push(
            <button
              className="visited-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onMouseDown={(e) => {
                setMouseDown(true);
                placeNode(e.target.id);
              }}
              onMouseEnter={(e) => dragDraw(e)}
              onMouseUp={() => setMouseDown(false)}
            ></button>
          );
        } else if (mainPath.has(hash)) {
          board.push(
            <button
              className="main-path-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onMouseDown={(e) => {
                setMouseDown(true);
                placeNode(e.target.id);
              }}
              onMouseEnter={(e) => dragDraw(e)}
              onMouseUp={() => setMouseDown(false)}
            ></button>
          );
        } else {
          board.push(
            <button
              className="empty-node"
              id={`${i},${j}`}
              key={`${i},${j}`}
              onMouseDown={(e) => {
                setMouseDown(true);
                placeNode(e.target.id);
              }}
              onMouseEnter={(e) => dragDraw(e)}
              onMouseUp={() => setMouseDown(false)}
            ></button>
          );
        }
      }
    }
    return board;
  }

  return (
    <div>
      <NodeTypeSelector nodeType={nodeType} setNodeType={setNodeType} />
      <SearchSelector
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
        iterations={iterations}
        setIterations={setIterations}
        speed={speed}
      />
      <MazeSelector
        n={n}
        m={m}
        walls={walls}
        setWalls={setWalls}
        targets={targets}
        setTargets={setTargets}
        mazeDisplay={mazeDisplay}
        setMazeDisplay={setMazeDisplay}
        speed={speed}
      />
      <div className="board" onMouseLeave={() => setMouseDown(false)}>
        {createBoard(n, m, targets, walls)}
      </div>
      <InfoDisplay mainPath={mainPath} iterations={iterations} />
      <SpeedButtons speed={speed} setSpeed={setSpeed} />
    </div>
  );
}

export default Board;
