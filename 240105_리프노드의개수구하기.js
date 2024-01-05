const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  solution(input);
});

const dfs = (list, ban, check, n, answer) => {
  check[n] = true;
  if (n === ban) {
    return;
  }

  if (list[n].length === 0) {
    answer[0]++;
  } else {
    let child = 0;
    for (const next of list[n]) {
      if (!check[next]) {
        dfs(list, ban, check, next, answer);
        child++;
      }
    }
    if (child === 0) {
      answer[0]++;
    }
  }
};

const solution = (input) => {
  let start = 0;
  const n = input[0] * 1;
  const parents = input[1].split(' ').map(Number);
  const ban = input[2] * 1;
  const list = Array.from({ length: n }, () => []);
  const answer = [0];
  const check = Array.from({ length: n }, () => false);

  for (let i = 0; i < parents.length; i++) {
    const parent = parents[i];
    if (parent === -1) {
      start = i;
    } else {
      list[parent].push(i);
      list[i].push(parent);
    }
  }

  console.log(list);
  dfs(list, ban, check, start, answer);

  console.log(answer[0]);
};

const p1 = ['5', '-1 0 0 1 1', '2'];
const p2 = ['5', '-1 0 0 1 1', '1'];
const p3 = ['5', '-1 0 0 1 1', '0'];
const p4 = ['9', '-1 0 0 2 2 4 4 6 6', '4'];

solution(p1);
