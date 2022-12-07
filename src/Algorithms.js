import { timeLimitMinutes } from './index.js';

export const DFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const sortFunction = (a, b) => b.getRemovedPeg() - a.getRemovedPeg();
  traverseTree(frontier, sortFunction);
};

export const BFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.shift;

  const sortFunction = (a, b) => a.getRemovedPeg() - b.getRemovedPeg();
  traverseTree(frontier, sortFunction);
};

export const randomDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const sortFunction = (a, b) => Math.random() - 0.5; //It sorts randomly (shuffles)
  traverseTree(frontier, sortFunction);
};

export const heuristicDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const sortFunction = (a, b) => {
    if (b.getPegScore() > a.getPegScore()) {
      return 1;
    }
    if (b.getPegScore() < a.getPegScore()) {
      return -1;
    }

    if (b.getWeightedScore() > a.getWeightedScore()) {
      return 1;
    }
    if (b.getWeightedScore() < a.getWeightedScore()) {
      return -1;
    }

    if (b.getNumOfRemainingPegs() < a.getNumOfRemainingPegs()) {
      return 1;
    }
    if (b.getNumOfRemainingPegs() > a.getNumOfRemainingPegs()) {
      return -1;
    }

    return 0;
  };
  traverseTree(frontier, sortFunction);
};

// export const IDS(rootNode) {

// }

const traverseTree = (frontier, sortFunction = () => 0) => {
  let numOfExpandedNodes = 0;
  let bestSolutionSoFar = frontier[0];

  const prevTime = Date.now();
  while (true) {
    const exploredNode = frontier.dequeue();
    numOfExpandedNodes++;

    if (
      exploredNode.isGameOver() &&
      exploredNode.depth >= bestSolutionSoFar.depth
    ) {
      bestSolutionSoFar = exploredNode;
      // break;
    }

    if (
      exploredNode.isOptimal() ||
      Date.now() - prevTime >= timeLimitMinutes * 60 * 1000
    ) {
      break;
    }

    const childrenStates = exploredNode.getChildrenStates();

    childrenStates.sort(sortFunction); //Sort the children nodes according to given sort function
    childrenStates.forEach((child) => {
      frontier.enqueue(child);
    });
  }

  printPath(bestSolutionSoFar, numOfExpandedNodes);
};

function printPath(finalNode, numOfExpandedNodes) {
  let iter = finalNode;
  const nodes = [];
  while (iter !== null) {
    nodes.push(iter);
    iter = iter.parent;
  }

  console.log('\n\n\n================================================\n');
  if (finalNode.depth === 0) {
    console.log('\n\nNo Solutions Found! (Time Limit Reached)');
    return;
  }

  if (finalNode.isOptimal()) {
    console.log('\n\nOptimum Solution Found!!');
  } else {
    const remainingPegs = finalNode.getNumOfRemainingPegs();
    console.log(
      `\n\nSub-optimum Solution Found With ${remainingPegs} Remaining Pegs`
    );
  }

  console.timeEnd('Time Spent: ');
  console.log('Expanded Nodes: ', numOfExpandedNodes);
  console.log('\n=== Board States Until the Solution. ===');

  nodes.reverse().forEach((node, i) => {
    const lastMove = nodes[i + 1]?.move || [];
    const lastRemoved = nodes[i + 1]?.removedPeg || [];
    console.log(node.toString(lastMove, lastRemoved), '\n');
  });
}

export function euclideanDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt(a * a + b * b);
}

export function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
