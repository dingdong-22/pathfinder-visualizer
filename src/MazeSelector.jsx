import { useState, useEffect } from "react";
import MazeDFS from "./maze-algorithms/MazeDFS";
import MazePrims from "./maze-algorithms/MazePrims";
import RecursiveDivision from "./maze-algorithms/RecursiveDivision";

function MazeSelector(props) {
  let [algo, setAlgo] = useState("");
  let [visited, setVisited] = useState(new Set());
  let [stack, setStack] = useState([]);
  let [done, setDone] = useState(false);

  let n = props.n;
  let m = props.m;
  let speed = 5;

  useEffect(() => {
    if (!done) {
      let timeout;
      let visitedCopy = new Set(visited);
      let walls = new Set(props.walls);
      if (algo === "MazeDFS") {
        let stackCopy = [...stack];
        timeout = setTimeout(() => {
          MazeDFS(n, m, stackCopy, visitedCopy, walls, setDone);
          props.setWalls(walls);
          setVisited(visitedCopy);
          setStack(stackCopy);
        }, speed);
      } else if (algo === "MazePrims") {
        let stackCopy = [...stack];
        timeout = setTimeout(() => {
          MazePrims(n, m, stackCopy, visitedCopy, walls, setDone);
          props.setWalls(walls);
          setVisited(visitedCopy);
          setStack(stackCopy);
        }, speed);
      } else if (algo === "RecursiveDivision") {
        let stackCopy = stack.map((x) => [...x]);

        timeout = setTimeout(() => {
          RecursiveDivision(n, m, stackCopy, visitedCopy, walls, setDone);
          props.setWalls(walls);
          setVisited(visitedCopy);
          setStack(stackCopy);
        }, speed);
      }
      return () => clearTimeout(timeout);
    } else {
      setAlgo("");
      setDone(true);
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
      <div className="maze-selector-label">Maze Algorithms</div>
      <button
        className="maze-algo-button"
        id="dfs"
        onClick={() => setAlgo(algo === "" && !done ? "MazeDFS" : "")}
      >
        DFS
      </button>
      <button
        className="maze-algo-button"
        id="prims"
        onClick={() => setAlgo(algo === "" && !done ? "MazePrims" : "")}
      >
        Prims
      </button>
      <button
        className="maze-algo-button"
        id="rec-div"
        onClick={() => setAlgo(algo === "" && !done ? "RecursiveDivision" : "")}
      >
        Recursive Division
      </button>
      {algo !== "" && !done ? (
        <div className="maze-generating-message">
          "Generating maze please wait! =)"
        </div>
      ) : null}
      <button className="maze-algo-button" id="reset" onClick={() => reset()}>
        Reset Map
      </button>
    </div>
  );
}

export default MazeSelector;
