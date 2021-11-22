const {BFS} = require('./bfs-search');
const {RBFSEntry} = require('./rbfs-search');
const Puzzle8 = require('./puzzle-8');

const NUMBER_OF_TEST_CASES = 20;
const SHUFFLE_MOVES = 7;   

let testCases = [];

for(let i = 0; i < NUMBER_OF_TEST_CASES; i++) {
  testCases.push(Puzzle8.generateTestCase(SHUFFLE_MOVES));
}

let results = [];

for(const state of testCases) {
  Puzzle8.numberOfInstances = 0;
  let tBFS = process.hrtime();
  const {solution: bfsSolution, startHeuristic: bfsStartH} = BFS(state);
  tBFS = process.hrtime(tBFS);
  results.push({'Algorithm': 'BFS', 'Start state': state.toString(), 'Tiles to change': bfsStartH, 'Time (ns)': tBFS[1], 'Space': Puzzle8.numberOfInstances, 'Solution': bfsSolution.toString()});

  Puzzle8.numberOfInstances = 0;
  let tRBFS = process.hrtime();
  const {solution: rbfsSolution, startHeuristic: rbfsStartH} = RBFSEntry(state, 10);
  tRBFS = process.hrtime(tRBFS);
  results.push({'Algorithm': 'RBFS', 'Start state': state.toString(), 'Tiles to change': rbfsStartH, 'Time (ns)': tRBFS[1], 'Space': Puzzle8.numberOfInstances, 'Solution': rbfsSolution.toString()});
}

console.table(results);

// ┌─────────┬───────────┬─────────────────────┬─────────────────┬───────────┬───────┬──────────────┐
// │ (index) │ Algorithm │     Start state     │ Tiles to change │ Time (ns) │ Space │   Solution   │
// ├─────────┼───────────┼─────────────────────┼─────────────────┼───────────┼───────┼──────────────┤
// │    0    │   'BFS'   │ '8,0,3,2,1,4,7,6,5' │        4        │  1047300  │  154  │ ',D,L,U,R,D' │
// │    1    │  'RBFS'   │ '8,0,3,2,1,4,7,6,5' │        4        │  456400   │  43   │ ',D,L,U,R,D' │
// │    2    │   'BFS'   │ '1,3,4,8,2,0,7,6,5' │        4        │  107400   │  18   │   ',U,L,D'   │
// │    3    │  'RBFS'   │ '1,3,4,8,2,0,7,6,5' │        4        │   58100   │   9   │   ',U,L,D'   │
// │    4    │   'BFS'   │ '1,0,2,8,4,3,7,6,5' │        4        │  119000   │  33   │   ',R,D,L'   │
// │    5    │  'RBFS'   │ '1,0,2,8,4,3,7,6,5' │        4        │   62300   │  13   │   ',R,D,L'   │
// │    6    │   'BFS'   │ '1,0,3,8,2,4,7,6,5' │        2        │   13700   │   4   │     ',D'     │
// │    7    │  'RBFS'   │ '1,0,3,8,2,4,7,6,5' │        2        │   16500   │   4   │     ',D'     │
// │    8    │   'BFS'   │ '1,2,3,8,6,0,7,5,4' │        4        │   80000   │  24   │   ',D,L,U'   │
// │    9    │  'RBFS'   │ '1,2,3,8,6,0,7,5,4' │        4        │   46500   │   9   │   ',D,L,U'   │
// │   10    │   'BFS'   │ '8,1,2,0,4,3,7,6,5' │        6        │  970400   │  145  │ ',U,R,R,D,L' │
// │   11    │  'RBFS'   │ '8,1,2,0,4,3,7,6,5' │        6        │   92100   │  18   │ ',U,R,R,D,L' │
// │   12    │   'BFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   15900   │   4   │     ',L'     │
// │   13    │  'RBFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   18500   │   4   │     ',L'     │
// │   14    │   'BFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   12500   │   4   │     ',L'     │
// │   15    │  'RBFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   17400   │   4   │     ',L'     │
// │   16    │   'BFS'   │ '1,3,4,8,2,5,7,0,6' │        6        │  754300   │  250  │ ',R,U,U,L,D' │
// │   17    │  'RBFS'   │ '1,3,4,8,2,5,7,0,6' │        6        │  758200   │  18   │ ',R,U,U,L,D' │
// │   18    │   'BFS'   │ '1,2,3,0,8,4,7,6,5' │        2        │   19500   │   4   │     ',R'     │
// │   19    │  'RBFS'   │ '1,2,3,0,8,4,7,6,5' │        2        │   24800   │   4   │     ',R'     │
// │   20    │   'BFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   13700   │   4   │     ',L'     │
// │   21    │  'RBFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   17700   │   4   │     ',L'     │
// │   22    │   'BFS'   │ '1,2,3,8,6,0,7,5,4' │        4        │   76200   │  24   │   ',D,L,U'   │
// │   23    │  'RBFS'   │ '1,2,3,8,6,0,7,5,4' │        4        │   35700   │   9   │   ',D,L,U'   │
// │   24    │   'BFS'   │ '2,3,4,1,8,0,7,6,5' │        6        │  408500   │  139  │ ',U,L,L,D,R' │
// │   25    │  'RBFS'   │ '2,3,4,1,8,0,7,6,5' │        6        │  223100   │  18   │ ',U,L,L,D,R' │
// │   26    │   'BFS'   │ '1,0,3,7,2,4,6,8,5' │        5        │  948000   │  139  │ ',D,D,L,U,R' │
// │   27    │  'RBFS'   │ '1,0,3,7,2,4,6,8,5' │        5        │   73500   │  20   │ ',D,D,L,U,R' │
// │   28    │   'BFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   12900   │   4   │     ',L'     │
// │   29    │  'RBFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   13500   │   4   │     ',L'     │
// │   30    │   'BFS'   │ '1,0,3,8,2,4,7,6,5' │        2        │   10800   │   4   │     ',D'     │
// │   31    │  'RBFS'   │ '1,0,3,8,2,4,7,6,5' │        2        │   20500   │   4   │     ',D'     │
// │   32    │   'BFS'   │ '1,0,2,8,6,3,7,5,4' │        6        │  650000   │  256  │ ',R,D,D,L,U' │
// │   33    │  'RBFS'   │ '1,0,2,8,6,3,7,5,4' │        6        │   63700   │  18   │ ',R,D,D,L,U' │
// │   34    │   'BFS'   │ '1,2,3,7,8,4,6,0,5' │        4        │   68800   │  27   │   ',L,U,R'   │
// │   35    │  'RBFS'   │ '1,2,3,7,8,4,6,0,5' │        4        │   43200   │  13   │   ',L,U,R'   │
// │   36    │   'BFS'   │ '1,0,3,8,2,4,7,6,5' │        2        │   10700   │   4   │     ',D'     │
// │   37    │  'RBFS'   │ '1,0,3,8,2,4,7,6,5' │        2        │   12200   │   4   │     ',D'     │
// │   38    │   'BFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   10800   │   4   │     ',L'     │
// │   39    │  'RBFS'   │ '1,2,3,8,4,0,7,6,5' │        2        │   12700   │   4   │     ',L'     │
// └─────────┴───────────┴─────────────────────┴─────────────────┴───────────┴───────┴──────────────┘