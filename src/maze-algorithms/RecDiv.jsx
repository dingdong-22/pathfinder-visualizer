function randomNum(limit) {
  return Math.floor(Math.random() * limit);
}

function RecDiv(n, m, stack, visited, walls, display, setDone) {
  function initalizer() {
    for (let i = 0; i < n; i++) {
      for (let j of [0, m - 1]) {
        walls.add(`${i},${j}`);
      }
    }
    for (let i of [0, n - 1]) {
      for (let j = 0; j < m; j++) {
        walls.add(`${i},${j}`);
      }
    }
    stack.push([1, 1, n - 2, m - 2]);
  }

  if (walls.size === 0) {
    initalizer();
    return;
  }

  if (stack.length === 0) {
    setDone(true);
    return;
  }

  let [s1, s2, e1, e2] = stack.pop();
  display.add(`${s1},${s2}`);
  display.add(`${e1},${e2}`);
  if (e1 - s1 < 2 || e2 - s2 < 2) {
    return;
  } else if (e2 - s2 >= e1 - s1) {
    let y = Math.floor((randomNum(e2 - s2 - 1) + 1 + s2) / 2) * 2;
    let gap =
      Math.floor(Math.floor(Math.random() * (e1 - s1 + 1) + s1) / 2) * 2 + 1;

    for (let i = s1; i <= e1; i++) {
      if (i === gap) {
        continue;
      } else {
        walls.add(`${i},${y}`);
      }
    }
    stack.push([s1, s2, e1, y - 1]);
    stack.push([s1, y + 1, e1, e2]);
  } else if (e2 - s2 < e1 - s1) {
    let x = Math.floor((randomNum(e1 - s1 - 1) + 1 + s1) / 2) * 2;
    let gap =
      Math.floor(Math.floor(Math.random() * (e2 - s2 + 1) + s2) / 2) * 2 + 1;

    for (let i = s2; i <= e2; i++) {
      if (i === gap) {
        continue;
      } else {
        walls.add(`${x},${i}`);
      }
    }

    stack.push([s1, s2, x - 1, e2]);
    stack.push([x + 1, s2, e1, e2]);
  }
  return;
}

export default RecDiv;
