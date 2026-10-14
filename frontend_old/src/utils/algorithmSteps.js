export function bubbleSortSteps(array) {
  const steps = []
  const a = [...array]
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < a.length - i - 1; j += 1) {
      steps.push({
        array: [...a],
        compare: [j, j + 1],
        swapped: false,
        description: `Compare index ${j} and ${j + 1}`,
      })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({
          array: [...a],
          compare: [j, j + 1],
          swapped: true,
          description: `Swap ${a[j]} and ${a[j + 1]}`,
        })
      }
    }
  }
  steps.push({
    array: [...a],
    compare: [],
    swapped: false,
    description: 'Sorted array complete',
  })
  return steps
}

export function insertionSortSteps(array) {
  const steps = []
  const a = [...array]
  for (let i = 1; i < a.length; i += 1) {
    let key = a[i]
    let j = i - 1
    steps.push({
      array: [...a],
      compare: [j, i],
      swapped: false,
      description: `Insert element at index ${i} into sorted left side`,
    })
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]
      steps.push({
        array: [...a],
        compare: [j, j + 1],
        swapped: true,
        description: `Shift ${a[j]} right to index ${j + 1}`,
      })
      j -= 1
    }
    a[j + 1] = key
    steps.push({
      array: [...a],
      compare: [j + 1, i],
      swapped: true,
      description: `Place ${key} at index ${j + 1}`,
    })
  }
  steps.push({
    array: [...a],
    compare: [],
    swapped: false,
    description: 'Sorted array complete',
  })
  return steps
}

export function selectionSortSteps(array) {
  const steps = []
  const a = [...array]
  for (let i = 0; i < a.length; i += 1) {
    let minIndex = i
    for (let j = i + 1; j < a.length; j += 1) {
      steps.push({
        array: [...a],
        compare: [minIndex, j],
        swapped: false,
        description: `Compare current minimum at ${minIndex} with index ${j}`,
      })
      if (a[j] < a[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      ;[a[i], a[minIndex]] = [a[minIndex], a[i]]
      steps.push({
        array: [...a],
        compare: [i, minIndex],
        swapped: true,
        description: `Swap index ${i} with new minimum at ${minIndex}`,
      })
    }
  }
  steps.push({
    array: [...a],
    compare: [],
    swapped: false,
    description: 'Sorted array complete',
  })
  return steps
}

export function binarySearchSteps(array, target) {
  const steps = []
  const a = [...array].sort((x, y) => x - y)
  let left = 0
  let right = a.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    steps.push({
      array: [...a],
      range: [left, right],
      mid,
      target,
      description: `Search middle index ${mid} for ${target}`,
    })
    if (a[mid] === target) {
      steps.push({
        array: [...a],
        range: [left, right],
        mid,
        target,
        found: true,
        description: `Target ${target} found at index ${mid}`,
      })
      return steps
    }
    if (a[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  steps.push({
    array: [...a],
    range: [left, right],
    mid: null,
    target,
    found: false,
    description: `Target ${target} not found`,
  })
  return steps
}

export const algorithmStepFunctions = {
  'bubble-sort': bubbleSortSteps,
  'insertion-sort': insertionSortSteps,
  'selection-sort': selectionSortSteps,
  'binary-search': binarySearchSteps,
}
