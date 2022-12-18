# Peg Solitaire Solver

## Description

This project was implemented as part of CSE 4082 - Introduction to Artificial Intelligence course at Marmara University. It was implemented with Javascript Language.

It solves English Peg Solitaire by using several uninformed searching algorithms, to be able to understand their nature. (More info can be seen in Project Description File under Project Files directory).
___ 

## Usage

To run the program, make sure you have Node.js installed.
After installing Node.js 

```
git clone https://github.com/barishazar3431/Peg-Solitaire-Solver.git

cd Peg-Solitaire-Solver/

npm install

node src/index.js
```

Note: If you get Heap Allocation Error when running BFS, just type 
```
export NODE_OPTIONS=--max_old_space_size=16384
```
to the terminal just before running the program, to increase the heap allocation. It is necessary only for BFS because it uses memory the most among all the algorithms.