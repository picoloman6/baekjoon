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

const dijkstra = (N, list, startIdx, endIdx) => {
  const heap = new Heap();
  const costs = Array.from({ length: N + 1 }, () => Infinity);
  const check = Array.from({ length: N + 1 }, () => false);

  costs[startIdx] = 0;
  heap.push(startIdx, 0);

  while (heap.nodes.length > 1) {
    const [curNode, curCost] = heap.pop();

    if (check[curNode] === false) {
      check[curNode] = true;
      for (let [nextNode, nextCost] of list[curNode]) {
        const newCost = curCost + nextCost;
        if (check[nextNode] === false && costs[nextNode] > newCost) {
          costs[nextNode] = newCost;
          heap.push(nextNode, newCost);
        }
      }
    }
  }

  console.log(costs[endIdx]);
};

const solution = input => {
  const N = input[0] * 1;
  const list = Array.from({ length: N + 1 }, () => []);
  const [startIdx, endIdx] = input[input.length - 1].split(' ').map(v => v * 1);

  for (let i = 2; i < input.length - 1; i++) {
    const [start, end, cost] = input[i].split(' ');

    list[start * 1].push([end * 1, cost * 1]);
  }

  dijkstra(N, list, startIdx, endIdx);
};
