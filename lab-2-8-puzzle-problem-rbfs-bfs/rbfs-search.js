const Puzzle8 = require('./puzzle-8');

const MAX_F_LIMIT = Number.MAX_SAFE_INTEGER;

function RBFSEntry(initState, fLimit = MAX_F_LIMIT) {
  const initNode = new Puzzle8({state: initState, usesHeuristic: true});
  const lastNode = RBFS(initNode, fLimit);
  return {solution: lastNode.node.findSolution(), startHeuristic: initNode.heuristicValue};
}

function RBFS(node, fLimit) {
  if(node.isGoalState()) return {node, eval: 0};
  const children = node.generateChildren();
  if(children.length == 0) return {node: null, eval: MAX_F_LIMIT};
  let successors = children.map((child, index) => [child.eval, index, child]);
  let result;
  while(successors.length) {
    successors.sort();
    let bestNode = successors[0][2];
    if(bestNode.eval > fLimit) return {node: null, eval: bestNode.eval};
    const alternativeEvalValue = successors.length > 1 ? successors[1][0] : Infinity;
    const {node, eval} = RBFS(bestNode, Math.min(fLimit, alternativeEvalValue));
    result = node;
    bestNode.eval = eval; 
    successors[0] = [bestNode.eval, successors[0][1], bestNode];
    if(result != null) {
      return {node: result, eval: 0};
    }
  }
}
module.exports = {RBFSEntry};