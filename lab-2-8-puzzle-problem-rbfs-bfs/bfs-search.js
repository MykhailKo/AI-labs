const Puzzle8 = require('./puzzle-8');

function BFS(initState) {
  const startNode = new Puzzle8({state: initState, usesHeuristic: true});
  if(startNode.isGoalState()) return {solution: startNode.findSolution(), startHeuristic: startNode.heuristicValue};
  let queue = [];
  queue.push(startNode);
  while(queue.length != 0) {
    const node = queue.shift();
    const children = node.generateChildren();
    for(const child of children) {
      if(child.isGoalState()) return {solution: child.findSolution(), startHeuristic: startNode.heuristicValue};
      queue.push(child);
    }
  }
}

module.exports = {BFS}; 