const initialBoardState = [
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1],
];

const getSlotLabel = (x, y) => {
  if (initialBoardState[x][y] === -1) {
    throw new Error('Illegal slot position!!');
  }

  let sum = 0;
  for (let i = 0; i < initialBoardState.length; i++) {
    for (let j = 0; j < initialBoardState[0].length; j++) {
      if (initialBoardState[i][j] !== -1) {
        sum++;
      }
      if (i === x && j === y) {
        return sum;
      }
    }
  }

  return sum;
};

console.log(getSlotLabel(3,3));
