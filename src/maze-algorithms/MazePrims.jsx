let moves = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function MazePrims(n, m, stack, visited, walls, display, setDone) {
  function validMove(i, j) {
    if (i < 0 || i >= n || j < 0 || j >= m) {
      return false;
    }
    return true;
  }

  function initalizer() {
    let nodes = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        walls.add(`${i},${j}`);
        nodes.push(`${i},${j}`);
      }
    }
    let start, x, y;

    while (true) {
      let randomIndex = Math.floor(Math.random() * nodes.length);
      start = nodes[randomIndex];
      [x, y] = start.split(",").map((x) => parseInt(x));
      if (x % 2 === 1 && y % 2 === 1) {
        break;
      }
    }
    walls.delete(start);
    visited.add(start);

    for (let [dx, dy] of moves) {
      let [i, j] = [x + 2 * dx, y + 2 * dy];
      let hash = `${i},${j}`;
      if (!validMove(i, j)) {
        continue;
      }

      stack.push(hash);
    }
  }

  if (walls.size === 0) {
    initalizer();
    return;
  }

  if (stack.length === 0) {
    setDone(true);
    return;
  }

  while (stack.length > 0) {
    let randomIndex = Math.floor(Math.random() * stack.length);
    let node = stack.splice(randomIndex, 1)[0];
    if (!walls.has(node)) {
      continue;
    }
    let [x, y] = node.split(",").map((x) => parseInt(x));
    let neighbours = [];

    for (let [dx, dy] of moves) {
      let [i, j] = [x + 2 * dx, y + 2 * dy];
      let hash = `${i},${j}`;
      if (!validMove(i, j)) {
        continue;
      } else if (visited.has(hash)) {
        neighbours.push(`${x + dx},${y + dy}`);
      }
    }


    if (neighbours.length > 0) {
      let randomIndex = Math.floor(Math.random() * neighbours.length);
      let inbetween = neighbours.splice(randomIndex, 1)[0];

      walls.delete(node);
      visited.add(node);
      walls.delete(inbetween);
      visited.add(inbetween);

      for (let [dx, dy] of moves) {
        let [i, j] = [x + 2 * dx, y + 2 * dy];
        let hash = `${i},${j}`;
        if (walls.has(hash)) {
          stack.push(hash);
          continue;
        }
      }
      display.add(node)
      break;
    } else {
      continue;
    }
  }

  return;
}

export default MazePrims;
