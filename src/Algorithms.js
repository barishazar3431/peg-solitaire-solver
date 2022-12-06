import { GameNode } from './GameState.js';
import { timeLimitMinutes } from './index.js';

export const DFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const sortFunction = (a, b) =>
    b.gameState.getRemovedPeg() - a.gameState.getRemovedPeg();
  traverseTree(frontier, sortFunction);
};

export const BFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.shift;

  const sortFunction = (a, b) =>
    a.gameState.getRemovedPeg() - b.gameState.getRemovedPeg();
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
    return b.gameState.getNumOfLonelyPegs() - a.gameState.getNumOfLonelyPegs();
  };
  traverseTree(frontier, sortFunction);
};

const traverseTree = (frontier, sortFunction = () => 0) => {
  let numOfExpandedNodes = 0;
  let bestSolutionSoFar = frontier[0];

  const prevTime = Date.now();
  while (true) {
    const exploredNode = frontier.dequeue();
    numOfExpandedNodes++;

    if (
      exploredNode.gameState.isGameOver() &&
      exploredNode.depth >= bestSolutionSoFar.depth
    ) {
      bestSolutionSoFar = exploredNode;
    }

    if (
      exploredNode.gameState.isOptimal() ||
      Date.now() - prevTime >= timeLimitMinutes * 60 * 1000
    ) {
      break;
    }

    const childrenStates = exploredNode.gameState.getChildrenStates();
    const childrenNodes = childrenStates.map((childState) => {
      return new GameNode(childState, exploredNode, exploredNode.depth + 1);
    });
    exploredNode.children = childrenNodes;

    childrenNodes.sort(sortFunction); //Sort the children nodes according to given sort function
    childrenNodes.forEach((child) => {
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

  if (finalNode.gameState.isOptimal()) {
    console.log('\n\nOptimum Solution Found!!');
  } else {
    const remainingPegs = finalNode.gameState.getNumOfRemainingPegs();
    console.log(
      `\n\nSub-optimum Solution Found With ${remainingPegs} Remaining Pegs`
    );
  }

  console.timeEnd('Time Spent: ');
  console.log('Expanded Nodes: ', numOfExpandedNodes);
  console.log('\n=== Board States Until the Solution. ===');

  nodes.reverse().forEach((node, i) => {
    const lastMove = nodes[i + 1]?.gameState.move || [];
    const lastRemoved = nodes[i + 1]?.gameState.removedPeg || [];
    console.log(node.gameState.toString(lastMove, lastRemoved), '\n');
  });
}
