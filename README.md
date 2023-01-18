# Peg Solitaire Solver

## Description

This project was done as part of the CSE 4082 - Introduction to Artificial Intelligence course at Marmara University (Instructor: Ali Haydar Özer). It was implemented with Javascript Language.

It solves the English Peg Solitaire by using several uninformed searching algorithms to be able to understand their nature. (More info can be seen in Project Description File under Project Files directory).
___ 

## Usage

To run the program, make sure you have Node.js installed.
After installing Node.js 

```
git clone https://github.com/barishazar3431/peg-solitaire-solver.git

cd Peg-Solitaire-Solver/

npm install

node src/index.js
```

Note: If you get Heap Allocation Error when running BFS, just type 
```
export NODE_OPTIONS=--max_old_space_size=16384
```
to the terminal just before running the program, to increase the heap allocation. It is necessary only for BFS because it uses memory the most among all the algorithms.

## Program Execution
### Choosing the Algorithm
You choose one of the 5 algorithms and enter a time limit in minutes.
```
Choose algorithm:
1 - Breadth-First Search
2 - Depth-First Search
3 - Iterative Deepening Search
4 - Depth-First Search With Random Selection
5 - Depth-First Search With a Node Selection Heuristic

Choose 1-5: 5
Enter Time Limit in Minutes: 1
```
### Output of the Program

```
Algorithm:  heuristicDFS
Time Spent: 512.284ms
Message: Optimum Solution Found!!
Expanded Nodes:  19057
Max Number of Nodes Stored in Memory: 298

=== Board States Until the Solution. ===

Move #1: 29 => 17

    1 1 1
    1 1 1
1 1 1 1 1 1 1
1 1 1 0 1 1 1
1 1 1 1 1 1 1
    1 1 1
    1 1 1



Move #2: 26 => 24

    1 1 1
    1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 0 1 1 1
    1 0 1
    1 1 1



Move #3: 11 => 25

    1 1 1
    1 1 1
1 1 1 1 1 1 1
1 1 1 1 1 1 1
1 1 1 1 0 0 1
    1 0 1
    1 1 1



Move #4: 9 => 11

    1 1 1
    1 1 1
1 1 1 1 0 1 1
1 1 1 1 0 1 1
1 1 1 1 1 0 1
    1 0 1
    1 1 1



Move #5: 23 => 9

    1 1 1
    1 1 1
1 1 0 0 1 1 1
1 1 1 1 0 1 1
1 1 1 1 1 0 1
    1 0 1
    1 1 1



Move #6: 14 => 16

    1 1 1
    1 1 1
1 1 1 0 1 1 1
1 1 0 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 1 1



Move #7: 31 => 23

    1 1 1
    1 1 1
1 1 1 0 1 1 1
0 0 1 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 1 1



Move #8: 33 => 31

    1 1 1
    1 1 1
1 1 1 0 1 1 1
0 0 1 1 0 1 1
1 1 1 1 1 0 1
    0 0 1
    0 1 1



Move #9: 16 => 28

    1 1 1
    1 1 1
1 1 1 0 1 1 1
0 0 1 1 0 1 1
1 1 1 1 1 0 1
    0 0 1
    1 0 0



Move #10: 4 => 16

    1 1 1
    1 1 1
1 1 1 0 1 1 1
0 0 0 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #11: 7 => 9

    1 1 1
    0 1 1
1 1 0 0 1 1 1
0 0 1 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #12: 2 => 10

    1 1 1
    0 1 1
0 0 1 0 1 1 1
0 0 1 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #13: 6 => 18

    1 0 1
    0 0 1
0 0 1 1 1 1 1
0 0 1 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #14: 13 => 11

    1 0 1
    0 0 0
0 0 1 1 0 1 1
0 0 1 1 1 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #15: 18 => 6

    1 0 1
    0 0 0
0 0 1 1 1 0 0
0 0 1 1 1 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #16: 3 => 11

    1 0 1
    0 0 1
0 0 1 1 0 0 0
0 0 1 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #17: 10 => 12

    1 0 0
    0 0 0
0 0 1 1 1 0 0
0 0 1 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #18: 27 => 13

    1 0 0
    0 0 0
0 0 1 0 0 1 0
0 0 1 1 0 1 1
1 1 0 1 1 0 1
    1 0 1
    1 0 0



Move #19: 13 => 11

    1 0 0
    0 0 0
0 0 1 0 0 1 1
0 0 1 1 0 1 0
1 1 0 1 1 0 0
    1 0 1
    1 0 0



Move #20: 30 => 18

    1 0 0
    0 0 0
0 0 1 0 1 0 0
0 0 1 1 0 1 0
1 1 0 1 1 0 0
    1 0 1
    1 0 0



Move #21: 24 => 10

    1 0 0
    0 0 0
0 0 1 0 1 0 0
0 0 1 1 1 1 0
1 1 0 1 0 0 0
    1 0 0
    1 0 0



Move #22: 31 => 23

    1 0 0
    0 0 0
0 0 1 1 1 0 0
0 0 1 0 1 1 0
1 1 0 0 0 0 0
    1 0 0
    1 0 0



Move #23: 16 => 28

    1 0 0
    0 0 0
0 0 1 1 1 0 0
0 0 1 0 1 1 0
1 1 1 0 0 0 0
    0 0 0
    0 0 0



Move #24: 21 => 23

    1 0 0
    0 0 0
0 0 1 1 1 0 0
0 0 0 0 1 1 0
1 1 0 0 0 0 0
    1 0 0
    0 0 0



Move #25: 28 => 16

    1 0 0
    0 0 0
0 0 1 1 1 0 0
0 0 0 0 1 1 0
0 0 1 0 0 0 0
    1 0 0
    0 0 0



Move #26: 16 => 4

    1 0 0
    0 0 0
0 0 1 1 1 0 0
0 0 1 0 1 1 0
0 0 0 0 0 0 0
    0 0 0
    0 0 0



Move #27: 1 => 9

    1 0 0
    1 0 0
0 0 0 1 1 0 0
0 0 0 0 1 1 0
0 0 0 0 0 0 0
    0 0 0
    0 0 0



Move #28: 18 => 6

    0 0 0
    0 0 0
0 0 1 1 1 0 0
0 0 0 0 1 1 0
0 0 0 0 0 0 0
    0 0 0
    0 0 0



Move #29: 9 => 11

    0 0 0
    0 0 1
0 0 1 1 0 0 0
0 0 0 0 0 1 0
0 0 0 0 0 0 0
    0 0 0
    0 0 0



Move #30: 6 => 18

    0 0 0
    0 0 1
0 0 0 0 1 0 0
0 0 0 0 0 1 0
0 0 0 0 0 0 0
    0 0 0
    0 0 0



Move #31: 19 => 17

    0 0 0
    0 0 0
0 0 0 0 0 0 0
0 0 0 0 1 1 0
0 0 0 0 0 0 0
    0 0 0
    0 0 0



    0 0 0
    0 0 0
0 0 0 0 0 0 0
0 0 0 1 0 0 0
0 0 0 0 0 0 0
    0 0 0
    0 0 0

```
