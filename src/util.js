import { timeLimitMinutes } from './index.js';

export const traverseTree = (
  frontier,
  sortFunction = () => 0,
  iterativeDfs = false,
  startingTime,
  depthLimit
) => {
  let numOfExpandedNodes = 0;
  let bestSolutionSoFar = frontier[0];
  let prevTime = Date.now();

  if (iterativeDfs) prevTime = startingTime;

  while (true) {
    const exploredNode = frontier.dequeue();
    numOfExpandedNodes++;
    let childrenStates = [];

    if (iterativeDfs && exploredNode == undefined) break;

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

    if (!iterativeDfs || exploredNode.depth < depthLimit)
      childrenStates = exploredNode.getChildrenStates();

    childrenStates.sort(sortFunction); //Sort the children nodes according to given sort function
    childrenStates.forEach((child) => {
      frontier.enqueue(child);
    });
  }
  if (!iterativeDfs) printPath(bestSolutionSoFar, numOfExpandedNodes);
  else return [bestSolutionSoFar, numOfExpandedNodes];
};

export const printPath = (finalNode, numOfExpandedNodes) => {
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
};

export const euclideanDistance = (x1, y1, x2, y2) => {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt(a * a + b * b);
};
