export type SortingAlgorithm = "bubble" | "insertion" | "selection";

export type SortingStep = {
  values: number[];
  type: "compare" | "swap" | "insert" | "complete";
  indices: number[];
  description: string;
  sortedFrom?: number;
};

export function createSortingSteps(
  input: number[],
  algorithm: SortingAlgorithm,
): SortingStep[] {
  const values = [...input];
  const steps: SortingStep[] = [];

  if (algorithm === "bubble") {
    for (let end = values.length - 1; end > 0; end -= 1) {
      let changed = false;
      for (let index = 0; index < end; index += 1) {
        steps.push({
          values: [...values],
          type: "compare",
          indices: [index, index + 1],
          description: `Compare ${values[index]} and ${values[index + 1]}.`,
          sortedFrom: end + 1,
        });
        if (values[index] > values[index + 1]) {
          [values[index], values[index + 1]] = [values[index + 1], values[index]];
          changed = true;
          steps.push({
            values: [...values],
            type: "swap",
            indices: [index, index + 1],
            description: `Swap them so ${values[index]} comes before ${values[index + 1]}.`,
            sortedFrom: end + 1,
          });
        }
      }
      if (!changed) break;
    }
  }

  if (algorithm === "selection") {
    for (let start = 0; start < values.length; start += 1) {
      let minimum = start;
      for (let index = start + 1; index < values.length; index += 1) {
        steps.push({
          values: [...values],
          type: "compare",
          indices: [minimum, index],
          description: `Compare ${values[index]} with the current minimum ${values[minimum]}.`,
          sortedFrom: start,
        });
        if (values[index] < values[minimum]) minimum = index;
      }
      if (minimum !== start) {
        [values[start], values[minimum]] = [values[minimum], values[start]];
        steps.push({
          values: [...values],
          type: "swap",
          indices: [start, minimum],
          description: `Move the minimum value ${values[start]} into position ${start}.`,
          sortedFrom: start + 1,
        });
      }
    }
  }

  if (algorithm === "insertion") {
    for (let index = 1; index < values.length; index += 1) {
      const current = values[index];
      let position = index;
      while (position > 0) {
        steps.push({
          values: [...values],
          type: "compare",
          indices: [position - 1, index],
          description: `Compare ${values[position - 1]} with ${current}.`,
          sortedFrom: position,
        });
        if (values[position - 1] <= current) break;
        values[position] = values[position - 1];
        position -= 1;
      }
      values[position] = current;
      if (position !== index) {
        steps.push({
          values: [...values],
          type: "insert",
          indices: [position, index],
          description: `Insert ${current} at position ${position}.`,
          sortedFrom: position + 1,
        });
      }
    }
  }

  steps.push({
    values: [...values],
    type: "complete",
    indices: [],
    description: "The array is sorted.",
    sortedFrom: values.length,
  });

  return steps;
}