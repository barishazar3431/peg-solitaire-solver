import {
  MinPriorityQueue,
  PriorityQueue,
} from '@datastructures-js/priority-queue';
import { GameNode } from './GameState.js';

export const DFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const [finalNode, explored] = traverseTree(frontier, { dfs: true });
  printPath(finalNode, explored);
};

export const BFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.shift;

  frontier.enqueue(rootNode);

  const [finalNode, explored] = traverseTree(frontier, { bfs: true });
  printPath(finalNode, explored);
};


export const randomDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const [finalNode, explored] = traverseTree(frontier, { randomize: true });
  printPath(finalNode, explored);
};

export const heuristicDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const [finalNode, explored] = traverseTree(frontier, { heuristicDFS: true });
  printPath(finalNode, explored);
};

const traverseTree = (
  frontier,
  { randomize = false, dfs = false, bfs = false, heuristicDFS = false } = {}
) => {
  let finalNode;
  let explored = 0;

  while (true) {
    const exploredNode = frontier.dequeue();
    console.log(frontier.length);
    explored++;
    if (exploredNode.gameState.isGameOver()) {
      finalNode = exploredNode;
    }

    if (exploredNode.gameState.isOptimal()) {
      finalNode = exploredNode;
      break;
    }

    const childrenStates = exploredNode.gameState.getChildrenStates();
    const childrenNodes = childrenStates.map((childState) => {
      return new GameNode(childState, exploredNode, exploredNode.depth + 1);
    });
    exploredNode.children = childrenNodes;

    !randomize &&
      childrenNodes.sort((a, b) => {
        if (bfs) {
          return a.gameState.removedPeg - b.gameState.removedPeg;
        }

        if (dfs) {
          return b.gameState.removedPeg - a.gameState.removedPeg;
        }

        if (heuristicDFS) {
          return b.gameState.getLonelyPegs() - a.gameState.getLonelyPegs();
        }
      });

    randomize && shuffleArray(childrenNodes);
    childrenNodes.forEach((child) => {
      frontier.enqueue(child);
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

  console.log('Explored Nodes: ', explored);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
