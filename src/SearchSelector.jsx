import { useState, useEffect } from "react";
import BFS from "./search-algorithms/BFS";
import DFS from "./search-algorithms/DFS";
import ManhattanAStar1 from "./search-algorithms/ManhattanAStar1";
import ManhattanAStar2 from "./search-algorithms/ManhattanAStar2";

function SearchSelector(props) {
  let [algo, setAlgo] = useState("");
  let [pointer, setPointer] = useState(0);
  let [done, setDone] = useState(false);

  let n = props.n;
  let m = props.m;
  let speed = props.speed;

  function stackCopier() {
    let stack = [];
    for (let data of props.stack) {
      let chunk = [];
      for (let piece of data) {
        if (Array.isArray(piece)) {
          chunk.push([...piece]);
        } else {
          chunk.push(piece);
        }
      }
      stack.push(chunk);
    }
    return stack;
  }

  useEffect(() => {
    if (!done && props.targets.length > 1) {
      if (pointer !== props.targets.length - 1) {
        let visited = new Set(props.visited);
        let stack = stackCopier();
        let timeout;
        if (algo === "BFS") {
          props.setIterations(props.iterations + 1);
          timeout = setTimeout(() => {
            BFS(
              n,
              m,
              props.targets,
              props.walls,
              visited,
              stack,
              pointer,
              setPointer,
              props.displayStack,
              props.mainPath,
              props.setMainPath,
              setDone
            );
            props.setVisited(visited);
            props.setStack(stack);
          }, speed);
        } else if (algo === "DFS") {
          props.setIterations(props.iterations + 1);
          timeout = setTimeout(() => {
            DFS(
              n,
              m,
              props.targets,
              props.walls,
              visited,
              stack,
              pointer,
              setPointer,
              props.displayStack,
              props.mainPath,
              props.setMainPath,
              setDone
            );
            props.setVisited(visited);
            props.setStack(stack);
          }, speed);
        } else if (algo === "A1") {
          props.setIterations(props.iterations + 1);
          timeout = setTimeout(() => {
            ManhattanAStar1(
              n,
              m,
              props.targets,
              props.walls,
              visited,
              stack,
              pointer,
              setPointer,
              props.displayStack,
              props.mainPath,
              props.setMainPath,
              setDone
            );
            props.setVisited(visited);
            props.setStack(stack);
          }, speed);
        } else if (algo === "A2") {
          props.setIterations(props.iterations + 1);
          timeout = setTimeout(() => {
            ManhattanAStar2(
              n,
              m,
              props.targets,
              props.walls,
              visited,
              stack,
              pointer,
              setPointer,
              props.displayStack,
              props.mainPath,
              props.setMainPath,
              setDone
            );
            props.setVisited(visited);
            props.setStack(stack);
          }, speed);
        }

        return () => clearTimeout(timeout);
      } else {
        setDone(true);
      }
    } else {
      setAlgo("");
    }
  }, [algo, props.visited]);

  function reset() {
    props.setVisited(new Set());
    props.setStack([]);
    props.setDisplayStack(new Set());
    setPointer(0);
    props.setMainPath(new Set());
    setDone(false);
    props.setIterations(0);
    setAlgo("");
  }

  return (
    <div className="search-selector">
      <div className="search-selector-label">Search Algorithms</div>
      <button
        className="search-algo-button"
        id="BFS"
        onClick={() => setAlgo(algo !== "BFS" ? "BFS" : "")}
      >
        {algo === "BFS" ? "Pause" : "BFS"}
      </button>
      <button
        className="search-algo-button"
        id="DFS"
        onClick={() => setAlgo(algo !== "DFS" ? "DFS" : "")}
      >
        {algo === "DFS" ? "Pause" : "DFS"}
      </button>
      <button
        className="search-algo-button"
        id="A1"
        onClick={() => setAlgo(algo !== "A1" ? "A1" : "")}
      >
        {algo === "A1" ? "Pause" : "A* I"}
      </button>
      <button
        className="search-algo-button"
        id="A2"
        onClick={() => setAlgo(algo !== "A2" ? "A2" : "")}
      >
        {algo === "A2" ? "Pause" : "A* II"}
      </button>

      {algo !== "" ? (
        <div className="current-search-algo-display">{`Current Algorithm: ${algo}`}</div>
      ) : null}
      <button className="search-algo-button" id="reset" onClick={() => reset()}>
        Reset Search
      </button>
    </div>
  );
}

export default SearchSelector;
