const btns = document.querySelectorAll('#btn');
const gameList = document.querySelector('#game-list');
const gameTitles = document.querySelectorAll('.game-title')

const BG_COLOR = '#0B0B0B';
const POINT_COLOR = '#D1FF4E';

gameTitles.forEach((title) => {title.style.color = POINT_COLOR})

let timeoutID;

btns.forEach(
  (btn) => {btn.addEventListener('mouseenter', function (event) {
    const filtered = [...gameTitles].filter((title) => title.dataset.idx != btn.dataset.idx)
    filtered.forEach((title) => {title.querySelector('h2').style.color = 'white'})
    switch (btn.dataset.idx) {
      case '0':
        gameList.style.bottom = '100%'
        clearTimeout(timeoutID);
        break;
      case '1':
        gameList.style.bottom = '200%'
        clearTimeout(timeoutID);
      break;
      case '2':
        gameList.style.bottom = '300%'
        clearTimeout(timeoutID);
        break;
      case '3':
        gameList.style.bottom = '400%'
        clearTimeout(timeoutID);
        break;
      };
      const title = gameTitles[btn.dataset.idx].querySelector('h2')
      title.style.color = POINT_COLOR;
    })})
    
    
btns.forEach(
  (btn) => {btn.addEventListener('mouseleave', function (event) {
    const title = gameTitles[btn.dataset.idx].querySelector('h2')
    timeoutID = setTimeout(function () {
      gameList.style.bottom = '0%'
    }, 1500)
    // title.style.color = 'white';

})})