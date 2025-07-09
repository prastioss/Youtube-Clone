const ScoreStatus = JSON.parse(localStorage.getItem('ScoreStatus')) || {
  winStat: 0,
  loseStat: 0,
  drawStat: 0,
};

updateScoreElement();

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = '';

  if (computerMove === playerMove) {
    result = 'Tie';
    ScoreStatus.drawStat++;
  } else if (
    (playerMove === 'Rock' && computerMove === 'Scissors') ||
    (playerMove === 'Paper' && computerMove === 'Rock') ||
    (playerMove === 'Scissors' && computerMove === 'Paper')
  ) {
    result = 'You Win!';
    ScoreStatus.winStat++;
  } else {
    result = 'You Lose!';
    ScoreStatus.loseStat++;
  }
  localStorage.setItem('ScoreStatus', JSON.stringify(ScoreStatus));
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector(
    '.js-compare'
  ).innerHTML = `You ${playerMove} - ${computerMove} Computer`;
  updateScoreElement();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  return computerMove;
}

function resetScore() {
  ScoreStatus.winStat = 0;
  ScoreStatus.loseStat = 0;
  ScoreStatus.drawStat = 0;
  localStorage.removeItem('ScoreStatus');
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `wins: ${ScoreStatus.winStat}, Losses: ${ScoreStatus.loseStat}, Ties: ${ScoreStatus.drawStat}`;
}
