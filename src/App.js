import "./App.css";
import Board from "./Board";
import ThemeSwitch from "./ThemeSwitch";

function App() {
  return (
    <div className="App">
      <ThemeSwitch/>
      <h1>Pathfinder Visualizer</h1>
      <Board />
    </div>
  );
}

export default App;
