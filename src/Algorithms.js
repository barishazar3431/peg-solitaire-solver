import { PriorityQueue } from '@datastructures-js/priority-queue';
import { GameNode } from './GameState.js';

export const DFS = (rootNode) => {
  const frontier = new PriorityQueue((a, b) => {
    if (a.depth < b.depth) {
      return 1;
    }
    if (a.depth > b.depth) {
      return -1;
    }

    return a.removedPeg - b.removedPeg;
  });
  frontier.enqueue(rootNode);

  const finalNode = traverseTree(frontier);
  printPath(finalNode);
};

export const BFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.shift;

  const finalNode = traverseTree(frontier);
  printPath(finalNode);
};

export const randomDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const finalNode = traverseTree(frontier);
  printPath(finalNode);
};

const printPath = (finalNode) => {
  let iter = finalNode;
  const nodes = [];
  while (iter !== null) {
    nodes.push(iter);
    iter = iter.parent;
  }

  nodes.reverse().forEach((node) => {
    console.log(node.gameState.move);
    console.log('Removed:', node.gameState.removedPeg);
    console.log('Depth: ', node.depth);
    console.log(node.gameState.toString(), '\n\n');
  });
};

const traverseTree = (frontier) => {
  const explored = new Set();
  let finalNode;

  while (true) {
    const exploredNode = frontier.dequeue();
    if (exploredNode.gameState.isGameOver()) {
      finalNode = exploredNode;
    }

    if (exploredNode.gameState.isOptimal()) {
      finalNode = exploredNode;
      break;
    }

    const childrenStates = exploredNode.gameState.getPossibleChildren();
    const childrenNodes = childrenStates.map((child) => {
      return new GameNode(child, exploredNode.depth + 1, exploredNode);
    });
    exploredNode.children = childrenNodes;

    explored.add(exploredNode);
    exploredNode.children.forEach((child) => {
      if (!explored.has(child)) {
        frontier.enqueue(child);
      }
    });
  }

  return finalNode;
};
