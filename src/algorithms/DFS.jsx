let moves = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function DFS(n, m, targets, walls, visited, stack, setAlgo) {
  function validMove(i, j) {
    if (i < 0 || i >= n || j < 0 || j >= m) {
      return false;
    }
    return true;
  }

  if (stack.length === 0) {
    stack.push(targets[0]);
    visited.add(targets[0]);
  }

  let [x, y] = stack
    .pop()
    .split(",")
    .map((x) => parseInt(x));
  for (let [dx, dy] of moves) {
    let [i, j] = [x + dx, y + dy];
    let hash = `${i},${j}`;
    if (visited.has(hash) || !validMove(i, j)) {
      continue;
    }
    visited.add(hash);
    if (walls.includes(hash)) {
      continue;
    } else if (targets.includes(hash)) {
      let finished = true;
      for (let t of targets) {
        if (!visited.has(t)) {
          finished = false;
          break;
        }
      }
      if (finished) {
        setAlgo("");
        break;
      }
    }
    stack.push(hash);
  }

  return "bean";
}

export default DFS;
