export const algorithmCatalog = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'Repeatedly swaps adjacent values that are out of order.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    pseudocode: `for i = 0 to n-1
  for j = 0 to n-i-2
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`,
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    description: 'Finds the smallest remaining value and places it in the front.',
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    pseudocode: `for i = 0 to n-1
  minIndex = i
  for j = i+1 to n-1
    if arr[j] < arr[minIndex]
      minIndex = j
  swap(arr[i], arr[minIndex])`,
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    description: 'Builds the sorted portion by inserting each next item into place.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    pseudocode: `for i = 1 to n-1
  key = arr[i]
  j = i-1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`,
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    description: 'Checks each element until it finds the target or reaches the end.',
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    pseudocode: `for i = 0 to n-1
  if arr[i] == target
    return i
return -1`,
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    description: 'Repeatedly halves the search range until the target is found.',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
    pseudocode: `left = 0
right = n - 1
while left <= right
  mid = (left + right) / 2
  if arr[mid] == target
    return mid
  else if arr[mid] < target
    left = mid + 1
  else
    right = mid - 1`,
  },
];

export function parseArrayInput(value) {
  const cleaned = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const numbers = cleaned.map((entry) => Number(entry));
  if (numbers.length === 0 || numbers.some((num) => Number.isNaN(num))) {
    return null;
  }

  return numbers;
}

export function generateDataset(type = 'random', size = 12) {
  const valueCount = Math.max(3, Math.min(size, 18));

  switch (type) {
    case 'sorted':
      return Array.from({ length: valueCount }, (_, index) => index + 1 + Math.floor(Math.random() * 3));
    case 'reverse':
      return Array.from({ length: valueCount }, (_, index) => valueCount - index + Math.floor(Math.random() * 2));
    case 'duplicates':
      return Array.from({ length: valueCount }, () => (Math.floor(Math.random() * 5) + 1));
    case 'almost-sorted': {
      const base = Array.from({ length: valueCount }, (_, index) => index + 1);
      const swaps = Math.max(2, Math.floor(valueCount / 4));
      for (let i = 0; i < swaps; i += 1) {
        const a = Math.floor(Math.random() * valueCount);
        const b = Math.floor(Math.random() * valueCount);
        [base[a], base[b]] = [base[b], base[a]];
      }
      return base;
    }
    case 'random':
    default:
      return Array.from({ length: valueCount }, () => Math.floor(Math.random() * 50) + 1);
  }
}

export function bubbleSortSteps(array) {
  const steps = [];
  const values = [...array];
  let sortedIndices = [];

  for (let i = 0; i < values.length; i += 1) {
    for (let j = 0; j < values.length - i - 1; j += 1) {
      steps.push({
        array: [...values],
        compare: [j, j + 1],
        sortedIndices: [...sortedIndices],
        description: `Compare ${values[j]} and ${values[j + 1]}`,
      });

      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        steps.push({
          array: [...values],
          compare: [j, j + 1],
          sortedIndices: [...sortedIndices],
          description: `Swap ${values[j]} and ${values[j + 1]}`,
        });
      }
    }

    sortedIndices.push(values.length - i - 1);
    steps.push({
      array: [...values],
      compare: [],
      sortedIndices: [...sortedIndices],
      description: `Element ${values[values.length - i - 1]} is in its final position`,
    });
  }

  steps.push({
    array: [...values],
    compare: [],
    sortedIndices: [...Array(values.length).keys()],
    description: 'Sorting complete',
  });

  return steps;
}

export function selectionSortSteps(array) {
  const steps = [];
  const values = [...array];

  for (let i = 0; i < values.length; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < values.length; j += 1) {
      steps.push({
        array: [...values],
        compare: [minIndex, j],
        sortedIndices: [...Array(i).keys()],
        description: `Compare current minimum at ${minIndex} with index ${j}`,
      });

      if (values[j] < values[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [values[i], values[minIndex]] = [values[minIndex], values[i]];
      steps.push({
        array: [...values],
        compare: [i, minIndex],
        sortedIndices: [...Array(i + 1).keys()],
        description: `Place ${values[i]} in sorted position ${i}`,
      });
    }
  }

  steps.push({
    array: [...values],
    compare: [],
    sortedIndices: [...Array(values.length).keys()],
    description: 'Selection sort complete',
  });

  return steps;
}

export function insertionSortSteps(array) {
  const steps = [];
  const values = [...array];

  for (let i = 1; i < values.length; i += 1) {
    let key = values[i];
    let j = i - 1;

    while (j >= 0 && values[j] > key) {
      values[j + 1] = values[j];
      steps.push({
        array: [...values],
        compare: [j, j + 1],
        sortedIndices: [...Array(i).keys()],
        description: `Shift ${values[j]} to the right`,
      });
      j -= 1;
    }

    values[j + 1] = key;
    steps.push({
      array: [...values],
      compare: [j + 1, i],
      sortedIndices: [...Array(i + 1).keys()],
      description: `Insert ${key} into the sorted section`,
    });
  }

  steps.push({
    array: [...values],
    compare: [],
    sortedIndices: [...Array(values.length).keys()],
    description: 'Insertion sort complete',
  });

  return steps;
}

export function linearSearchSteps(array, target) {
  const steps = [];
  const values = [...array];

  for (let i = 0; i < values.length; i += 1) {
    steps.push({
      array: [...values],
      compare: [i],
      target,
      description: `Check index ${i} for target ${target}`,
    });

    if (values[i] === target) {
      steps.push({
        array: [...values],
        compare: [i],
        target,
        found: true,
        description: `Target ${target} found at index ${i}`,
      });
      return steps;
    }
  }

  steps.push({
    array: [...values],
    compare: [],
    target,
    found: false,
    description: `Target ${target} was not found`,
  });

  return steps;
}

export function binarySearchSteps(array, target) {
  const steps = [];
  const values = [...array].sort((a, b) => a - b);
  let left = 0;
  let right = values.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({
      array: [...values],
      compare: [mid],
      range: [left, right],
      mid,
      target,
      description: `Check the midpoint at index ${mid}`,
    });

    if (values[mid] === target) {
      steps.push({
        array: [...values],
        compare: [mid],
        range: [left, right],
        mid,
        target,
        found: true,
        description: `Target ${target} found at index ${mid}`,
      });
      return steps;
    }

    if (values[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  steps.push({
    array: [...values],
    compare: [],
    range: [left, right],
    target,
    found: false,
    description: `Target ${target} was not found`,
  });

  return steps;
}

export function generateStepsForAlgorithm(algorithmId, array, target) {
  switch (algorithmId) {
    case 'bubble-sort':
      return bubbleSortSteps(array);
    case 'selection-sort':
      return selectionSortSteps(array);
    case 'insertion-sort':
      return insertionSortSteps(array);
    case 'linear-search':
      return linearSearchSteps(array, target);
    case 'binary-search':
      return binarySearchSteps(array, target);
    default:
      return bubbleSortSteps(array);
  }
}
