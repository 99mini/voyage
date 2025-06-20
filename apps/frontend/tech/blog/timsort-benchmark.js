/////////////////////////////////////
//  Timsort 간단한 버전 직접 구현  //
/////////////////////////////////////

function minRunLength(n) {
  let r = 0;
  while (n >= 32) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}

function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    let key = arr[i],
      j = i - 1;
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j--];
    }
    arr[j + 1] = key;
  }
}

function merge(arr, l, m, r) {
  const left = arr.slice(l, m + 1),
    right = arr.slice(m + 1, r + 1);
  let i = 0,
    j = 0,
    k = l;
  while (i < left.length && j < right.length) {
    arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}

function timsort(arr) {
  const n = arr.length,
    minRun = minRunLength(n);
  for (let i = 0; i < n; i += minRun) {
    insertionSort(arr, i, Math.min(i + minRun - 1, n - 1));
  }
  for (let size = minRun; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }
  return arr;
}

/////////////////////////////////////
//            벤치마크             //
/////////////////////////////////////

const { performance } = require('perf_hooks');

/**
 * 테스트 데이터 생성
 */
function generateData(size, type) {
  const data = [];
  switch (type) {
    case 'random':
      for (let i = 0; i < size; i++) data.push(Math.floor(Math.random() * size));
      break;
    case 'ascending':
      for (let i = 0; i < size; i++) data.push(i);
      break;
    case 'descending':
      for (let i = 0; i < size; i++) data.push(size - i);
      break;
    case 'partial':
      for (let i = 0; i < size; i++) data.push(i);
      for (let j = 0; j < size * 0.1; j++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        [data[a], data[b]] = [data[b], data[a]];
      }
      break;
    case 'equal':
      for (let i = 0; i < size; i++) data.push(42);
      break;
  }
  return data;
}

/**
 * @type {Array<{size: number, type: 'random' | 'ascending' | 'descending' | 'partial' | 'equal', method: 'builtin' | 'timsort', avgTime: number, numberOfTrials: number}>}
 */
const result = [];

/**
 * 벤치마크 실행 및 결과 출력
 */
async function runBenchmark() {
  const sizes = [1e1, 1e2, 1e3, 1e4, 1e5];
  const types = ['random', 'ascending', 'descending', 'partial', 'equal'];
  const iterations = 100;

  console.log('Size,Type,Method,AvgTime(ms)');
  for (const size of sizes) {
    for (const type of types) {
      // 내장 sort 벤치
      let totalStd = 0;
      for (let i = 0; i < iterations; i++) {
        const data = generateData(size, type);
        const start = performance.now();
        data.sort((a, b) => a - b);
        totalStd += performance.now() - start;
      }
      console.log(`${size},${type},builtin,${(totalStd / iterations).toFixed(3)}`);
      result.push({ size, type, method: 'builtin', avgTime: totalStd / iterations, numberOfTrials: iterations });

      // TimSort 벤치
      let totalTim = 0;
      for (let i = 0; i < iterations; i++) {
        const data = generateData(size, type);
        const start = performance.now();
        timsort(data);
        totalTim += performance.now() - start;
      }
      console.log(`${size},${type},timsort,${(totalTim / iterations).toFixed(3)}`);
      result.push({ size, type, method: 'timsort', avgTime: totalTim / iterations, numberOfTrials: iterations });
    }
  }
}

runBenchmark();

console.table(result, ['size', 'type', 'method', 'avgTime', 'numberOfTrials']);
