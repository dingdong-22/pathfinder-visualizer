import { useState, useEffect } from "react";
import BFS from "./algorithms/BFS";
import DFS from "./algorithms/DFS";
import ManhattenAStar1 from "./algorithms/ManhattenAStar1";
import ManhattenAStar2 from "./algorithms/ManhattenAStar2";

function Selector(props) {
  let [data, setData] = useState({}); //stack the algorithm needs
  let [algo, setAlgo] = useState(""); //pick algo, also acts as a toggle
  let n = props.n;
  let m = props.m;
  let speed = 20;

  useEffect(() => {
    if (algo !== "") {
      let visited = new Set(props.visited);
      let stack = [...props.stack]; // either props.stack or if more data, use data
      let interval;
      let dataCopy = JSON.parse(JSON.stringify(data));

      if (algo === "BFS") {
        interval = setTimeout(() => {
          BFS(n, m, props.targets, props.walls, visited, stack, setAlgo);
          props.setVisited(visited);
          props.setStack(stack);
        }, speed);
      } else if (algo === "DFS") {
        interval = setTimeout(() => {
          DFS(n, m, props.targets, props.walls, visited, stack, setAlgo);
          props.setVisited(visited);
          props.setStack(stack);
        }, speed);
      } else if (algo === "MAS1") {
        interval = setTimeout(() => {
          ManhattenAStar1(
            n,
            m,
            props.targets,
            props.walls,
            visited,
            stack,
            dataCopy,
            setAlgo
          );
          props.setVisited(visited);
          props.setStack(stack);
          setData(dataCopy);
        }, speed);
      } else if (algo === "MAS2") {
        interval = setTimeout(() => {
          ManhattenAStar2(
            n,
            m,
            props.targets,
            props.walls,
            visited,
            stack,
            dataCopy,
            setAlgo
          );
          props.setVisited(visited);
          props.setStack(stack);
          setData(dataCopy);
        }, speed);
      }

      return () => clearTimeout(interval);
    }
  }, [algo, props.visited]);

  function reset() {
    if (props.visited.size > 0) {
      props.setVisited(new Set());
      props.setStack([]);
      setData({});
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
      <button onClick={() => setAlgo(algo === "" ? "MAS1" : "")}>
        Manhatten A Star I
      </button>
      <button onClick={() => setAlgo(algo === "" ? "MAS2" : "")}>
        Manhatten A Star II
      </button>
    </div>
  );
}

export default Selector;
