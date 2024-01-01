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

const sorting = (start, edges, indegrees) => {
  const queue = [start];
  const weights = Array.from({ length: indegrees.length }, () => 0);

  while (queue.length > 0) {
    const cur = queue.shift();

    for (let [e, w] of edges[cur]) {
      weights[e] = Math.max(weights[e], weights[cur] + w);
      indegrees[e]--;
      if (indegrees[e] === 0) {
        queue.push(e);
      }
    }
  }

  return weights;
};

const reverse = (end, weights, edges) => {
  let cnt = 0;
  const queue = [end];
  const check = Array.from({ length: edges.length + 1 }, () => false);

  while (queue.length > 0) {
    const cur = queue.shift();
    for (let [s, w] of edges[cur]) {
      if (weights[cur] === weights[s] + w) {
        cnt++;
        if (check[s] === false) {
          check[s] = true;
          queue.push(s);
        }
      }
    }
  }

  return cnt;
};

const solution = input => {
  const n = input[0] * 1;
  const [start, end] = input[input.length - 1].split(' ').map(Number);
  const edges = Array.from({ length: n + 1 }, () => []);
  const reverseEdges = Array.from({ length: n + 1 }, () => []);
  const indegrees = Array.from({ length: n + 1 }, () => 0);

  for (let i = 2; i < input.length - 1; i++) {
    const [s, e, w] = input[i].split(' ').map(Number);
    edges[s].push([e, w]);
    reverseEdges[e].push([s, w]);
    indegrees[e]++;
  }

  const weights = sorting(start, edges, indegrees);
  const cnt = reverse(end, weights, reverseEdges);

  console.log(weights[end]);
  console.log(cnt);
};

// solution([
//   "7",
//   "9",
//   "1 2 4",
//   "1 3 2",
//   "1 4 3",
//   "2 6 3",
//   "2 7 5",
//   "3 5 1",
//   "4 6 4",
//   "5 6 2",
//   "6 7 5",
//   "1 7",
// ]);
