function Board() {
    let n = 10;
    let m = 15;
    let board = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        board.push(
          <button className="node" id={`${i},${j}`} key={`${i},${j}`}>
            O
          </button>
        );
      }
    }
    return <div className="board">{board}</div>;
  }
  
  export default Board;
  