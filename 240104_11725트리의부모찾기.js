const dfs = (n, list, check, answer) => {
  for (let child of list[n]) {
    if (!check[child]) {
      check[child] = true;
      answer[child] = n;
      dfs(child, list, check, answer);
    }
  }
};

const solution = (input) => {
  const n = input[0] * 1;
  const edges = [];
  const list = Array.from({ length: n + 1 }, () => []);
  const answer = Array.from({ length: n + 1 }, () => 0);
  const check = Array.from({ length: n + 1 }, () => false);

  for (let i = 1; i < input.length; i++) {
    edges.push(input[i].split(' ').map(Number));
  }

  edges.forEach((v) => {
    const [a, b] = v;
    list[a].push(b);
    list[b].push(a);
  });

  dfs(1, list, check, answer);
  check[1] = true;

  for (let i = 2; i < answer.length; i++) {
    console.log(answer[i]);
  }
};

const p1 = ['7', '1 6', '6 3', '3 5', '4 1', '2 4', '4 7'];

const p2 = [
  '12',
  '1 2',
  '1 3',
  '2 4',
  '3 5',
  '3 6',
  '4 7',
  '4 8',
  '5 9',
  '5 10',
  '6 11',
  '6 12'
];

solution(p2);
