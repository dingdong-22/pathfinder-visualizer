let moves = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function manhattanDistance(x, y, target) {
  return Math.abs(x - target[0]) + Math.abs(y - target[1]);
}

function DFS(
  n,
  m,
  targets,
  walls,
  visited,
  stack,
  pointer,
  setPointer,
  displayStack,
  mainPath,
  setMainPath
) {
  function validMove(i, j) {
    if (i < 0 || i >= n || j < 0 || j >= m) {
      return false;
    }
    return true;
  }

  if (stack.length === 0) {
    stack.push([targets[pointer], 0, [`${targets[pointer]}`]]);
    visited.add(targets[pointer]);
  }

  let [node, d, path] = stack.pop();
  displayStack.delete(node);
  let target = targets[pointer + 1];
  let targetNode = targets[pointer + 1].split(",").map((x) => parseInt(x));

  let [x, y] = node.split(",").map((x) => parseInt(x));

  for (let [dx, dy] of moves) {
    let [i, j] = [x + dx, y + dy];
    let hash = `${i},${j}`;
    if (visited.has(hash) || !validMove(i, j)) {
      continue;
    }
    visited.add(hash);

    if (walls.has(hash)) {
      continue;
    } else if (hash === target) {
      setPointer(pointer + 1);
      visited.clear();
      stack.splice(0, stack.length);
      displayStack.clear();
      let mainPathCopy = new Set(mainPath);
      for (let z of path) {
        mainPathCopy.add(z);
      }
      setMainPath(mainPathCopy);
      return;
    }
    let newD = manhattanDistance(i, j, targetNode);
    stack.push([hash, newD, [...path, hash]]);
    displayStack.add(hash);
  }

  return;
}

export default DFS;
