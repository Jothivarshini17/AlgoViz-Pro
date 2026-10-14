export type DatasetType = "Education" | "Sales" | "Movies" | "Customer" | "Weather" | "Transportation" | "Graph";

export type DatasetRecord = Record<string, string | number>;

export type DatasetColumnDefinition = {
  name: string;
  type: "numeric" | "text" | "date" | "category";
};

export type DatasetDefinition = {
  id: string;
  slug: string;
  name: string;
  category: DatasetType;
  rows: number;
  columns: number;
  columnDefinitions: DatasetColumnDefinition[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  source: string;
  sourceUrl: string;
  author: string;
  license: string;
  fileFormat: string;
  supportedAlgorithms: string[];
  previewData: DatasetRecord[];
};

export const datasetCatalog: DatasetDefinition[] = [
  {
    id: "student-performance",
    slug: "student-performance",
    name: "Student Performance Dataset",
    category: "Education",
    rows: 1000,
    columns: 10,
    columnDefinitions: [
      { name: "Student_ID", type: "numeric" },
      { name: "Age", type: "numeric" },
      { name: "Study_Hours", type: "numeric" },
      { name: "Math_Score", type: "numeric" },
      { name: "Science_Score", type: "numeric" },
      { name: "Grade", type: "category" },
      { name: "Gender", type: "category" },
    ],
    difficulty: "Beginner",
    description: "Academic outcomes and study patterns for sorting, search, and statistical analysis exercises.",
    source: "Kaggle-ready educational dataset",
    sourceUrl: "https://www.kaggle.com/search?q=student+performance+dataset",
    author: "To be confirmed by dataset acquisition workflow",
    license: "Review the Kaggle license before redistribution; do not repackage without rights.",
    fileFormat: "CSV",
    supportedAlgorithms: ["Linear Search", "Binary Search", "Merge Sort", "Quick Sort", "Hash Search"],
    previewData: [
      { Student_ID: 101, Age: 18, Study_Hours: 4, Math_Score: 78, Science_Score: 82, Grade: "A", Gender: "Female" },
      { Student_ID: 102, Age: 19, Study_Hours: 6, Math_Score: 91, Science_Score: 88, Grade: "A+", Gender: "Male" },
      { Student_ID: 103, Age: 18, Study_Hours: 3, Math_Score: 65, Science_Score: 71, Grade: "B", Gender: "Female" },
      { Student_ID: 104, Age: 20, Study_Hours: 5, Math_Score: 88, Science_Score: 90, Grade: "A", Gender: "Male" },
      { Student_ID: 105, Age: 21, Study_Hours: 7, Math_Score: 95, Science_Score: 93, Grade: "A+", Gender: "Female" },
      { Student_ID: 106, Age: 19, Study_Hours: 4, Math_Score: 72, Science_Score: 76, Grade: "B+", Gender: "Male" },
    ],
  },
  {
    id: "supermarket-sales",
    slug: "supermarket-sales",
    name: "Supermarket Sales Dataset",
    category: "Sales",
    rows: 5000,
    columns: 13,
    columnDefinitions: [
      { name: "Invoice_ID", type: "text" },
      { name: "Branch", type: "category" },
      { name: "City", type: "category" },
      { name: "Revenue", type: "numeric" },
      { name: "Quantity", type: "numeric" },
      { name: "Customer_Type", type: "category" },
    ],
    difficulty: "Intermediate",
    description: "Retail transaction data for filtering, sorting, and aggregation with DSA-friendly workloads.",
    source: "Kaggle-ready retail dataset",
    sourceUrl: "https://www.kaggle.com/search?q=supermarket+sales+dataset",
    author: "To be confirmed by dataset acquisition workflow",
    license: "Review the Kaggle license before redistribution; do not repackage without rights.",
    fileFormat: "CSV",
    supportedAlgorithms: ["Linear Search", "Quick Sort", "Hash Search", "Merge Sort", "Filtering"],
    previewData: [
      { Invoice_ID: "INV-1001", Branch: "A", City: "Yangon", Revenue: 1200, Quantity: 8, Customer_Type: "Member" },
      { Invoice_ID: "INV-1002", Branch: "B", City: "Mandalay", Revenue: 980, Quantity: 6, Customer_Type: "Normal" },
      { Invoice_ID: "INV-1003", Branch: "C", City: "Naypyitaw", Revenue: 1881, Quantity: 12, Customer_Type: "Member" },
      { Invoice_ID: "INV-1004", Branch: "A", City: "Yangon", Revenue: 750, Quantity: 5, Customer_Type: "Normal" },
      { Invoice_ID: "INV-1005", Branch: "B", City: "Mandalay", Revenue: 2140, Quantity: 15, Customer_Type: "Member" },
    ],
  },
  {
    id: "movies",
    slug: "movies",
    name: "Movie Ratings Dataset",
    category: "Movies",
    rows: 2800,
    columns: 11,
    columnDefinitions: [
      { name: "Movie_ID", type: "numeric" },
      { name: "Title", type: "text" },
      { name: "Genre", type: "category" },
      { name: "Release_Year", type: "numeric" },
      { name: "Rating", type: "numeric" },
      { name: "Votes", type: "numeric" },
    ],
    difficulty: "Intermediate",
    description: "Movie metadata and user ratings for ranking, sorting, and filtering workloads.",
    source: "Kaggle-ready movie dataset",
    sourceUrl: "https://www.kaggle.com/search?q=movie+ratings+dataset",
    author: "To be confirmed by dataset acquisition workflow",
    license: "Review the Kaggle license before redistribution; do not repackage without rights.",
    fileFormat: "CSV",
    supportedAlgorithms: ["Linear Search", "Binary Search", "Merge Sort", "Hash Search", "Ranking"],
    previewData: [
      { Movie_ID: 1, Title: "The Algorithm", Genre: "Drama", Release_Year: 2023, Rating: 8.7, Votes: 24000 },
      { Movie_ID: 2, Title: "Data Flow", Genre: "Sci-Fi", Release_Year: 2021, Rating: 8.1, Votes: 16400 },
      { Movie_ID: 3, Title: "Graph of Hope", Genre: "Action", Release_Year: 2020, Rating: 7.8, Votes: 13210 },
      { Movie_ID: 4, Title: "Stack and Stone", Genre: "Drama", Release_Year: 2022, Rating: 8.9, Votes: 28500 },
      { Movie_ID: 5, Title: "Queue of Dreams", Genre: "Adventure", Release_Year: 2019, Rating: 7.5, Votes: 9800 },
    ],
  },
  {
    id: "customer-data",
    slug: "customer-data",
    name: "Customer Data Dataset",
    category: "Customer",
    rows: 3000,
    columns: 9,
    columnDefinitions: [
      { name: "Customer_ID", type: "numeric" },
      { name: "Region", type: "category" },
      { name: "Age", type: "numeric" },
      { name: "Loyalty_Score", type: "numeric" },
      { name: "Login_Frequency", type: "numeric" },
    ],
    difficulty: "Beginner",
    description: "Customer records for segmentation, searching, and hash-based lookups used in DSA practice.",
    source: "Kaggle-ready CRM dataset",
    sourceUrl: "https://www.kaggle.com/search?q=ecommerce+customer+dataset",
    author: "To be confirmed by dataset acquisition workflow",
    license: "Review the Kaggle license before redistribution; do not repackage without rights.",
    fileFormat: "CSV",
    supportedAlgorithms: ["Hash Search", "Linear Search", "Quick Sort", "Binary Search"],
    previewData: [
      { Customer_ID: 120, Region: "North", Age: 29, Loyalty_Score: 81, Login_Frequency: 5 },
      { Customer_ID: 341, Region: "South", Age: 34, Loyalty_Score: 74, Login_Frequency: 4 },
      { Customer_ID: 102, Region: "East", Age: 28, Loyalty_Score: 91, Login_Frequency: 7 },
      { Customer_ID: 589, Region: "West", Age: 41, Loyalty_Score: 66, Login_Frequency: 3 },
      { Customer_ID: 765, Region: "North", Age: 36, Loyalty_Score: 88, Login_Frequency: 6 },
    ],
  },
  {
    id: "weather",
    slug: "weather",
    name: "Weather Dataset",
    category: "Weather",
    rows: 4500,
    columns: 12,
    columnDefinitions: [
      { name: "Date", type: "date" },
      { name: "Temperature", type: "numeric" },
      { name: "Humidity", type: "numeric" },
      { name: "Wind_Speed", type: "numeric" },
      { name: "Condition", type: "category" },
    ],
    difficulty: "Intermediate",
    description: "Daily weather observations for range queries, sorting, and statistics-based DSA demos.",
    source: "Kaggle-ready weather dataset",
    sourceUrl: "https://www.kaggle.com/search?q=weather+dataset",
    author: "To be confirmed by dataset acquisition workflow",
    license: "Review the Kaggle license before redistribution; do not repackage without rights.",
    fileFormat: "CSV",
    supportedAlgorithms: ["Linear Search", "Binary Search", "Quick Sort", "Range Search"],
    previewData: [
      { Date: "2024-01-04", Temperature: 18, Humidity: 64, Wind_Speed: 11, Condition: "Cloudy" },
      { Date: "2024-01-05", Temperature: 21, Humidity: 70, Wind_Speed: 16, Condition: "Rain" },
      { Date: "2024-01-06", Temperature: 24, Humidity: 59, Wind_Speed: 9, Condition: "Sunny" },
      { Date: "2024-01-07", Temperature: 17, Humidity: 68, Wind_Speed: 13, Condition: "Rain" },
      { Date: "2024-01-08", Temperature: 22, Humidity: 57, Wind_Speed: 10, Condition: "Sunny" },
    ],
  },
  {
    id: "road-network",
    slug: "road-network",
    name: "Road Network Dataset",
    category: "Transportation",
    rows: 1800,
    columns: 6,
    columnDefinitions: [
      { name: "Source", type: "text" },
      { name: "Destination", type: "text" },
      { name: "Weight", type: "numeric" },
      { name: "Road_Type", type: "category" },
    ],
    difficulty: "Advanced",
    description: "Road connectivity data for BFS, DFS, Dijkstra, and graph traversal experiments.",
    source: "Kaggle-ready transportation dataset",
    sourceUrl: "https://www.kaggle.com/search?q=road+network+dataset",
    author: "To be confirmed by dataset acquisition workflow",
    license: "Review the Kaggle license before redistribution; do not repackage without rights.",
    fileFormat: "CSV",
    supportedAlgorithms: ["BFS", "DFS", "Dijkstra", "Prim", "Kruskal"],
    previewData: [
      { Source: "A", Destination: "B", Weight: 5, Road_Type: "Highway" },
      { Source: "A", Destination: "C", Weight: 3, Road_Type: "Local" },
      { Source: "B", Destination: "D", Weight: 7, Road_Type: "Highway" },
      { Source: "C", Destination: "D", Weight: 2, Road_Type: "Local" },
      { Source: "D", Destination: "E", Weight: 4, Road_Type: "Regional" },
    ],
  },
];

export function getDatasetBySlug(slug: string) {
  return datasetCatalog.find((dataset) => dataset.slug === slug) ?? null;
}

export function getDatasetSummary() {
  return datasetCatalog.map(({ id, slug, name, category, rows, columns, difficulty, description, supportedAlgorithms }) => ({
    id,
    slug,
    name,
    category,
    rows,
    columns,
    difficulty,
    description,
    supportedAlgorithms,
  }));
}
