import { DFS, BFS, randomDFS, heuristicDFS } from './algorithms.js';
import config from './config.js';
import { GameState, GameNode } from './GameState.js';

const initialGameState = new GameState(config.initialState);
const root = new GameNode(initialGameState);

// console.time('DFS Time');
// DFS(root);
// console.timeEnd('DFS Time');

// console.time('Random DFS Time');
// randomDFS(root);
// console.timeEnd('Random DFS Time');

// console.time('BFS Time');
// BFS(root);
// console.timeEnd('BFS Time');

console.time('Heuristic Time');
heuristicDFS(root);
console.timeEnd('Heuristic Time');
