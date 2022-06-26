const readline = require('readline');

// Object with all the valid moves
const validMoves = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

// Game data
let wins = 0;
let losses = 0;
let ties = 0;

// *****
// Helper functions
// *****

// Randomly return a valid move
const getCPUMove = () => {
  const validMoveKeys = Object.keys(validMoves);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  const cpu = validMoveKeys[randomIndex];
  return cpu;
};
