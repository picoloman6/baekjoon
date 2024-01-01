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

const getEdges = input => {
  const edges = [];

  for (let i = 1; i < input.length; i++) {
    edges.push(input[i].split(' ').map(Number));
  }

  edges.sort((a, b) => a[2] - b[2]);

  return edges;
};

const solution = input => {
  let cnt = 0;
  let answer = 0;
  const [n] = input[0].split(' ').map(Number);
  const edges = getEdges(input);
  const parents = Array.from({ length: n + 1 }, (_, i) => i);

  for (const [s, e, w] of edges) {
    if (cnt === n - 1) {
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

  console.log(answer);
};

// const p = ["3 3", "2 3 2", "1 3 3", "1 2 1"];
// solution(p);
