const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(...line.split(' '));
}).on('close', () => {
  const [min, max] = input.map(v => v * 1);
  solution(min, max);
});

const findPrimes = max => {
  const primes = [];
  const arr = Array.from({ length: max + 1 }, () => true);

  arr[0] = false;
  arr[1] = false;

  for (let i = 2; i < Math.sqrt(max) + 1; i++) {
    for (let j = i * 2; j < max + 1; j += i) {
      if (arr[j] === true) {
        arr[j] = false;
      }
    }
  }

  arr.forEach((v, i) => {
    if (v === true) {
      primes.push(i);
    }
  });

  return primes;
};

const solution = (min, max) => {
  let answer = max - min + 1;
  const numbers = Array.from({ length: max - min + 1 }, () => true);
  const primes = findPrimes(Math.sqrt(max));

  primes.forEach(v => {
    const pow = v ** 2;
    // 인덱스 = 실제 값 - min
    const startIdx = Math.ceil(min / pow) * pow - min;

    for (let i = startIdx; i <= max; i += pow) {
      if (numbers[i] === true) {
        numbers[i] = false;
        answer--;
      }
    }
  });

  console.log(answer);
};

function main(min, max) {
  const mid = Math.floor(Math.sqrt(max));

  // mid 이하의 소수 구하기. 에라토스테네스 체.
  const isPrime = new Array(mid + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i <= mid; i++) {
    if (isPrime[i]) {
      let j = 2;
      while (i * j <= mid) {
        isPrime[i * j++] = false;
      }
    }
  }

  const answer = new Set();
  isPrime.forEach((v, i) => {
    if (v) {
      const square = Math.pow(i, 2);
      const under = Math.ceil(min / square);
      const over = Math.floor(max / square);

      for (let j = under; j <= over; j++) {
        answer.add(square * j);
      }
    }
  });

  console.log(max - min + 1 - answer.size);
}

const main2 = (min, max) => {
  //===== false는 제곱 ㄴㄴ 수
  let nono = new Array(max - min + 1).fill(false);
  let answer = max - min + 1; //min~max까지 개수

  //===== 소수 찾기

  // max 제곱근 구하기
  const sqrt_max = Math.floor(Math.sqrt(max));

  // 2부터 max의 제곱근까지 소수찾기
  let prime = new Array(sqrt_max + 1).fill(true); //true면 소수
  const temp_sqrt = Math.ceil(Math.sqrt(sqrt_max));
  prime[0] = false;
  prime[1] = false;
  for (let i = 2; i <= temp_sqrt; i++) {
    if (!prime[i]) continue;
    let flag = true;
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      for (let k = i + i; k <= sqrt_max; k += i) {
        prime[k] = false;
      }
    }
  }

  //=== 소수*소수 배열
  const prime_list = [];

  prime.forEach((v, i) => {
    if (v) {
      prime_list.push(i * i);
    }
  });

  prime_list.forEach(v => {
    let start_min = min; //시작위치 찾기
    if (start_min % v != 0) {
      // min이 시작위치가 아니면
      start_min = (Math.floor(min / v) + 1) * v; //min보다 큰 새로운 시작위치를 찾는다
    }
    // 시작위치부터 제곱수만큼 더해 나가면서 지워준다. (에라토스테네스의 채)
    for (let i = start_min; i <= max; i += v) {
      if (!nono[i - min]) {
        nono[i - min] = true;
        answer--; // 제곱수인거 지우기
      }
    }
  });

  console.log(answer);
};

const min = 1141;
const max = 1020000;

const a = Date.now();
solution(min, max);
const b = Date.now();
console.log(b - a);
main(min, max);
const c = Date.now();
console.log(c - b);
main2(min, max);
const d = Date.now();
console.log(d - c);
