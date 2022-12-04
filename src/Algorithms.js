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

    return a.gameState.removedPeg - b.gameState.removedPeg;
  });
  frontier.enqueue(rootNode);

  const [finalNode, explored] = traverseTree(frontier);
  printPath(finalNode, explored);
};

export const BFS = (rootNode) => {
  const frontier = new PriorityQueue((a, b) => {
    if (a.depth > b.depth) {
      return 1;
    }
    if (a.depth < b.depth) {
      return -1;
    }

    return a.gameState.removedPeg - b.gameState.removedPeg;
  });
  frontier.enqueue(rootNode);

  const [finalNode, explored] = traverseTree(frontier);
  printPath(finalNode, explored);
};

export const randomDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const [finalNode, explored] = traverseTree(frontier, { randomize: true });
  printPath(finalNode, explored);
};

const traverseTree = (frontier,  { randomize = false } = {}) => {
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

    randomize && shuffleArray(childrenNodes);
    childrenNodes.forEach((child) => {
      if (!explored.has(child)) {
        frontier.enqueue(child);
      }
    });
  }

  return [finalNode, explored];
};

function printPath(finalNode, explored) {
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

  console.log('Explored Nodes: ', explored.size);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
