export type Difficulty = "Easy" | "Medium" | "Hard";
export type ProblemCategory =
  | "Arrays"
  | "Strings"
  | "Linked Lists"
  | "Stack"
  | "Queue"
  | "Trees"
  | "Graphs"
  | "Hash Tables"
  | "Dynamic Programming"
  | "Backtracking";

export type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: ProblemCategory;
  description: string;
  statement: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string;
  hint: string;
  solution: string;
  complexity: string;
  tags: string[];
};

export const problems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    description: "Return the indices of two numbers that add up to a target value.",
    statement:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: "2 <= nums.length <= 10^4; -10^9 <= nums[i] <= 10^9; -10^9 <= target <= 10^9",
    hint: "A hash map lets you store seen values and look up complements in O(1) time.",
    solution:
      "Use a hash map to store each value with its index. For each number, compute the complement target - num and check if it has been seen before. If yes, return the indices.",
    complexity: "Time: O(n), Space: O(n)",
    tags: ["Hash Map", "Arrays", "Interview"],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: "Check whether a string of brackets is valid.",
    statement:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = '()'", output: "true" },
      { input: "s = '[()]'", output: "true" },
      { input: "s = '(]'", output: "false" },
    ],
    constraints: "1 <= s.length <= 10^4",
    hint: "Use a stack and match every closing bracket with the most recent opening bracket.",
    solution:
      "Traverse the string. When you see an opening bracket, push it onto a stack. When you see a closing bracket, check the top of the stack; if it matches, pop it. At the end, the stack must be empty.",
    complexity: "Time: O(n), Space: O(n)",
    tags: ["Stack", "String Matching"],
  },
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Trees",
    description: "Return the level-order traversal of a binary tree.",
    statement:
      "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
    ],
    constraints: "The number of nodes in the tree is in the range [0, 2000].",
    hint: "Use a queue to process nodes by level.",
    solution:
      "Perform BFS from the root using a queue. Enqueue nodes level by level and collect their values into arrays per depth. This naturally yields the tree's breadth-first traversal.",
    complexity: "Time: O(n), Space: O(w), where w is the maximum width of the tree",
    tags: ["Trees", "Queue", "BFS"],
  },
  {
    id: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: "Decide whether a string can be segmented into dictionary words.",
    statement:
      "Given a string s and a dictionary of words wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [
      { input: "s = 'leetcode', wordDict = ['leet','code']", output: "true" },
      { input: "s = 'applepenapple', wordDict = ['apple','pen']", output: "true" },
    ],
    constraints: "1 <= s.length <= 300; 1 <= wordDict.length <= 1000; all words are lowercase",
    hint: "Use DP to track which prefixes are reachable.",
    solution:
      "Let dp[i] mean that the prefix s[0:i] can be segmented. Iterate through the string and try each word from the dictionary that matches s[i: j]. If a match succeeds, dp[j] becomes true.",
    complexity: "Time: O(n * m * L), Space: O(n)",
    tags: ["DP", "Strings"],
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Arrays",
    description: "Merge overlapping intervals into a sorted list.",
    statement:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input intervals.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
    ],
    constraints: "1 <= intervals.length <= 10^4",
    hint: "Sort by start time and merge consecutive overlapping ranges.",
    solution:
      "Sort the intervals by start value. Iterate from left to right, keeping a current merged interval. If the next interval overlaps the current one, extend the end; otherwise, push the merged interval and start a new one.",
    complexity: "Time: O(n log n), Space: O(n)",
    tags: ["Sorting", "Intervals"],
  },
  {
    id: "top-k-frequent",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Hash Tables",
    description: "Return the k most frequent elements from an array.",
    statement:
      "Given an integer array nums and an integer k, return the k most frequent elements. The answer can be returned in any order.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
    ],
    constraints: "1 <= nums.length <= 10^5; k is in the range [1, number of unique elements].",
    hint: "Count frequencies and sort by count descending.",
    solution:
      "Count each number in a frequency map. Then sort the unique elements by frequency descending, and return the first k. This is a common pattern for frequency analysis tasks.",
    complexity: "Time: O(n log n), Space: O(n)",
    tags: ["Hash Map", "Sorting"],
  },
];

export function getProblemById(id: string) {
  return problems.find((problem) => problem.id === id) ?? null;
}

export function getProblemSummaries() {
  return problems.map(({ id, title, difficulty, category, description }) => ({
    id,
    title,
    difficulty,
    category,
    description,
  }));
}
