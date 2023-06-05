const EMPTY = '';
const PLAYER_X = 'X';
const PLAYER_O = 'O';

let currentPlayer = PLAYER_X;
let gameActive = true;
let board = [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY]
];

function makeMove(row, col) {
  if (!gameActive || board[row][col] !== EMPTY) {
    return;
  }

  board[row][col] = currentPlayer;
  document.getElementById('board').children[row].children[col].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    announceWinner(currentPlayer);
    gameActive = false;
  } else if (checkTie()) {
    announceTie();
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    if (currentPlayer === PLAYER_O) {
      makeComputerMove();
    }
  }
}

function makeComputerMove() {
  const emptyCells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === EMPTY) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    makeMove(row, col);
  }
}

function checkWin(player) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === player &&
      board[row][1] === player &&
      board[row][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === player &&
      board[1][col] === player &&
      board[2][col] === player
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

function checkTie() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === EMPTY) {
        return false;
      }
    }
  }

  return true;
}

function announceWinner(player) {
  alert(`Player ${player} wins!`);
}

function announceTie() {
  alert('It\'s a tie!');
}

function resetGame() {
  currentPlayer = PLAYER_X;
  gameActive = true;
  board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
  ];

  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = EMPTY;
  }
}

resetGame();

