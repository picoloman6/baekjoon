const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  solution(input);
});

// 섬 구분 로직
const dfs = (board, num, x, y, coordinates) => {
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];

  board[x][y] = num;
  coordinates.push([x, y, num, 0]);
  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length) {
      if (board[nx][ny] === 1) {
        dfs(board, num, nx, ny, coordinates);
      }
    }
  }
};

const makeBoard = (input, n, m) => {
  let num = 2;
  const board = [];
  const coordinates = [];

  for (let i = 1; i < input.length; i++) {
    board.push(input[i].split(' ').map(Number));
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 1) {
        dfs(board, num, i, j, coordinates);
        num++;
      }
    }
  }

  return [board, coordinates, num - 2];
};

// 각 섬의 좌표에서 다른 섬에 도달할 수 있을 때 edge로 추가
const makeEdges = (board, coordinates) => {
  const edges = [];
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];

  while (coordinates.length > 0) {
    const [x, y, start, d] = coordinates.shift();
    for (const [dx, dy] of dirs) {
      let nx = x + dx;
      let ny = y + dy;
      let nd = d;
      while (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length) {
        const next = board[nx][ny];
        if (next === start) {
          break;
        } else if (next !== 0 && next !== start) {
          if (nd > 1) {
            edges.push([start - 1, next - 1, nd]);
          }
          break;
        }

        nx += dx;
        ny += dy;
        nd++;
      }
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  return edges;
};

const find = (parents, a) => {
  if (a !== parents[a]) {
    parents[a] = find(parents, parents[a]);
  }

  return parents[a];
};

const union = (parents, a, b) => {
  const idx1 = find(parents, a);
  const idx2 = find(parents, b);

  if (idx1 !== idx2) {
    parents[idx2] = idx1;
  }
};

const solution = input => {
  let cnt = 0;
  let answer = 0;
  const [n, m] = input[0].split(' ').map(Number);
  const [board, coordinates, num] = makeBoard(input, n, m);
  const edges = makeEdges(board, coordinates);
  const parents = Array.from({ length: n + 1 }, (_, i) => i);

  for (const [s, e, w] of edges) {
    if (cnt === num - 1) {
      break;
    }

    const start = find(parents, s);
    const end = find(parents, e);

    if (start !== end) {
      union(parents, s, e);
      cnt++;
      answer += w;
    }
  }

  if (cnt === num - 1) {
    console.log(answer);
  } else {
    console.log(-1);
  }
};

const p1 = [
  '7 8',
  '0 0 0 0 0 0 1 1',
  '1 1 0 0 0 0 1 1',
  '1 1 0 0 0 0 0 0',
  '1 1 0 0 0 1 1 0',
  '0 0 0 0 0 1 1 0',
  '0 0 0 0 0 0 0 0',
  '1 1 1 1 1 1 1 1'
];

const p2 = [
  '7 8',
  '0 0 0 1 1 0 0 0',
  '0 0 0 1 1 0 0 0',
  '1 1 0 0 0 0 1 1',
  '1 1 0 0 0 0 1 1',
  '1 1 0 0 0 0 0 0',
  '0 0 0 0 0 0 0 0',
  '1 1 1 1 1 1 1 1'
];

const p4 = [
  '7 7',
  '1 1 1 0 1 1 1',
  '1 1 1 0 1 1 1',
  '1 1 1 0 1 1 1',
  '0 0 0 0 0 0 0',
  '1 1 1 0 1 1 1',
  '1 1 1 0 1 1 1',
  '1 1 1 0 1 1 1'
];

solution(p4);
