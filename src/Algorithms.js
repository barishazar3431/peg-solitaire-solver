import { timeLimitMinutes } from './index.js';
import { traverseTree, printPath } from './util.js';

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
    if (b.getChildrenCount() < a.getChildrenCount()) {
      return 1;
    }
    if (b.getChildrenCount() > a.getChildrenCount()) {
      return -1;
    }

    if (b.getWeightedScore() > a.getWeightedScore()) {
      return 1;
    }
    if (b.getWeightedScore() < a.getWeightedScore()) {
      return -1;
    }

    return 0;
  };
  traverseTree(frontier, sortFunction);
};

export const IDS = (rootNode) => {
  let frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;
  let finalNode = null,
    numOfExpandedNodes = 0,
    maxNodesInFrontier = 0,
    depthLimit = 0;
  const sortFunction = (a, b) => b.getRemovedPeg() - a.getRemovedPeg();
  const startingTime = Date.now();

  console.time('Time Spent');
  while (true) {
    [finalNode, numOfExpandedNodes, maxNodesInFrontier] = traverseTree(
      frontier,
      sortFunction,
      true,
      startingTime,
      depthLimit
    );
    frontier = [rootNode];
    frontier.enqueue = frontier.push;
    frontier.dequeue = frontier.pop;
    depthLimit++;
    if (
      Date.now() - startingTime >= timeLimitMinutes * 60 * 1000 ||
      finalNode.isOptimal()
    )
      break;
  }
  console.timeEnd('Time Spent');
  printPath(finalNode, numOfExpandedNodes, maxNodesInFrontier);
};
