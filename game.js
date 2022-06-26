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

// ***************** Game data *****************
let wins = 0;
let losses = 0;
let ties = 0;

// ***************** Helper functions *****************
const printHelp = () => {
  console.log("  Type 'r' for Rock");
  console.log("  Type 'p' for Paper");
  console.log("  Type 's' for Scissors");
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
};

// Randomly return a valid move
const getCPUMove = () => {
  const validMoveKeys = Object.keys(validMoves);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  const cpu = validMoveKeys[randomIndex];
  return cpu;
};

// Get the winner of the game
const getWinner = (player, cpu) => {
  const playerWinsAgainst = validMoves[player].winsAgainst;
  const cpuWinsAgainst = validMoves[cpu].winsAgainst;

  if (playerWinsAgainst === cpu) {
    return 1; // wins
  } else if (cpuWinsAgainst === player) {
    return -1; // loses
  } else {
    return 0; // ties
  }
};

// Play a single round
const processMove = (player, cpu) => {
  const result = getWinner(player, cpu);

  console.log(`You pick ${validMoves[player].name}, computer picks ${validMoves[cpu].name}.`);
  if (result === 0) {
    console.log("You tie.\n");
    ties++;
  } else if (result === 1) {
    console.log("You win!\n");
    wins++;
  } else {
    console.log("You lose!\n");
    losses++;
  }
};

// ***************** Display game state *****************
const promptInput = (rl) => {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (validMoves[cmd]) {
      const cpu = getCPUMove();
      processMove(cmd, cpu);
    } else {
      console.log("Invalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
};

// ***************** Start game *****************
const initializeGame = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Welcome to Rock, Paper, Scissors!\n");
  printHelp();

  promptInput(rl);
};
