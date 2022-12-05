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

  // initialState: [  //FirePlace Arrangement
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [0, 0, 1, 1, 1, 0, 0],
  //   [0, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [-1, -1, 0, 0, 0, -1, -1],
  //   [-1, -1, 0, 0, 0, -1, -1],
  // ],

  // initialState: [ //Diamond Arrangement
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

  // initialState: [ //European Arrangement
  //   [-1, -1, 1, 1, 1, -1, -1],
  //   [-1, 1, 1, 1, 1, 1, -1],
  //   [1, 1, 1, 0, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1, 1],
  //   [-1, 1, 1, 1, 1, 1, -1],
  //   [-1, -1, 1, 1, 1, -1, -1],
  // ],
};

export default config;
