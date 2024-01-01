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

const find = (parents, idx) => {
  if (parents[idx] !== idx) {
    parents[idx] = find(parents, parents[idx]);
  }

  return parents[idx];
};

const union = (parents, idx1, idx2) => {
  const parent = find(parents, idx1);
  const child = find(parents, idx2);

  if (parent !== child) {
    parents[child] = parent;
  }
};

const solution = input => {
  const [n] = input[0].split(' ').map(Number);
  const parents = Array.from({ length: n + 1 }, (_, i) => i);
  const commands = [];

  for (let i = 1; i < input.length; i++) {
    commands.push(input[i].split(' ').map(Number));
  }

  commands.forEach(v => {
    if (v[0] === 0) {
      union(parents, v[1], v[2]);
    } else {
      const first = find(parents, v[1]);
      const second = find(parents, v[2]);

      if (first === second) {
        console.log('YES');
      } else {
        console.log('NO');
      }
    }
  });
};
