import { useState, useEffect } from "react";
import Floodfill from "./algorithms/Floodfill";

function Selector(props) {
  let [data, setData] = useState([]); //stack the algorithm needs
  let [algo, setAlgo] = useState("");
  let n = props.n;
  let m = props.m;
  let speed = 100;
  useEffect(() => {
    if (algo !== "") {
      let visited = new Set(props.visited);
      let stack = [...props.stack];
      let interval = setTimeout(() => {
        Floodfill(n, m, props.targets, props.walls, visited, stack, setAlgo);
        props.setVisited(visited);
        props.setStack(stack);
      }, speed);

      return () => clearTimeout(interval);
    }
  }, [algo, props.visited]);

  return (
    <div className="selector">
      <button onClick={() => props.setNodeType("target")}>Target Node</button>
      <button onClick={() => props.setNodeType("wall")}>Wall Node</button>
      <button onClick={() => setAlgo(algo === "" ? "floodfill" : "")}>
        Floodfill
      </button>
    </div>
  );
}

export default Selector;
