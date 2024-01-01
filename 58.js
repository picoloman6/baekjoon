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

class Heap {
  constructor() {
    this.nodes = [null];
    this.costs = [null];
  }

  push(node, cost) {
    this.nodes.push(node);
    this.costs.push(cost);

    let idx = this.nodes.length - 1;
    let parentIdx = Math.floor(idx / 2);

    while (this.costs[idx] < this.costs[parentIdx]) {
      const parentNode = this.nodes[parentIdx];
      const parentCost = this.costs[parentIdx];

      this.nodes[parentIdx] = this.nodes[idx];
      this.costs[parentIdx] = this.costs[idx];

      this.nodes[idx] = parentNode;
      this.costs[idx] = parentCost;

      idx = parentIdx;
      parentIdx = Math.floor(idx / 2);
    }
  }

  pop() {
    if (this.nodes.length === 1) {
      return;
    }

    if (this.nodes.length === 2) {
      return [this.nodes.pop(), this.costs.pop()];
    }

    const returnValue = [this.nodes[1], this.costs[1]];

    this.nodes[1] = this.nodes.pop();
    this.costs[1] = this.costs.pop();

    let idx = 1;
    let leftIdx = idx * 2;
    let rightIdx = idx * 2 + 1;

    while (
      this.costs[idx] > this.costs[leftIdx] ||
      this.costs[idx] > this.costs[rightIdx]
    ) {
      if (this.costs[rightIdx] <= this.costs[leftIdx]) {
        const rightNode = this.nodes[rightIdx];
        const rightCost = this.costs[rightIdx];

        this.nodes[rightIdx] = this.nodes[idx];
        this.costs[rightIdx] = this.costs[idx];

        this.nodes[idx] = rightNode;
        this.costs[idx] = rightCost;

        idx = rightIdx;
      } else {
        const leftNode = this.nodes[leftIdx];
        const leftCost = this.costs[leftIdx];

        this.nodes[leftIdx] = this.nodes[idx];
        this.costs[leftIdx] = this.costs[idx];

        this.nodes[idx] = leftNode;
        this.costs[idx] = leftCost;

        idx = leftIdx;
      }

      leftIdx = idx * 2;
      rightIdx = idx * 2 + 1;
    }

    return returnValue;
  }
}

const dijkstra = (n, k, list) => {
  const heap = new Heap();
  const distances = Array.from({ length: n + 1 }, () =>
    new Array(k).fill(Infinity)
  );

  heap.push(1, 0);
  distances[1][0] = 0;

  while (heap.nodes.length > 1) {
    const [curNode, curCost] = heap.pop();

    for (let [nextNode, nextCost] of list[curNode]) {
      const newCost = curCost + nextCost;

      if (distances[nextNode][k - 1] > newCost) {
        distances[nextNode][k - 1] = newCost;
        distances[nextNode].sort((a, b) => a - b);
        heap.push(nextNode, newCost);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    const cur = distances[i][k - 1];
    if (!isFinite(cur)) {
      console.log(-1);
    } else {
      console.log(cur);
    }
  }
};

const solution = input => {
  const [n, , k] = input[0].split(' ').map(Number);
  const list = Array.from({ length: n + 1 }, () => []);

  for (let i = 1; i < input.length; i++) {
    const [start, end, cost] = input[i].split(' ').map(Number);

    list[start].push([end, cost]);
  }

  dijkstra(n, k, list);
};
