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

const transInput = input => {
  let total = 0;
  const n = input[0] * 1;
  const graph = input.splice(1);
  const edges = [];

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
      const value = graph[i][j];
      if (value === '0') {
        continue;
      }

      if (/[A-Z]/.test(value)) {
        const cost = value.charCodeAt(0) - 38;
        i !== j && edges.push([i, j, cost]);
        total += cost;
      } else {
        const cost = value.charCodeAt(0) - 96;
        i !== j && edges.push([i, j, cost]);
        total += cost;
      }
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  return [n, total, edges];
};

const find = (parents, idx) => {
  if (idx !== parents[idx]) {
    parents[idx] = find(parents, parents[idx]);
  }

  return parents[idx];
};

const union = (parents, parentIdx, childIdx) => {
  const parent = find(parents, parentIdx);
  const child = find(parents, childIdx);

  if (parent !== child) {
    parents[child] = parent;
  }
};

const solution = input => {
  let usedEdges = 0;
  let usedLine = 0;
  const [n, total, edges] = transInput(input);
  const parents = Array.from({ length: n }, (_, i) => i);

  for (const [s, e, c] of edges) {
    if (usedEdges === n - 1) {
      break;
    }

    const start = find(parents, s);
    const end = find(parents, e);

    if (start !== end) {
      union(parents, start, end);
      usedEdges++;
      usedLine += c;
    }
  }

  if (usedEdges === n - 1) {
    console.log(total - usedLine);
  } else {
    console.log(-1);
  }
};

const p1 = ['3', 'abc', 'def', 'ghi'];
const p2 = ['2', 'a0', '0b'];
const p3 = ['4', '0X00', '00Y0', '0000', '00Z0'];
const p4 = ['2', 'Az', 'aZ'];
const p5 = ['4', '0top', 'c0od', 'er0o', 'pen0'];

solution(p5);
