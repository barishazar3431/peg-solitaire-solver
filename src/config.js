
const config = {
  initialState: [
    [-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1],
  ],

  goalState: [
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1],
  ],

  // initialState: [
  //   //FirePlace Arrangement
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [0, 0, 1, 1, 1, 0, 0],
  //   [0, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [-1, -1, 0, 0, 0, -1, -1],
  //   [-1, -1, 0, 0, 0, -1, -1],
  // ],

  // initialState: [
  //   //Diamond Arrangement
  //   [-1, -1, 0, 1, 0, -1, -1],
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [0, 1, 1, 1, 1, 1, 0],
  //   [1, 1, 1, 0, 1, 1, 1],
  //   [0, 1, 1, 1, 1, 1, 0],
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [-1, -1, 0, 1, 0, -1, -1],
  // ],

  // initialState: [
  //   //Pyramid Arrangement
  //   [-1, -1, 0, 0, 0, -1, -1],
  //   [-1, -1, 0, 1, 0, -1, -1],
  //   [0, 0, 1, 1, 1, 0, 0],
  //   [0, 1, 1, 1, 1, 1, 0],
  //   [1, 1, 1, 1, 1, 1, 1],
  //   [-1, -1, 0, 0, 0, -1, -1],
  //   [-1, -1, 0, 0, 0, -1, -1],
  // ],

  // initialState: [
  //   //European Arrangement
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [-1, 1, 1, 1, 1, 1, -1],
  //   [1, 1, 1, 0, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1, 1],
  //   [-1, 1, 1, 1, 1, 1, -1],
  //   [-1, -1, 1, 1, 1, -1, -1],
  // ],
};

// const board = [
//   [-1, -1, 1, 1, 1, -1, -1],
//   [-1, -1, 1, 1, 1, -1, -1],
//   [1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 0, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1],
//   [-1, -1, 1, 1, 1, -1, -1],
//   [-1, -1, 1, 1, 1, -1, -1],
// ];

// export function euclideanDistance(x1, y1, x2, y2) {
//   const a = x1 - x2;
//   const b = y1 - y2;

//   return Math.sqrt(a * a + b * b);
// }

// function getWeightedScore() {
//   let score = 0;
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (board[i][j] === 1) {
//         score += euclideanDistance(i, j, 3, 3);
//       }
//     }
//   }
//    console.log(score);
// }


// getWeightedScore();

export default config;
