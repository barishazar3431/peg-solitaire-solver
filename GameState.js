import config from './config.js';

export class GameState {
  constructor(board) {
    this.board = board;
  }

  getSlotLabel(x, y) {
    if (this.board[x][y] === -1) {
      throw new Error('Illegal slot position!!');
    }

    let sum = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] !== -1) {
          sum++;
        }
        if (i === x && j === y) {
          return sum;
        }
      }
    }

    return sum;
  }

  isGameOver() {
    return this.getPossibleChildren().length === 0;
  }

  isOptimal() {
    return JSON.stringify(this.board) === JSON.stringify(config.goalState);
  }

  getPossibleChildren() {
    const children = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const value = this.board[i][j];
        if (value === 1) {
          if (
            i < 5 &&
            this.board[i + 2][j] === 0 &&
            this.board[i + 1][j] === 1
          ) {
            const newState = this.board.map((row) => row.slice());
            newState[i][j] = 0;
            newState[i + 1][j] = 0;
            newState[i + 2][j] = 1;

            const move = `${this.getSlotLabel(i, j)} => ${this.getSlotLabel(
              i + 2,
              j
            )}`;
            children.push(new Node(new GameState(newState), move));
          }

          if (
            i > 1 &&
            this.board[i - 2][j] === 0 &&
            this.board[i - 1][j] === 1
          ) {
            const newState = this.board.map((row) => row.slice());
            newState[i][j] = 0;
            newState[i - 1][j] = 0;
            newState[i - 2][j] = 1;

            const move = `${this.getSlotLabel(i, j)} => ${this.getSlotLabel(
              i - 2,
              j
            )}`;
            children.push(new Node(new GameState(newState), move));
          }

          if (
            j < 5 &&
            this.board[i][j + 2] === 0 &&
            this.board[i][j + 1] === 1
          ) {
            const newState = this.board.map((row) => row.slice());
            newState[i][j] = 0;
            newState[i][j + 1] = 0;
            newState[i][j + 2] = 1;

            const move = `${this.getSlotLabel(i, j)} => ${this.getSlotLabel(
              i,
              j + 2
            )}`;
            children.push(new Node(new GameState(newState), move));
          }

          if (
            j > 1 &&
            this.board[i][j - 2] === 0 &&
            this.board[i][j - 1] === 1
          ) {
            const newState = this.board.map((row) => row.slice());
            newState[i][j] = 0;
            newState[i][j - 1] = 0;
            newState[i][j - 2] = 1;

            const move = `${this.getSlotLabel(i, j)} => ${this.getSlotLabel(
              i,
              j - 2
            )}`;
            children.push(new Node(new GameState(newState), move));
          }
        }
      }
    }
    return children;
  }

  toString() {
    let string = '';
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const value = this.board[i][j];
        string += `${value === -1 ? ' ' : value}  `;
      }
      string += '\n';
    }

    return string;
  }
}

export class Node {
  constructor(gameState, move = 'Initial', parent = null, children = null) {
    this.gameState = gameState;
    this.children = children;
    this.parent = parent;
    this.move = move;
  }
}
