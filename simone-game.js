const buttons = Array.from(document.getElementsByClassName('button'));
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const strictCheckbox = document.getElementById('strict-checkbox');
const countDisplay = document.getElementById('count');

const audioUrls = [
  'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
  'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
];
const audioElements = audioUrls.map(url => new Audio(url));

let gameSequence = [];
let userSequence = [];
let gameActive = false;
let strictMode = false;
let count = 0;

function playSound(index) {
  audioElements[index].play();
}

function flashButton(button) {
  button.classList.add('active');
  playSound(Number(button.dataset.index));
  setTimeout(() => {
    button.classList.remove('active');
  }, 300);
}

function generateRandomButton() {
  const randomIndex = Math.floor(Math.random() * 4);
  return buttons[randomIndex];
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    const button = buttons[gameSequence[i]];
    flashButton(button);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
    }
  }, 600);
}

function addToUserSequence(button) {
  userSequence.push(Number(button.dataset.index));
  flashButton(button);
  const buttonIndex = userSequence.length - 1;
  if (userSequence[buttonIndex] !== gameSequence[buttonIndex]) {
    if (strictMode) {
      resetGame();
    } else {
      notifyError();
      setTimeout(playSequence, 1000);
      userSequence = [];
    }
  } else {
    if (userSequence.length === gameSequence.length) {
      count++;
      countDisplay.textContent = count;
      if (count === 20) {
        notifyWin();
        resetGame();
      } else {
        userSequence = [];
        setTimeout(() => {
          addToGameSequence();
          playSequence();
        }, 1000);
      }
    }
  }
}

function addToGameSequence() {
  const randomButton = generateRandomButton();
  gameSequence.push(Number(randomButton.dataset.index));
}

function notifyError() {
  countDisplay.textContent = '!!';
  setTimeout(() => {
    countDisplay.textContent = count;
  }, 1000);
}

function notifyWin() {
  countDisplay.textContent = 'WIN!';
  setTimeout(() => {
    countDisplay.textContent = count;
  }, 2000);
}

function resetGame() {
  gameSequence = [];
  userSequence = [];
  gameActive = false;
  count = 0;
  countDisplay.textContent = count;
}

function handleButtonClick(e) {
  if (gameActive) {
    const button = e.target;
    addToUserSequence(button);
  }
}

function handleStartButtonClick() {
  if (!gameActive) {
    resetGame();
    addToGameSequence();
    playSequence();
    gameActive = true;
  }
}

function handleResetButtonClick() {
  resetGame();
}

function handleStrictCheckboxChange() {
  strictMode = strictCheckbox.checked;
}

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

startButton.addEventListener('click', handleStartButtonClick);
resetButton.addEventListener('click', handleResetButtonClick);
strictCheckbox.addEventListener('change', handleStrictCheckboxChange);

