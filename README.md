# AlgoViz Pro

AlgoViz Pro is an interactive DSA learning platform that combines sorting visualizations, coding practice, curriculum modules, and a dataset-driven algorithm lab.

## Real-World Kaggle Datasets

AlgoViz Pro includes a Dataset Lab that helps students connect Data Structures and Algorithms to realistic tabular and graph-based data sources. The bundled dataset metadata is structured for local demo work and acquisition review.

> Important: before redistribution, review the original Kaggle license and dataset terms for each source. The project does not assume every Kaggle dataset may be bundled or re-shared without permission.

| Dataset | Source | Type | Algorithms |
| --- | --- | --- | --- |
| Student Performance | Kaggle-ready education dataset | Education | Linear Search, Binary Search, Merge Sort, Quick Sort, Hash Search |
| Supermarket Sales | Kaggle-ready retail dataset | Sales | Linear Search, Quick Sort, Hash Search, Merge Sort |
| Movie Ratings | Kaggle-ready movie dataset | Movies | Linear Search, Binary Search, Merge Sort, Hash Search |
| Customer Data | Kaggle-ready e-commerce dataset | Customer | Hash Search, Linear Search, Quick Sort, Binary Search |
| Weather | Kaggle-ready environmental dataset | Weather | Linear Search, Binary Search, Quick Sort, Range Search |
| Road Network | Kaggle-ready transportation data | Graph | BFS, DFS, Dijkstra, Prim, Kruskal |

## Getting Started

```bash
npm install
node .\node_modules\next\dist\bin\next dev
```

Then open http://localhost:3000.

## Dataset Lab

The Dataset Lab is available at /dataset-lab and is integrated into the dashboard and landing page. It includes:

- dataset library cards
- metadata panels
- column selection
- preview tables
- search and sort examples
- algorithm pipeline demonstrations
- attribution and licensing guidance

## Datasets directory

The workspace includes dataset folders under the datasets/ tree with metadata and README notes so the library is easy to extend with real Kaggle acquisitions.
