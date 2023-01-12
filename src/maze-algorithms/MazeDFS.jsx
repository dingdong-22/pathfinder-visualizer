let moves = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function MazeDFS(n, m, stack, visited, walls, setDone) {
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
        if (i % 2 === 0 || j % 2 === 0) {
          walls.add(`${i},${j}`);
        } else {
          nodes.push(`${i},${j}`);
        }
      }
    }
    let randomIndex = Math.floor(Math.random() * nodes.length);
    let start = nodes[randomIndex];
    stack.push(start);
    visited.add(start);
  }

  if (walls.size === 0) {
    initalizer();
    return;
  }

  if (stack.length === 0) {
    setDone(true);
    return;
  }

  let node = stack.pop();
  let [x, y] = node.split(",").map((x) => parseInt(x));
  let neighbours = [];

  for (let [dx, dy] of moves) {
    let [i, j] = [x + 2 * dx, y + 2 * dy];
    let hash = `${i},${j}`;
    if (visited.has(hash) || !validMove(i, j)) {
      continue;
    }

    neighbours.push([hash, `${x + dx},${y + dy}`]);
  }

  if (neighbours.length > 0) {
    stack.push(node);
    let randomIndex = Math.floor(Math.random() * neighbours.length);
    let [neighbour, wall] = neighbours[randomIndex];
    walls.delete(wall);
    visited.add(neighbour);
    stack.push(neighbour);
  }

  return;
}

export default MazeDFS;
