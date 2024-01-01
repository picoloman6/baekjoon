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
  const [n, start, end] = input[0].split(' ').map(Number);
  const incomes = input[input.length - 1].split(' ').map(Number);
  const edges = [];
  const dist = Array.from({ length: n }, () => -Infinity);

  for (let i = 1; i < input.length - 1; i++) {
    const edge = input[i].split(' ').map(Number);
    edges.push(edge);
  }

  dist[start] = incomes[start];

  for (let i = 0; i < n + 101; i++) {
    for (let [s, e, c] of edges) {
      if (dist[s] === -Infinity) {
        continue;
      }

      if (dist[s] === Infinity) {
        dist[e] = Infinity;
      } else if (dist[s] + incomes[e] - c > dist[e]) {
        dist[e] = dist[s] + incomes[e] - c;
        if (i >= n) {
          dist[e] = Infinity;
        }
      }
    }
  }

  if (dist[end] === -Infinity) {
    console.log('gg');
  } else if (dist[end] === Infinity) {
    console.log('Gee');
  } else {
    console.log(dist[end]);
  }
};

const p1 = [
  '5 0 4 7',
  '0 1 13',
  '1 2 17',
  '2 4 20',
  '0 3 22',
  '1 3 4747',
  '2 0 10',
  '3 4 10',
  '0 0 0 0 0'
];

const p2 = [
  '5 0 4 5',
  '0 1 10',
  '1 2 10',
  '2 3 10',
  '3 1 10',
  '2 4 10',
  '0 10 10 110 10'
];

const p3 = ['3 0 2 3', '0 1 10', '1 0 10', '2 1 10', '1000 1000 47000'];

const p4 = ['2 0 1 2', '0 1 1000', '1 1 10', '11 11'];

const p5 = ['1 0 0 1', '0 0 10', '7'];

const p6 = [
  '5 0 4 7',
  '0 1 13',
  '1 2 17',
  '2 4 20',
  '0 3 22',
  '1 3 4747',
  '2 0 10',
  '3 4 10',
  '8 10 20 1 100000'
];
solution(p3);
