import test from 'node:test';
import assert from 'node:assert/strict';
import { bubbleSortSteps, selectionSortSteps, binarySearchSteps } from './playground-algorithms.js';

test('bubble sort produces a sorted final array', () => {
  const steps = bubbleSortSteps([5, 2, 8, 1, 3]);
  const finalArray = steps.at(-1).array;
  assert.deepEqual(finalArray, [1, 2, 3, 5, 8]);
});

test('selection sort produces a sorted final array', () => {
  const steps = selectionSortSteps([9, 4, 7, 1, 5, 3]);
  const finalArray = steps.at(-1).array;
  assert.deepEqual(finalArray, [1, 3, 4, 5, 7, 9]);
});

test('binary search finds target and records found state', () => {
  const steps = binarySearchSteps([1, 3, 5, 7, 9, 11], 7);
  const foundStep = steps.find((step) => step.found === true);
  assert.ok(foundStep, 'Expected a found step for binary search');
  assert.equal(foundStep.mid, 3);
});
