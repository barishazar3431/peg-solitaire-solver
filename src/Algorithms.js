import { GameNode } from './GameState.js';
import { timeLimitMinutes } from './index.js';

export const DFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const { bestSolutionSoFar, explored } = traverseTree(frontier, { dfs: true });
  printPath(bestSolutionSoFar, explored);
};

export const BFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.shift;

  frontier.enqueue(rootNode);

  const { bestSolutionSoFar, explored } = traverseTree(frontier, { bfs: true });
  printPath(bestSolutionSoFar, explored);
};

export const randomDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const { bestSolutionSoFar, explored } = traverseTree(frontier, {
    randomize: true,
  });
  printPath(bestSolutionSoFar, explored);
};

export const heuristicDFS = (rootNode) => {
  const frontier = [rootNode];
  frontier.enqueue = frontier.push;
  frontier.dequeue = frontier.pop;

  const { bestSolutionSoFar, explored } = traverseTree(frontier, {
    heuristicDFS: true,
  });
  printPath(bestSolutionSoFar, explored);
};

const traverseTree = (frontier, options = {}) => {
  let explored = 0;
  let bestSolutionSoFar = frontier[0];

  const prevTime = Date.now();
  while (true) {
    const exploredNode = frontier.dequeue();
    explored++;

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

    childrenNodes.sort((a, b) => {
      if (options.bfs) {
        return a.gameState.removedPeg - b.gameState.removedPeg;
      }

      if (options.dfs) {
        return b.gameState.removedPeg - a.gameState.removedPeg;
      }

      if (options.heuristicDFS) {
        return b.gameState.getLonelyPegs() - a.gameState.getLonelyPegs();
      }

      if (options.randomize) {
        return 0.5 - Math.random();
      }
    });

    childrenNodes.forEach((child) => {
      frontier.enqueue(child);
    });
  }
  return { bestSolutionSoFar, explored };
};

function printPath(finalNode, explored) {
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
    const remainingPegs = finalNode.gameState.getRemainingPegs();
    console.log(
      `\n\nSub-optimum Solution Found With ${remainingPegs} Remaining Pegs`
    );
  }

  console.timeEnd('Time Spent: ');
  console.log('Expanded Nodes: ', explored);
  console.log('\n=== Board States Until the Solution. ===');

  nodes.reverse().forEach((node, i) => {
    const lastMove = nodes[i + 1]?.gameState.move || [];
    const lastRemoved = nodes[i + 1]?.gameState.removedPeg || [];
    console.log(node.gameState.toString(lastMove, lastRemoved), '\n');
  });
}
