import { useState, useEffect } from "react";
import BFS from "./algorithms/BFS";
import DFS from "./algorithms/DFS";

function Selector(props) {
  let [data, setData] = useState([]); //stack the algorithm needs
  let [algo, setAlgo] = useState(""); //pick algo, also acts as a toggle
  let n = props.n;
  let m = props.m;
  let speed = 20;

  useEffect(() => {
    if (algo !== "") {
      let visited = new Set(props.visited);
      let stack; // either props.stack or if more data, use data
      let interval;
      if (algo === "BFS") {
        stack = [...props.stack];
        interval = setTimeout(() => {
          BFS(n, m, props.targets, props.walls, visited, stack, setAlgo);
          props.setVisited(visited);
          props.setStack(stack);
        }, speed);
      } else if (algo === "DFS") {
        stack = [...props.stack];
        interval = setTimeout(() => {
          DFS(n, m, props.targets, props.walls, visited, stack, setAlgo);
          props.setVisited(visited);
          props.setStack(stack);
        }, speed);
      }

      return () => clearTimeout(interval);
    }
  }, [algo, props.visited]);

  function reset() {
    if (props.visited.size > 0) {
      props.setVisited(new Set());
      props.setStack([]);
    } else {
      props.setTargets([]);
      props.setWalls([]);
    }
  }

  return (
    <div className="selector">
      <button onClick={() => props.setNodeType("target")}>Target Node</button>
      <button onClick={() => props.setNodeType("wall")}>Wall Node</button>
      <button onClick={() => reset()}>
        {props.visited.size > 0 ? "Reset" : "Full Reset"}
      </button>
      <button onClick={() => setAlgo(algo === "" ? "BFS" : "")}>BFS</button>
      <button onClick={() => setAlgo(algo === "" ? "DFS" : "")}>DFS</button>
    </div>
  );
}

export default Selector;
