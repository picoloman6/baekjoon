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

const solution = input => {
  let minus = false;
  const [n, m] = input[0].split(' ').map(Number);
  const edges = [];
  const dist = Array.from({ length: n + 1 }, () => Infinity);

  for (let i = 1; i < input.length; i++) {
    const edge = input[i].split(' ').map(Number);
    edges.push(edge);
  }

  dist[1] = 0;
  for (let i = 0; i < m - 1; i++) {
    for (let [s, e, w] of edges) {
      if (isFinite(dist[s]) && dist[e] > dist[s] + w) {
        dist[e] = dist[s] + w;
      }
    }
  }

  for (let [s, e, w] of edges) {
    if (isFinite(dist[s]) && dist[e] > dist[s] + w) {
      minus = true;
      break;
    }
  }

  if (minus) {
    console.log(-1);
  } else {
    for (let i = 2; i < dist.length; i++) {
      if (isFinite(dist[i])) {
        console.log(dist[i]);
      } else {
        console.log(-1);
      }
    }
  }
};

// const input = ["3 4", "1 2 4", "1 3 3", "2 3 -1", "3 1 -2"];
// const input2 = ["3 4", "1 2 4", "1 3 3", "2 3 -4", "3 1 -2"];
// const input3 = ["3 2", "1 2 4", "1 2 3"];
// solution(input3);
