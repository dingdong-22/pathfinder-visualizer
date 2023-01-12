import { useState, useEffect } from "react";
import BFS from "./algorithms/BFS";
import DFS from "./algorithms/DFS";
import ManhattanAStar1 from "./algorithms/ManhattanAStar1";
import ManhattanAStar2 from "./algorithms/ManhattanAStar2";

function Selector(props) {
  let [algo, setAlgo] = useState(""); //pick algo, also acts as a toggle
  let [pointer, setPointer] = useState(0);

  let n = props.n;
  let m = props.m;
  let speed = 10;

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
    }
  }, [algo, props.visited]);

  function reset() {
    if (props.mainPath.size === 0) {
      props.setTargets([]);
      props.setWalls(new Set());
    }
    props.setVisited(new Set());
    props.setStack([]);
    props.setDisplayStack(new Set());
    setPointer(0);
    props.setMainPath(new Set());
  }

  return (
    <div className="selector">
      <button onClick={() => props.setNodeType("target")}>Target Node</button>
      <button onClick={() => props.setNodeType("wall")}>Wall Node</button>
      <button onClick={() => reset()}>
        {props.visited.size > 0 || pointer > 0 ? "Reset" : "Full Reset"}
      </button>
      <button onClick={() => setAlgo(algo === "" ? "BFS" : "")}>BFS</button>
      <button onClick={() => setAlgo(algo === "" ? "DFS" : "")}>DFS</button>
      <button onClick={() => setAlgo(algo === "" ? "MAS1" : "")}>
        Manhattan A Star I
      </button>
      <button onClick={() => setAlgo(algo === "" ? "MAS2" : "")}>
        Manhattan A Star II
      </button>
    </div>
  );
}

export default Selector;
