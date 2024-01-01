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
  const answer = [Infinity, Infinity];
  const [n] = input[0].split(' ').map(Number);
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  for (let i = 0; i < dist.length; i++) {
    dist[i][i] = 0;
  }

  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    dist[a - 1][b - 1] = 1;
    dist[b - 1][a - 1] = 1;
  }

  for (let k = 0; k < dist.length; k++) {
    for (let i = 0; i < dist.length; i++) {
      for (let j = 0; j < dist.length; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  for (let i = 0; i < dist.length; i++) {
    const sum = dist[i].reduce((cur, acc) => cur + acc, 0);

    if (sum < answer[0]) {
      answer[0] = sum;
      answer[1] = i + 1;
    }
  }

  console.log(answer[1]);
};

const p = ['5 5', '1 3', '1 4', '4 5', '4 3', '3 2'];

solution(p);
