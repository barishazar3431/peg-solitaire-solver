export const DFS = (rootNode) => {
  const frontier = [rootNode];
  const explored = [];
  let finalNode;
  while (true) {
    const exploredNode = frontier.pop();

    if (exploredNode.gameState.isOptimal()) {
      finalNode = exploredNode;
      break;
    }

    const exploredChildren = exploredNode.gameState.getPossibleChildren();
    exploredChildren.forEach((child) => (child.parent = exploredNode));
    exploredNode.children = exploredChildren;

    explored.push(exploredNode);
    frontier.push(...exploredNode.children);
  }
  
  printPath(finalNode);
  console.log('Total explored nodes:', explored.length, 'Total in frontier: ', frontier.length);
};

const printPath = (finalNode) => {
  let iter = finalNode;
  const nodes = [];
  while (iter !== null) {
    nodes.push(iter);
    // console.log(iter.gameState.toString(), iter.move);
    iter = iter.parent;
  }

  nodes.reverse().forEach((node) => {
    console.log(node.move);
    console.log(node.gameState.toString(), '\n\n');
  });
};
