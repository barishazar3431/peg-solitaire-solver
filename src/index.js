import { DFS, BFS, randomDFS, heuristicDFS } from './algorithms.js';
import config from './config.js';
import { GameState, GameNode } from './GameState.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();

const initialGameState = new GameState(config.initialState);
const rootNode = new GameNode(initialGameState);

const algorithms = {
  1: BFS,
  2: DFS,
  3: () => {}, // Iterative Deepening
  4: randomDFS,
  5: heuristicDFS,
};

console.log(
  '\n\nChoose algorithm: \n1 - Breadth First Search\n2 - Depth-First Search\n3 - Iterative Deepening Search\n4 - Depth-First Search With Random Selection\n5 - Depth-First Search With a Node Selection Heuristic\n'
);

const algorithm = prompt('Choose 1-5: ');
export const timeLimitMinutes = prompt('Enter Time Limit in Minutes: ');


console.time('Time Spent: ');
algorithms[algorithm](rootNode);



