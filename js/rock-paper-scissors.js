const choiceBtn = document.querySelectorAll('#choice');
const computerDiv = document.querySelector('#computer');
const userDiv = document.querySelector('#user');
const modal = document.querySelector('#result');

// 컴퓨터와 유저의 점수
let computer_score;
let user_score;

// 컴퓨터 이미지 반복 교체
let num = 0;
let timeId;
const paintComputerDiv = () => {
  let comChoice;
  num = ( num + 1 ) % 3
  switch (num) {
    case 0:
      comChoice = 'rock';
      break;
    case 1:
      comChoice = 'paper';
      break;
    case 2:
      comChoice = 'scissors';
      break;
    }
  computerDiv.innerHTML = `<img src="../../img/game1/${comChoice}.png">`
  // 재귀
  timeId = setTimeout(paintComputerDiv, 200)
}
paintComputerDiv();


// 1. 컴퓨터의 선택
const getComChoice = () => {
  clearTimeout(timeId)
  let comChoice = Math.floor(Math.random() * 3);
  switch (num) {
    case 0:
      comChoice = 'rock';
      break;
    case 1:
      comChoice = 'paper';
      break;
    case 2:
      comChoice = 'scissors';
      break;
  } 
  computerDiv.innerHTML = `<img src="../../img/game1/${comChoice}.png">`
  return num
}

// 2. 유저의 선택 화면에 보여주기
const paintUserDiv = (user) => {
  // string > number
  user = Number(user);

  let userchoice;
  switch (user) {
    case 0:
      userchoice = 'rock';
      break;
    case 1:
      userchoice = 'paper';
      break;
    case 2:
      userchoice = 'scissors';
      break;
  }
  userDiv.innerHTML = `<img src="../../img/game1/${userchoice}.png">`
}

// 3. 승부 결과 계산
const getGameResult = (computer, user) => {
  let result = computer - user;
  let message;
  
  switch (result) {
    // 유저가 지는 경우
    case 1:
    case -2:
      message = 'lose';
      break;
    // 유저가 이기는 경우
    case -1:
    case 2:
      message = 'win';
      break;
    // 비기는 경우
    case 0:
      message = 'draw';
      break;
  }
  return message
}

// 4. 승부 결과 보여주기
const closeResult = () => {
  modal.style.display = 'none'
}
const showResult = (message) => {
  modal.innerHTML = `${message}`
  modal.style.display = 'flex'
  setTimeout(closeResult, 2000)
}

// 5. 점수 반영
const paintScore = () => {
  const computerScore = document.querySelector('#score-computer');
  const userScore = document.querySelector('#score-user');
  computerScore.innerText = computer_score;
  userScore.innerText = user_score;
}
const changeScore = (winner) => {
  if (winner === 'computer') {
    computer_score += 50
  } else {
    user_score += 50
  }
  paintScore();
}

// 6. 화면 리셋
const restartRound = () => {
  userDiv.innerHTML = `<h3 class="game1__show__user__text">Choose your choice</h3>`
  paintComputerDiv();
}

const resetGame = () => {
  computer_score = 0;
  user_score = 0;
}


async function playRound(event) {
  // 유저의 선택
  const userChoice = event.currentTarget.dataset.userNum;
  
  // 1. 컴퓨터의 선택
  const comChoice = getComChoice();

  // 2. 유저의 선택 보여주기
  paintUserDiv(userChoice);

  // 3. 승부 결과 계산
  const message = getGameResult(comChoice, userChoice);

  // 4. 승부 결과 보여주기
  setTimeout(showResult, 2000, message);
  
  // 5. 점수에 반영
  let winner;
  switch (message) {
    case 'win':
      winner = 'user';
      changeScore(winner);
      break;
    case 'lose':
      winner = 'computer';
      changeScore(winner);
      break;
  }

  // 6. 화면 리셋
  setTimeout(restartRound, 4000);
}

const init = () => {
  modal.style.display = 'none'
  resetGame();
}

init();

choiceBtn.forEach((btn) => {btn.addEventListener('click', playRound)})