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
  let speed = 15;

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
    if (!done) {
      if (pointer !== props.targets.length - 1) {
        let visited = new Set(props.visited);
        let stack = stackCopier();
        let timeout;
        if (algo === "BFS") {
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
              props.setMainPath
            );
            props.setVisited(visited);
            props.setStack(stack);
          }, speed);
        } else if (algo === "DFS") {
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
              props.setMainPath
            );
            props.setVisited(visited);
            props.setStack(stack);
          }, speed);
        } else if (algo === "MAS1") {
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
              props.setMainPath
            );
            props.setVisited(visited);
            props.setStack(stack);
          }, speed);
        } else if (algo === "MAS2") {
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
              props.setMainPath
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
  }

  return (
    <div className="search-selector">
      <button onClick={() => reset()}>Reset Search</button>
      <button onClick={() => setAlgo(algo === "" ? "BFS" : "")}>BFS</button>
      <button onClick={() => setAlgo(algo === "" ? "DFS" : "")}>DFS</button>
      <button onClick={() => setAlgo(algo === "" ? "MAS1" : "")}>
        Manhattan A Star I
      </button>
      <button onClick={() => setAlgo(algo === "" ? "MAS2" : "")}>
        Manhattan A Star II
      </button>
      <p>Current algo: {algo}</p>
    </div>
  );
}

export default SearchSelector;
