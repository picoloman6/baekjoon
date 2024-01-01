const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = 0;

const findPrimes = num => {
  const numbers = Array.from({ length: num + 1 }, () => true);

  numbers[0] = false;
  numbers[1] = false;

  for (let i = 2; i < Math.sqrt(numbers.length); i++) {
    for (let j = i * 2; j < numbers.length; j += i) {
      numbers[j] = false;
    }
  }

  return numbers;
};

const isPrime = num => {
  for (let i = 2; i < Math.floor(num / 2) + 1; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const dfs = (max, primes, addNums, num) => {
  if (String(num).length === max && primes[num] === true) {
    console.log(num);
    return;
  } else {
    for (let i = 0; i < addNums.length; i++) {
      const newNum = num * 10 + addNums[i];
      if (primes[num] === true && String(newNum).length <= max) {
        dfs(max, primes, addNums, newNum);
      }
    }
  }
};

const solution = n => {
  const addNums = [1, 3, 5, 7, 9];
  const primes = findPrimes(10 ** n - 1);

  for (let i of [2, 3, 5, 7]) {
    dfs(n, primes, addNums, i);
  }
};

rl.on('line', line => {
  input = line * 1;
}).on('close', () => {
  const start = Date.now();
  solution(input);
  const end = Date.now();
  console.log(`${(end - start) / 1000}s`);
  const a = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`${Math.round(a * 100) / 100}MB`);
});
