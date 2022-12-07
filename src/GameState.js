import chalk from 'chalk';
import { euclideanDistance, manhattanDistance } from './Algorithms.js';
import config from './config.js';

export class GameState {
  constructor(board, move = [], removedPeg = []) {
    this.board = board; //Board represented by 2d array
    this.move = move; //Move which leads to this state [fromLabel, destLabel]
    this.removedPeg = removedPeg; //Last removed peg which led to this state
  }

  getSlotLabel(row, col) {
    if (this.board[row]?.[col] === -1) {
      return -1;
    }

    let sum = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] !== -1) {
          sum++;
        }
        if (i === row && j === col) {
          return sum;
        }
      }
    }
    return sum;
  }

  getCoordinate(slotLabel) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.getSlotLabel(i, j) === slotLabel) {
          return [i, j];
        } 
      }
    }
  }

  getDestinationCoordinate() {
    const destinationLabel = this.getSlotLabel(this.move[1]);
    return this.getCoordinate(destinationLabel);
  }

  getNumOfLonelyPegs() {
    let lonelyPegs = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 1 && !this.hasOrthogonalNeighbor(i, j)) {
          lonelyPegs++;
        }
      }
    }
    return lonelyPegs;
  }

  hasOrthogonalNeighbor(i, j) {
    return (
      this.board[i + 1]?.[j] === 1 ||
      this.board[i - 1]?.[j] === 1 ||
      this.board[i]?.[j - 1] === 1 ||
      this.board[i]?.[j + 1] === 1 
    );
  }

  getWeightedScore() {
    let score = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == 1) {
          score += manhattanDistance(i, j, 3, 3);
        }
      }
    }
    return score;
  }

  getNumOfRemainingPegs() {
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

  getChildrenCount() {
    return this.getChildrenStates().length;
  }

  isGameOver() {
    return this.getChildrenCount() === 0;
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

  getRemovedPeg() {
    return this.getSlotLabel(this.removedPeg[0], this.removedPeg[1]);
  }

  getChildrenStates() {
    const childrenStates = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const directions = [
          [-1, 0],
          [1, 0],
          [0, 1],
          [0, -1],
        ];
        directions.forEach((dir) =>
          this.addChildState(childrenStates, i, j, dir[0], dir[1])
        );
        // this.addChildState(childrenStates, i, j, 0, 1); //Check for right move
        // this.addChildState(childrenStates, i, j, 0, -1); // Left move
        // this.addChildState(childrenStates, i, j, 1, 0); // Down move
        // this.addChildState(childrenStates, i, j, -1, 0); // Up move
      }
    }
    return childrenStates;
  }

  toString(nextMove, nextRemoved) {
    let string =
      nextMove.length > 0
        ? `\nMove: ${this.getMoveString(nextMove)}\n\n`
        : '\n';

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

    return string;
  }
}

export class GameNode {
  constructor(gameState, parent = null, depth = 0 ) {
    this.gameState = gameState;
    this.parent = parent;
    this.depth = depth;
  }
}
