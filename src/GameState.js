import chalk from 'chalk';
import config from './config.js';

export class GameState {
  constructor(board, move = [], removedPeg = []) {
    this.board = board; //Board represented by 2d array
    this.move = move; //Move which leads to this state
    this.removedPeg = removedPeg; //Last removed peg which led to this state
  }

  getSlotLabel(x, y) {
    if (this.board[x][y] === -1) {
      return -1;
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

  /**
   * Returns the total number of lonely pegs(pegs which don't have any neighboring peg)
   * @returns number of lonely pegs
   */
  getLonelyPegs() {
    let lonelyPegs = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (
          this.board[i][j] === 1 &&
          this.board[i + 1]?.[j] === 0 &&
          this.board[i - 1]?.[j] === 0 &&
          this.board[i]?.[j - 1] === 0 &&
          this.board[i]?.[j + 1] === 0
        ) {
          lonelyPegs++;
        }
      }
    }
    return lonelyPegs;
  }

  getRemainingPegs() {
    let remainingPegs = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 1) {
          remainingPegs++;
        }
      }
    }
    return remainingPegs;
  }

  getMoveString(move = this.move) {
    return `${move[0]} => ${move[1]}`;
  }

  isGameOver() {
    return this.getChildrenStates().length === 0;
  }

  isOptimal() {
    return JSON.stringify(this.board) === JSON.stringify(config.goalState);
  }

  addChildState(childrenStates, i, j, iDirection, jDirection) {
    if (
      this.board[i][j] === 1 &&
      this.board[i + iDirection]?.[j + jDirection] === 1 &&
      this.board[i + iDirection * 2]?.[j + jDirection * 2] === 0
    ) {
      const newState = this.board.map((row) => row.slice());
      newState[i][j] = 0;
      newState[i + iDirection][j + jDirection] = 0;
      newState[i + iDirection * 2][j + jDirection * 2] = 1;

      const move = [
        this.getSlotLabel(i, j),
        this.getSlotLabel(i + 2 * iDirection, j + 2 * jDirection),
      ];

      const removedPeg = [i + iDirection, j + jDirection];

      childrenStates.push(new GameState(newState, move, removedPeg));
    }
  }

  getChildrenStates() {
    const childrenStates = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.addChildState(childrenStates, i, j, 0, 1); //Check for right move
        this.addChildState(childrenStates, i, j, 0, -1); // Left move
        this.addChildState(childrenStates, i, j, -1, 0); // Up move
        this.addChildState(childrenStates, i, j, 1, 0); // Down move
      }
    }
    return childrenStates;
  }

  toString(nextMove, nextRemoved) {
    let string = '';
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const value = this.board[i][j];
        if (this.isGameOver() && value === 1) {
          string += chalk.blue(value);
        } else if (nextMove.indexOf(this.getSlotLabel(i, j)) !== -1) {
          string += chalk.green(value);
        } else if (nextRemoved[0] === i && nextRemoved[1] === j) {
          string += chalk.red(value);
        } else if (value === -1) {
          string += ' ';
        } else {
          string += value;
        }
        string += ' ';
      }
      string += '\n';
    }
    string +=
      nextMove.length > 0 ? `\nMove: ${this.getMoveString(nextMove)}` : '';

    return string;
  }
}

export class GameNode {
  constructor(gameState, parent = null, depth = 0, children = []) {
    this.gameState = gameState;
    this.parent = parent;
    this.depth = depth;
    this.children = children;
  }
}
