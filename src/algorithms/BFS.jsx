let moves = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function BFS(n, m, targets, walls, visited, stack, setAlgo) {
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
    .shift()
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
      if (targets.every((x) => visited.has(x))) {
        setAlgo = "";
        break;
      }
    }
    stack.push(hash);
  }

  return;
}

export default BFS;
