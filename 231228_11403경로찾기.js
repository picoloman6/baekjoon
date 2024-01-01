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
  const dist = [];

  for (let i = 1; i < input.length; i++) {
    dist.push(input[i].split(' ').map(Number));
  }

  for (let k = 0; k < dist.length; k++) {
    for (let i = 0; i < dist.length; i++) {
      for (let j = 0; j < dist.length; j++) {
        if (dist[i][k] === 1 && dist[k][j] === 1) {
          dist[i][j] = 1;
        }
      }
    }
  }

  for (let i = 0; i < dist.length; i++) {
    console.log(dist[i].join(' '));
  }
};

const p = ['3', '0 1 0', '0 0 1', '1 0 0'];
const p2 = [
  '7',
  '0 0 0 1 0 0 0',
  '0 0 0 0 0 0 1',
  '0 0 0 0 0 0 0',
  '0 0 0 0 1 1 0',
  '1 0 0 0 0 0 0',
  '0 0 0 0 0 0 1',
  '0 0 1 0 0 0 0'
];
solution(p2);
