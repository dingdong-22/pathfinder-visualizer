import { useState } from "react";

function ThemeSwitch() {
  let [mode, setMode] = useState(false);

  function switchModes() {
    document.body.classList.toggle("dark");
    setMode(!mode);
  }

  return (
    <div>
      {mode ? (
        <button className="theme-switch" onClick={() => switchModes()}>
          dark
        </button>
      ) : (
        <button className="theme-switch" onClick={() => switchModes()}>
          light
        </button>
      )}
    </div>
  );
}

export default ThemeSwitch;
