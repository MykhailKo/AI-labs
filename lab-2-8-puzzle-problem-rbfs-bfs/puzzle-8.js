Array.prototype.swap = function (a,b) {
  let arr = [...this];
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  return arr;
};

class Puzzle8 {
  static goalState = [1,2,3,8,0,4,7,6,5];
  static moves = {up: 'U', down: 'D', left: 'L', right: 'R'};
  static numberOfInstances = 0;

  state = [];
  parent = undefined;
  currentMove = '';
  usesHeuristic = false;
  heuristicValue = 0;
  pathCost = 0;
  eval = 0;

  constructor({state, parent, usesHeuristic = false, currentMove = '', pathCost = 0}) {
    this.state = state;
    this.parent = parent;    
    this.currentMove = currentMove;
    this.usesHeuristic = usesHeuristic;
    if(parent) {
      this.pathCost = parent.pathCost + pathCost;
    }
    if(usesHeuristic) {
      this.calcHeuristicValue();
      this.eval = this.pathCost + this.heuristicValue;
    }
    Puzzle8.numberOfInstances += 1;
  }

  calcHeuristicValue () {
    this.heuristicValue = this.state.filter((tile, index) => tile != Puzzle8.goalState[index]).length;
  }    
  
  static getAvailableMoves(x, y) {
    let availableMoves = {...Puzzle8.moves};
    if(x == 0) delete availableMoves.left;
    if(x == 2) delete availableMoves.right;
    if(y == 0) delete availableMoves.up;
    if(y == 2) delete availableMoves.down;
    return availableMoves;
  }

  generateChildren() {
    const emptyI = this.state.indexOf(0);
    const x = parseInt(emptyI % 3);
    const y = parseInt(emptyI / 3);
    const availableMoves = Puzzle8.getAvailableMoves(x, y);
    let children = [];
    for(const move of Object.values(availableMoves)) {
      let newState;
      if(move == Puzzle8.moves.up) newState = this.state.swap(emptyI, emptyI-3);
      if(move == Puzzle8.moves.down) newState = this.state.swap(emptyI, emptyI+3);
      if(move == Puzzle8.moves.left) newState = this.state.swap(emptyI, emptyI-1);
      if(move == Puzzle8.moves.right) newState = this.state.swap(emptyI, emptyI+1);
      children.push(new Puzzle8({state: newState, parent: this, usesHeuristic: this.usesHeuristic, currentMove: move, pathCost: 1}));
    }
    return children; 
  }

  isGoalState() {
    return Puzzle8.goalState.every((tile, index) => tile == this.state[index]);
  }

  findSolution () {
    const solution = [this.currentMove];
    let solutionPath = this;
    while(solutionPath.parent) {
      solutionPath = solutionPath.parent;
      solution.push(solutionPath.currentMove); 
    }
    return solution.reverse();
  }

  static generateTestCase(movesCount = 2) {
    let state = Puzzle8.goalState;
    for (let i = 0; i < movesCount; i++) {
      const emptyI = state.indexOf(0);
      const x = parseInt(emptyI % 3);
      const y = parseInt(emptyI / 3);
      const availableMoves = Object.values(Puzzle8.getAvailableMoves(x, y));
      const move = availableMoves[Math.floor(Math.random() * (availableMoves.length))];
      if(move == Puzzle8.moves.up) state = state.swap(emptyI, emptyI-3);
      if(move == Puzzle8.moves.down) state = state.swap(emptyI, emptyI+3);
      if(move == Puzzle8.moves.left) state = state.swap(emptyI, emptyI-1);
      if(move == Puzzle8.moves.right) state = state.swap(emptyI, emptyI+1);
    }
    return state;
  }
}

module.exports = Puzzle8;