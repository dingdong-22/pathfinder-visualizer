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
        onClick={() => setAlgo(algo === "" ? "MazeDFS" : "")}
      >
        MazeDFS
      </button>

      <button
        className="maze-algo-button"
        onClick={() => setAlgo(algo === "" ? "MazePrims" : "")}
      >
        MazePrims
      </button>
      <button
        className="maze-algo-button"
        onClick={() => setAlgo(algo === "" ? "RecursiveDivision" : "")}
      >
        Recursive Division
      </button>
    </div>
  );
}

export default MazeSelector;
