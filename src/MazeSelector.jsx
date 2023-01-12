import { useState, useEffect } from "react";
import MazeDFS from "./maze-algorithms/MazeDFS";

function MazeSelector(props) {
  let [algo, setAlgo] = useState("");
  let [visited, setVisited] = useState(new Set());
  let [stack, setStack] = useState([]);
  let [done, setDone] = useState(false);

  let n = props.n;
  let m = props.m;
  let speed = 15;

  useEffect(() => {
    console.log(done);
    if (!done) {
      if (visited.size + props.walls.size < n * m) {
        let timeout;
        let visitedCopy = new Set(visited);
        let stackCopy = [...stack];
        let walls = new Set(props.walls);
        if (algo === "DFS") {
          timeout = setTimeout(() => {
            MazeDFS(n, m, stackCopy, visitedCopy, walls, setDone);
            props.setWalls(walls);
            setVisited(visitedCopy);
            setStack(stackCopy);
          }, speed);
        }
        return () => clearTimeout(timeout);
      }
    } else {
      setAlgo("");
    }
  }, [algo, props.walls]);

  function reset() {
    setVisited(new Set());
    setStack([]);
    props.setWalls(new Set());
    props.setTargets([]);
    setDone(false);
  }

  return (
    <div className="maze-selector">
      <button className="maze-algo-button" onClick={() => reset()}>
        Reset Walls + Targets
      </button>
      <button
        className="maze-algo-button"
        onClick={() => setAlgo(algo === "" ? "DFS" : "")}
      >
        Recursive Backtracker
      </button>
    </div>
  );
}

export default MazeSelector;
