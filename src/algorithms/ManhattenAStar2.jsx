let moves = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function manhattenDistance(x, y, target) {
  return Math.abs(x - target[0]) + Math.abs(y - target[1]);
}

function ManhattenAStar2(n, m, targets, walls, visited, stack, data, setAlgo) {
  function validMove(i, j) {
    if (i < 0 || i >= n || j < 0 || j >= m) {
      return false;
    }
    return true;
  }

  function heuristic(a, b) {
    let [aDist, bDist] = [data[a], data[b]];
    return bDist - aDist;
  }

  if (stack.length === 0) {
    stack.push(targets[0]);
    visited.add(targets[0]);
  }

  //new -----------------------------------------------------
  //may add to all algorithms so they can be combined together
  let nextTarget;
  for (let t of targets) {
    if (visited.has(t)) {
      continue;
    } else {
      nextTarget = t.split(",").map((x) => parseInt(x));
      break;
    }
  }
  //---------------------------------------------------------

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
      if (targets.every((x) => visited.has(x))) {
        setAlgo = "";
        break;
      } else {
        //get new target
        for (let t of targets) {
          if (visited.has(t)) {
            continue;
          } else {
            nextTarget = t.split(",").map((x) => parseInt(x));
            break;
          }
        }
        //recalculate heuristic
        for (let v of Object.keys(data)) {
          let [k, l] = v.split(",").map((x) => parseInt(x));
          data[v] = manhattenDistance(k, l, nextTarget);
        }
      }
    }
    stack.push(hash);
    data[hash] = manhattenDistance(i, j, nextTarget);
  }
  stack.sort((a, b) => heuristic(a, b));

  return;
}

export default ManhattenAStar2;

//todo, need to re do all the distances once you have reached a target
