// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const input = [];

// rl.on("line", (line) => {
//   input.push(line);
// }).on("close", () => {
//   const arr = input.splice(1);
//   solution(arr);
// });

// 입력 받아서 배열로 바꾸는 함수
const makeBoard = arr => {
  const board = [];

  for (let i = 0; i < arr.length; i++) {
    const tmp = [];
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === '1') {
        tmp.push(1);
      } else {
        tmp.push(0);
      }
    }

    board.push(tmp);
  }

  return board;
};

const bfs = (board, x, y) => {
  const queue = [];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  queue.push([x, y]);

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    for (let [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length) {
        if (board[nx][ny] === 1) {
          board[nx][ny] = board[cx][cy] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }
};

const solution = arr => {
  const board = makeBoard(arr);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 1) {
        bfs(board, i, j);
      }
    }
  }

  console.log(board[board.length - 1][board[0].length - 1]);
};
