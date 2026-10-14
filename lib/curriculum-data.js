export const curriculumLessons = [
  {
    slug: 'arrays-and-strings',
    title: 'Arrays and Strings',
    category: 'Foundations',
    week: 1,
    difficulty: 'Beginner',
    duration: '5 lessons',
    summary: 'Build the core mental models for indexing, iteration, and linear scanning.',
    objectives: [
      'Recognize when array operations are linear versus constant time.',
      'Use two-pointer patterns to solve common interview problems.',
      'Translate string constraints into efficient scanning logic.'
    ],
    concepts: [
      'Indexing and mutation',
      'Subarray patterns',
      'Palindrome and anagram thinking',
      'Hash map acceleration'
    ],
    practice: [
      'Two Sum',
      'Valid Anagram',
      'Longest Substring Without Repeating Characters'
    ],
    visualization: 'Explore sliding-window and prefix-scan movement on array data.',
    checkpoint: 'Can you explain why brute force is O(n²) and when a hashmap makes it O(n)?'
  },
  {
    slug: 'stack-and-queue',
    title: 'Stacks and Queues',
    category: 'Linear Structures',
    week: 2,
    difficulty: 'Beginner',
    duration: '4 lessons',
    summary: 'Learn order-sensitive data structures for parsing, scheduling, and buffering.',
    objectives: [
      'Model LIFO and FIFO behavior with real examples.',
      'Use a stack for balancing and backtracking operations.',
      'Apply queue reasoning for fairness and batching problems.'
    ],
    concepts: [
      'Push/pop semantics',
      'Monotonic stacks',
      'Breadth-first ordering',
      'Deque use cases'
    ],
    practice: [
      'Valid Parentheses',
      'Min Stack',
      'Binary Tree Level Order'
    ],
    visualization: 'Trace the stack growth and queue dequeue order during each algorithm step.',
    checkpoint: 'Can you tell when a stack is better than a queue in a parser or path search?'
  },
  {
    slug: 'linked-lists',
    title: 'Linked Lists',
    category: 'Pointer Logic',
    week: 3,
    difficulty: 'Intermediate',
    duration: '4 lessons',
    summary: 'Understand pointer manipulation, node traversal, and list invariants.',
    objectives: [
      'Track head/tail references safely.',
      'Manipulate next pointers without losing nodes.',
      'Write pointer-safe algorithms for merging and reversal.'
    ],
    concepts: [
      'Node structure',
      'Cycle detection',
      'Reverse and merge patterns',
      'Dummy head technique'
    ],
    practice: [
      'Reverse Linked List',
      'Detect Cycle',
      'Merge Two Lists'
    ],
    visualization: 'Visualize pointer changes on each step to see how nodes move without reallocation.',
    checkpoint: 'Can you describe why a dummy head simplifies edge cases in list algorithms?'
  },
  {
    slug: 'recursion',
    title: 'Recursion and Backtracking',
    category: 'Problem Solving',
    week: 4,
    difficulty: 'Intermediate',
    duration: '5 lessons',
    summary: 'Break complex tasks into smaller instances while keeping state under control.',
    objectives: [
      'Identify base cases and recursive decomposition.',
      'Trace call stacks and recursion trees clearly.',
      'Use backtracking when exploring candidate states.'
    ],
    concepts: [
      'Base case design',
      'Call stack behavior',
      'Combinatorial search',
      'Memoization patterns'
    ],
    practice: [
      'Subsets',
      'Permutations',
      'N-Queens'
    ],
    visualization: 'Trace recursion depth and candidate expansions on a decision tree.',
    checkpoint: 'Can you reason about the branching factor and time complexity of a recursive search?'
  },
  {
    slug: 'trees',
    title: 'Trees and Traversals',
    category: 'Hierarchical Data',
    week: 5,
    difficulty: 'Intermediate',
    duration: '6 lessons',
    summary: 'Explore rooted structures, traversal order, and tree-specific optimization strategies.',
    objectives: [
      'Distinguish preorder, inorder, and postorder behavior.',
      'Apply BFS and DFS in tree and graph problems.',
      'Reason about balanced and degenerate tree shapes.'
    ],
    concepts: [
      'Binary search trees',
      'DFS vs BFS',
      'Tree height and depth',
      'Traversal invariants'
    ],
    practice: [
      'Maximum Depth of Binary Tree',
      'Inorder Traversal',
      'Lowest Common Ancestor'
    ],
    visualization: 'Animate node visits and queue updates to see traversal order clearly.',
    checkpoint: 'Can you explain why BFS explores by level while DFS dives deeper first?'
  },
  {
    slug: 'graphs',
    title: 'Graphs and Search',
    category: 'Network Models',
    week: 6,
    difficulty: 'Intermediate',
    duration: '6 lessons',
    summary: 'Understand connectivity, graph traversal, and shortest-path reasoning.',
    objectives: [
      'Model edges and adjacency lists for large sparse graphs.',
      'Use BFS for shortest paths in unweighted graphs.',
      'Apply DFS for connectivity and cycle detection.'
    ],
    concepts: [
      'Adjacency lists',
      'Visited tracking',
      'Topological ordering',
      'Shortest paths'
    ],
    practice: [
      'Number of Islands',
      'Course Schedule',
      'Shortest Path in a Maze'
    ],
    visualization: 'Follow frontier expansion and visited state changes across each graph step.',
    checkpoint: 'Can you tell when BFS is the correct choice versus a priority-based search?'
  },
  {
    slug: 'dynamic-programming',
    title: 'Dynamic Programming',
    category: 'Optimization',
    week: 7,
    difficulty: 'Advanced',
    duration: '5 lessons',
    summary: 'Turn exponential recurse-and-branch patterns into polynomial-time optimization.',
    objectives: [
      'Recognize overlapping subproblems and optimal substructure.',
      'Choose between top-down memoization and bottom-up DP.',
      'State the necessary recurrence for standard DP patterns.'
    ],
    concepts: [
      'Memoization',
      'State design',
      'Knapsack patterns',
      'Rolling arrays'
    ],
    practice: [
      'Climbing Stairs',
      'House Robber',
      'Coin Change'
    ],
    visualization: 'Trace the DP table as decisions accumulate from smaller subproblems to larger states.',
    checkpoint: 'Can you define the state and transition for a DP solution before writing code?'
  },
  {
    slug: 'greedy-and-heap',
    title: 'Greedy and Heaps',
    category: 'Optimization',
    week: 8,
    difficulty: 'Advanced',
    duration: '4 lessons',
    summary: 'Solve locally optimal choices that combine into globally correct results.',
    objectives: [
      'Understand the proof requirements behind greedy choices.',
      'Use heaps for priority-driven scheduling and selection.',
      'Compare greedy logic with dynamic programming tradeoffs.'
    ],
    concepts: [
      'Priority queues',
      'Greedy proof sketches',
      'Min-heap operations',
      'Scheduling patterns'
    ],
    practice: [
      'K Closest Points',
      'Merge K Sorted Lists',
      'Task Scheduler'
    ],
    visualization: 'Watch heap insertions and removals preserve ordering while the schedule evolves.',
    checkpoint: 'Can you justify why a greedy strategy is safe for a given constraint set?'
  }
];

export function getCurriculumLessonBySlug(slug) {
  return curriculumLessons.find((lesson) => lesson.slug === slug) ?? null;
}

export function getCurriculumOverview() {
  return curriculumLessons.map(({ slug, title, week, difficulty, category, summary }) => ({
    slug,
    title,
    week,
    difficulty,
    category,
    summary,
  }));
}
