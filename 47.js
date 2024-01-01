const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  const [N] = input[0].split(' ').map(v => v * 1);
  const arr = input.slice(1);
  solution(N, arr);
});

const makeGraph = (N, arr) => {
  const graph = Array.from({ length: N + 1 }, () => []);

  arr.forEach(v => {
    const [idx, value] = v.split(' ').map(v => v * 1);
    graph[idx].push(value);
  });

  return graph;
};

const dfs = (answer, graph, numbers, check) => {
  if (numbers.length === 0) {
    return;
  } else {
    const tmp = [];
    for (let idx of numbers) {
      for (let next of graph[idx]) {
        if (check[next] === false) {
          check[next] = true;
          answer[next]++;
          tmp.push(next);
        }
      }
    }
    dfs(answer, graph, tmp, check);
  }
};

const solution = (N, arr) => {
  const tmp = [];
  const answer = Array.from({ length: N + 1 }, () => 0);
  const graph = makeGraph(N, arr);

  for (let i = 1; i <= N; i++) {
    const check = Array.from({ length: N + 1 }, () => false);
    dfs(answer, graph, [i], check);
  }

  const max = Math.max(...answer);

  answer.forEach((v, i) => {
    if (v === max) {
      tmp.push(i);
    }
  });

  console.log(tmp.join(' '));
};
