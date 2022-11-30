import { DFS } from './Algorithms.js';
import config from './config.js';
import { GameState, Node } from './GameState.js';

const initialGameState = new GameState(config.initialState);
const root = new Node(initialGameState);

console.time('DFS Time');
DFS(root);
console.timeEnd('DFS Time');
