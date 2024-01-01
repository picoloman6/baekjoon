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
  const queue = [];
  const n = input[0] * 1;
  const answer = Array.from({ length: n + 1 }, () => 0);
  const list = Array.from({ length: n + 1 }, () => []);
  const costs = Array.from({ length: n + 1 }, () => Infinity);
  const indegrees = Array.from({ length: n + 1 }, () => 0);

  for (let i = 1; i <= n; i++) {
    const tmp = input[i].split(' ');

    for (let j = 0; j < tmp.length - 1; j++) {
      const cur = tmp[j] * 1;
      if (j === 0) {
        costs[i] = cur;
      } else {
        list[cur].push(i);
        indegrees[i]++;
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    if (indegrees[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const cur = queue.shift();
    for (let next of list[cur]) {
      answer[next] = Math.max(answer[next], answer[cur] + costs[cur]);
      indegrees[next]--;

      if (indegrees[next] === 0) {
        queue.push(next);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    console.log(answer[i] + costs[i]);
  }
};
