let moves = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function HuntAndKill(n, m, stack, visited, walls, display, setDone) {
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

    stack.push([start, false]);
  }

  if (walls.size === 0) {
    initalizer();
    return;
  }

  if (stack.length === 0) {
    setDone(true);
    return;
  }
  let [node, hunt] = stack.pop();
  display.add(node);
  let [x, y] = node.split(",").map((x) => parseInt(x));
  if (!hunt) {
    let neighbours = [];

    for (let [dx, dy] of moves) {
      let [i, j] = [x + 2 * dx, y + 2 * dy];
      let hash = `${i},${j}`;
      if (!validMove(i, j)) {
        continue;
      } else if (!visited.has(hash)) {
        neighbours.push([hash, `${x + dx},${y + dy}`]);
      }
    }
    if (neighbours.length !== 0) {
      let randomIndex = Math.floor(Math.random() * neighbours.length);
      let [neigh, between] = neighbours.splice(randomIndex, 1)[0];

      visited.add(neigh);
      walls.delete(neigh);
      stack.push([neigh, false]);
      walls.delete(between);
    } else {
      stack.push([node, true]);
    }
    return;
  } else if (hunt) {
    for (let i = 1; i < n; i += 2) {
      for (let j = 1; j < m; j += 2) {
        let hash = `${i},${j}`;
        if (!visited.has(`${i},${j}`)) {
          let neighbours = [];
          for (let [dx, dy] of moves) {
            let [x, y] = [i + 2 * dx, j + 2 * dy];
            if (visited.has(`${x},${y}`)) {
              neighbours.push([hash, `${i + dx},${j + dy}`]);
            }
          }
          if (neighbours.length > 0) {
            let randomIndex = Math.floor(Math.random() * neighbours.length);
            let [current, between] = neighbours.splice(randomIndex, 1)[0];

            visited.add(current);
            walls.delete(current);
            stack.push([current, false]);
            walls.delete(between);
            return;
          }
        }
      }
    }
  }

  return;
}

export default HuntAndKill;
