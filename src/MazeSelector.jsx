import { useState, useEffect } from "react";
import MazeDFS from "./maze-algorithms/MazeDFS";
import MazePrims from "./maze-algorithms/MazePrims";
import RecDiv from "./maze-algorithms/RecDiv";
import HuntAndKill from "./maze-algorithms/HuntAndKill";

function MazeSelector(props) {
  let [algo, setAlgo] = useState("");
  let [visited, setVisited] = useState(new Set());
  let [stack, setStack] = useState([]);
  let [done, setDone] = useState(false);

  let n = props.n;
  let m = props.m;
  let speed = 20;

  useEffect(() => {
    if (!done) {
      let timeout;
      let visitedCopy = new Set(visited);
      let walls = new Set(props.walls);

      let display = new Set();
      if (algo === "MazeDFS") {
        let stackCopy = [...stack];
        timeout = setTimeout(() => {
          MazeDFS(n, m, stackCopy, visitedCopy, walls, display, setDone);
          props.setWalls(walls);
          setVisited(visitedCopy);
          setStack(stackCopy);
          props.setMazeDisplay(display);
        }, speed);
      } else if (algo === "MazePrims") {
        let stackCopy = [...stack];
        timeout = setTimeout(() => {
          MazePrims(n, m, stackCopy, visitedCopy, walls, display, setDone);
          props.setWalls(walls);
          setVisited(visitedCopy);
          setStack(stackCopy);
          props.setMazeDisplay(display);
        }, speed);
      } else if (algo === "RecDiv") {
        let stackCopy = stack.map((x) => [...x]);

        timeout = setTimeout(() => {
          RecDiv(n, m, stackCopy, visitedCopy, walls, display, setDone);
          props.setWalls(walls);
          setVisited(visitedCopy);
          setStack(stackCopy);
          props.setMazeDisplay(display);
        }, speed);
      } else if (algo === "huntandkill") {
        let stackCopy = [...stack];
        timeout = setTimeout(() => {
          HuntAndKill(n, m, stackCopy, visitedCopy, walls, display, setDone);
          props.setWalls(walls);
          setVisited(visitedCopy);
          setStack(stackCopy);
          props.setMazeDisplay(display);
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
    props.setMazeDisplay(new Set());
    setAlgo("");
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
        Prim's
      </button>
      <button
        className="maze-algo-button"
        id="rec-div"
        onClick={() => setAlgo(algo === "" && !done ? "RecDiv" : "")}
      >
        Recursive Division
      </button>
      <button
        className="maze-algo-button"
        id="huntandkill"
        onClick={() => setAlgo(algo === "" && !done ? "huntandkill" : "")}
      >
        Hunt And Kill
      </button>
      {algo !== "" && !done ? (
        <div className="maze-generating-message">
          "Generating maze please wait!"
        </div>
      ) : null}
      <button className="maze-algo-button" id="reset" onClick={() => reset()}>
        Reset Map
      </button>
    </div>
  );
}

export default MazeSelector;
