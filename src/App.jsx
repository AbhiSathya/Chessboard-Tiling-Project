import { useState } from 'react'

function App() {
  const [size, setSize] = useState("")
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [result, setResult] = useState("");
  let cnt = 1;
  let board = [];
  const powerof2 = (num) => {
    if (num <= 0) return false;
    if (num == 1) return true;
    return num%2 == 0 && powerof2(num/2);
  }

  const help = (size, a, b, rStart, cStart) => {
    if (size == 1) return;
    let half = size/2;
    let qr = Number.parseInt((a - rStart)/half);
    let qc = Number.parseInt((b - cStart)/half);
    
        // Get & mark 4 centers
    if (!(qr == 0 && qc == 0)){
            board[rStart + half-1][cStart + half-1] = cnt;
    }
    if (!(qr == 0 && qc == 1)){
        board[rStart + half-1][cStart + half] = cnt;
    }
    if(!(qr == 1 && qc == 0)){
        board[rStart + half][cStart + half-1] = cnt;
    }
    if (!(qr == 1 && qc == 1)){
        board[rStart + half][cStart + half] = cnt;
    }
    cnt++;
    if (!(qr == 0 && qc == 0)){
        help(half, rStart + half-1, cStart + half-1, rStart, cStart);
    } else{
        help(half, a, b, rStart, cStart);
    }
    if (!(qr == 0 && qc == 1)){
        help(half, rStart + half-1, cStart + half, rStart, cStart+half);
    } else{
        help(half, a, b, rStart, cStart + half);
    }
    if(!(qr == 1 && qc == 0)){
        help(half, rStart + half, cStart + half-1, rStart + half, cStart);
    } else{
        help(half, a, b, rStart + half, cStart);
    }
    if (!(qr == 1 && qc == 1)){
        help(half, rStart + half, cStart + half, rStart + half, cStart + half);
    } else{
        help(half, a, b, rStart + half, cStart + half);
    }
  }

  const handleSolve = () => {
    if (!powerof2(size)) return;
    board = [];
    for(let i = 0; i < size; i++){
      const row = [];
      for(let j = 0; j < size; j++){
        row.push(0);
      }
      board.push(row);
    }

    board[x][y] = -1;
    help(size, x, y, 0, 0);
    console.log(board);
    const map = createMap(size);
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        if (board[i][j] === -1){
          board[i][j] = <h1 style={{margin : "0px", textAlign : "center", padding: "auto"}}>X</h1>
        } else{
          board[i][j] = <div key={i + " " + j} style={{
            width: "70px",
            height: "70px",
            backgroundColor : "#" + map.get(board[i][j])
          }}></div>
        }
      }
    }
    setResult(board);
  }

  const createMap = (size) => {
    let n = (size * size) - 1;
    n = Number.parseInt(n/3);
    const map = new Map();
    // map.set(-1, Math.floor(0).toString(16));
    for(let c = 1; c <= n; c++){
      map.set(c, Math.floor(Math.random()*16777215).toString(16));
    }
    return map;
  }
  return (
    <div style={{
      display : 'flex',
      alignItems : 'center',
      flexDirection : 'column',
      gap : 25
    }}>
      <div>
      <input placeholder='Enter Size' type="number" id='size' value={size} onChange={e => setSize(e.target.value)} />
      <input placeholder='Enter X Quadrant' type="number" id='x' value={x} onChange={e => setX(e.target.value)} />
      <input placeholder='Enter Y Quadrant' type="number" id='y' value={y} onChange={e => setY(e.target.value)} />
      <button id="solve" onClick={handleSolve}>Solve</button>
      </div>
      <div style={{
        display:"grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width : size * 70 + "px",
        height : size * 70 + "px"
      }}>{result}</div>
    </div>
  )
}

export default App
