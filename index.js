const audio = document.querySelector('#bg-music');
const slash = document.querySelector('#slash');
let playing = false;
function handleMusic(){
    if(playing){
        audio.pause();
        playing = false;
        if(!slash.classList.contains('hide')){
            slash.classList.add('hide');
        }
    }
    else{
        audio.play();
        playing = true;
        if(slash.classList.contains('hide')){
            slash.classList.remove('hide');
        }
    }
}

const subMenuCont = document.querySelector('.submenu-container');
const form1 = document.querySelector('#myform');
const form2 = document.querySelector('#myform2');
function showComputerMenu(){
    if(form1.classList.contains('hide')){
        form1.classList.remove('hide');
    }
    if(!form2.classList.contains('hide')){
        form2.classList.add('hide');
    }
    if(!subMenuCont.classList.contains('active')){
        subMenuCont.classList.add('active');
    }
}

function showMultiMenu(){
    if(!form1.classList.contains('hide')){
        form1.classList.add('hide');
    }
    if(form2.classList.contains('hide')){
        form2.classList.remove('hide');
    }
    if(!subMenuCont.classList.contains('active')){
        subMenuCont.classList.add('active');
    }
}

const roundNumberEle = document.querySelector('#round-number-ele');
const gameLayout = document.querySelector('.game-layout');
const roundNumberDiv = document.querySelector('.round-number-div');

const menu = document.querySelector('.menu');
const gameUI = document.querySelector('.game-ui');
const listeners = [];
let inputCount;


function playWithComp(){
    initGame();
    roundNumberEle.innerHTML = '1';
    inputCount = document.querySelector('#input-count').value;
    // console.log(menu);
    
    if(menu.classList.contains('active')){
        menu.classList.remove('active');
    }
    if(!form1.classList.contains('hide')){
        form1.classList.add('hide');
    }
    if(!form2.classList.contains('hide')){
        form2.classList.add('hide');
    }
    if(gameLayout.classList.contains('hide')){
        gameLayout.classList.remove('hide');
    }
    if(roundNumberDiv.classList.contains('hide')){
        roundNumberDiv.classList.remove('hide');
    }
    if(!gameUI.classList.contains('active')){
        gameUI.classList.add('active');
    }
    
    if(listeners.length !== 0){
        for(let index = 0; index<9; index++){
            boxes[index].removeEventListener('click', listeners[index]);
        }
        listeners.length = 0;
    }

    for(let index = 0; index<9; index++){
        
        listeners[index] = () => handleClickComp(index);

        boxes[index].addEventListener('click', listeners[index]);
    }

    return false;
}

function playMulti(){
    initGame();
    roundNumberEle.innerHTML = '1';
    inputCount = document.querySelector('#input-count2').value;

    if(menu.classList.contains('active')){
        menu.classList.remove('active');
    }
    if(!form1.classList.contains('hide')){
        form1.classList.add('hide');
    }
    if(!form2.classList.contains('hide')){
        form2.classList.add('hide');
    }
    if(gameLayout.classList.contains('hide')){
        gameLayout.classList.remove('hide');
    }
    if(roundNumberDiv.classList.contains('hide')){
        roundNumberDiv.classList.remove('hide');
    }
    if(!gameUI.classList.contains('active')){
        gameUI.classList.add('active');
    }

    if(listeners.length !== 0){
        for(let index = 0; index<9; index++){
            boxes[index].removeEventListener('click', listeners[index]);
        }
        listeners.length = 0;
    }

    for(let index = 0; index<9; index++){
        
        listeners[index] = () => handleClickMulti(index);

        boxes[index].addEventListener('click', listeners[index]);
    }

    return false;
}

const boxes = document.querySelectorAll('.box');
let currentPlayerEle = document.querySelector('#player-sign');
const playerXScoreEle = document.querySelector('.player1-win-count');
const tieEle = document.querySelector('.tie-count');
const playerOScoreEle = document.querySelector('.player2-win-count');
const gameOverMenu = document.querySelector('.game-over-menu');

const winningCongfig = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let gameStatus;
let possibleIndexForComp;
let occupiedCells

function initGame(){
    gameStatus = ['', '', '', '', '', '', '', '', '',];
    occupiedCells = 0;
    possibleIndexForComp = [0,1,2,3,4,5,6,7,8];
    playerXScoreEle.innerHTML = '0';
    playerOScoreEle.innerHTML = '0';
    tieEle.innerHTML = '0';
    for(let i=0; i<9; i++){
        boxes[i].innerHTML = '';
        boxes[i].style.pointerEvents = 'all';
        boxes[i].classList = `box box${i+1}`;
    }
    msgg.innerHTML = 'Current player: (<span id="player-sign">X</span>)';
    currentPlayerEle.innerHTML = 'X';

    if(gameOverMenu.classList.contains('active')){
        gameOverMenu.classList.remove('active');
    }
    if(!gameUI.classList.contains('active')){
        gameUI.classList.add('active')
    }
}

function showMenu(){
    if(gameOverMenu.classList.contains('active')){
        gameOverMenu.classList.remove('active');
    }
    if(gameUI.classList.contains('active')){
        gameUI.classList.remove('active')
    }
    if(!menu.classList.contains('active')){
        menu.classList.add('active');
    }
}

function checkGameOver(occupiedCells){
    let winner;
    let msgg = document.querySelector('#msgg');
    for(let i=0; i<winningCongfig.length; i++){
        if((gameStatus[winningCongfig[i][0]] !== '' || gameStatus[winningCongfig[i][1]] !== '' || gameStatus[winningCongfig[i][0]] !== '') && ((gameStatus[winningCongfig[i][0]] === gameStatus[winningCongfig[i][1]]) && (gameStatus[winningCongfig[i][1]] === gameStatus[winningCongfig[i][2]]))){
            // Make boxes green
            boxes[winningCongfig[i][0]].classList.add('win-box');
            boxes[winningCongfig[i][1]].classList.add('win-box');
            boxes[winningCongfig[i][2]].classList.add('win-box');
            
            if(gameStatus[winningCongfig[i][0]] === 'X'){
                winner = 'X';
                playerXScoreEle.innerHTML = Number(playerXScoreEle.innerHTML)+1;
            }
            else{
                winner = 'O';
                playerOScoreEle.innerHTML = Number(playerOScoreEle.innerHTML)+1;
            }

            for(let i=0; i<boxes.length; i++){
                boxes[i].style.pointerEvents = 'none';
            }

            msgg.innerHTML = `Player(${winner}) is the winner`;
            return true;
        }
    }
    if(occupiedCells === 9){
        msgg.innerHTML = `Match tied`;
        tieEle.innerHTML = Number(tieEle.innerHTML)+1;
        return true;
    }

    return false;
}


function swap(){
    console.log(currentPlayerEle.innerHTML);
    if(currentPlayerEle.innerHTML === 'X'){
        currentPlayerEle.innerHTML = 'O';
    }
    else{
        currentPlayerEle.innerHTML = 'X';
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Eventlistener functions
async function handleClickComp(index) {
    // console.log("Hii");

    if (boxes[index].innerHTML === '') {
        if (currentPlayerEle.innerHTML === 'X') {
            boxes[index].innerHTML = 'X';
            gameStatus[index] = 'X';
        } else {
            boxes[index].innerHTML = 'O';
            gameStatus[index] = 'O';
        }
        swap();
        occupiedCells += 1;
        boxes[index].style.pointerEvents = 'none';

        if (checkGameOver(occupiedCells)) {
            await delay(800);
            console.log('X-wala');
            let roundNumber = roundNumberEle.innerHTML;
            // console.log('game-over ', typeof roundNumber, " ",typeof inputCount);
            if(roundNumber >= inputCount){
                let winningMessage;

                if(playerXScoreEle.innerHTML > playerOScoreEle.innerHTML){
                    winningMessage = 'Congrantulations!<br>Player(X) Won the Game!!!';
                }
                else if(playerXScoreEle.innerHTML < playerOScoreEle.innerHTML){
                    winningMessage = 'Congrantulations!<br>Player(O) Won the Game!!!';
                }
                else{
                    winningMessage = 'Game Tied!';
                }
                msgg.innerHTML = `${winningMessage}`;
                if(!gameLayout.classList.contains('hide')){
                    gameLayout.classList.add('hide');
                }
                if(!roundNumberDiv.classList.contains('hide')){
                    roundNumberDiv.classList.add('hide');
                }
                if(!gameOverMenu.classList.contains('active')){
                    gameOverMenu.classList.add('active');
                }
            }
            else{
                gameStatus = ['', '', '', '', '', '', '', '', '',];
                occupiedCells = 0;
                possibleIndexForComp = [0,1,2,3,4,5,6,7,8];
                currentPlayerEle.innerHTML = 'X';
                for(let i=0; i<9; i++){
                    boxes[i].innerHTML = '';
                    boxes[i].style.pointerEvents = 'all';
                    boxes[i].classList = `box box${i+1}`;
                }
                roundNumberEle.innerHTML = Number(roundNumber)+1;
                msgg.innerHTML = 'Current player: (<span id="player-sign">X</span>)'
            }
            return;
        }
        
        
        // Computer move
        // console.log('rama rama');
        await delay(200);
        possibleIndexForComp = possibleIndexForComp.filter(item => item !== index);
        let compMoveIndex = Math.floor(Math.random() * possibleIndexForComp.length);
        let compMove = possibleIndexForComp[compMoveIndex];

        if (currentPlayerEle.innerHTML === 'X') {
            boxes[compMove].innerHTML = 'X';
            gameStatus[compMove] = 'X';
        } else {
            boxes[compMove].innerHTML = 'O';
            gameStatus[compMove] = 'O';
        }
        swap();
        occupiedCells += 1;
        boxes[compMove].style.pointerEvents = 'none';
        possibleIndexForComp = possibleIndexForComp.filter(item => item !== compMove);

        if (checkGameOver(occupiedCells)) {
            await delay(800);
            console.log('O-wala');
            let roundNumber = roundNumberEle.innerHTML;
            // console.log('game-over ', typeof roundNumber, " ",typeof inputCount);
            if(roundNumber >= inputCount){
                let winningMessage;
                
                if(playerXScoreEle.innerHTML > playerOScoreEle.innerHTML){
                    winningMessage = 'Congrantulations!<br>Player(X) Won the Game!!!';
                }
                else if(playerXScoreEle.innerHTML < playerOScoreEle.innerHTML){
                    winningMessage = 'Congrantulations!<br>Player(O) Won the Game!!!';
                }
                else{
                    winningMessage = 'Game Tied!';
                }
                msgg.innerHTML = `${winningMessage}`;
                if(!gameLayout.classList.contains('hide')){
                    gameLayout.classList.add('hide');
                }
                if(!roundNumberDiv.classList.contains('hide')){
                    roundNumberDiv.classList.add('hide');
                }
                if(!gameOverMenu.classList.contains('active')){
                    gameOverMenu.classList.add('active');
                }
            }
            else{
                gameStatus = ['', '', '', '', '', '', '', '', '',];
                occupiedCells = 0;
                possibleIndexForComp = [0,1,2,3,4,5,6,7,8];
                currentPlayerEle.innerHTML = 'X';
                for(let i=0; i<9; i++){
                    boxes[i].innerHTML = '';
                    boxes[i].style.pointerEvents = 'all';
                    boxes[i].classList = `box box${i+1}`;
                }
                roundNumberEle.innerHTML = Number(roundNumber)+1;
                
            }
            return;
        }
    }
}

async function handleClickMulti(index){
    if(boxes[index].innerHTML === ''){
        if (currentPlayerEle.innerHTML === 'X') {
            boxes[index].innerHTML = 'X';
            gameStatus[index] = 'X';
        }
        else {
            boxes[index].innerHTML = 'O';
            gameStatus[index] = 'O';
        }
        swap();
        occupiedCells += 1;
        boxes[index].style.pointerEvents = 'none';
        if(checkGameOver(occupiedCells)){
            await delay(800);
            console.log('multi-X-wala');
            let roundNumber = roundNumberEle.innerHTML;
            
            if(roundNumber >= inputCount){
                let winningMessage;

                if(playerXScoreEle.innerHTML > playerOScoreEle.innerHTML){
                    winningMessage = 'Congrantulations!<br>Player(X) Won the Game!!!';
                }
                else if(playerXScoreEle.innerHTML < playerOScoreEle.innerHTML){
                    winningMessage = 'Congrantulations!<br>Player(O) Won the Game!!!';
                }
                else{
                    winningMessage = 'Game Tied!';
                }
                msgg.innerHTML = `${winningMessage}`;
                if(!gameLayout.classList.contains('hide')){
                    gameLayout.classList.add('hide');
                }
                if(!roundNumberDiv.classList.contains('hide')){
                    roundNumberDiv.classList.add('hide');
                }
                if(!gameOverMenu.classList.contains('active')){
                    gameOverMenu.classList.add('active');
                }
            }
            else{
                gameStatus = ['', '', '', '', '', '', '', '', '',];
                occupiedCells = 0;
                possibleIndexForComp = [0,1,2,3,4,5,6,7,8];
                currentPlayerEle.innerHTML = 'X';
                for(let i=0; i<9; i++){
                    boxes[i].innerHTML = '';
                    boxes[i].style.pointerEvents = 'all';
                    boxes[i].classList = `box box${i+1}`;
                }
                roundNumberEle.innerHTML = Number(roundNumber)+1;
                msgg.innerHTML = 'Current player: (<span id="player-sign">X</span>)'
            }
            return;
        }
    }
}

function startNewGame(){
    initGame();
    roundNumberEle.innerHTML = '1';
    if(gameLayout.classList.contains('hide')){
        gameLayout.classList.remove('hide');
    }
    if(roundNumberDiv.classList.contains('hide')){
        roundNumberDiv.classList.remove('hide');
    }
    if(gameOverMenu.classList.contains('active')){
        gameOverMenu.classList.remove('active');
    }
}

function backToMenu(){
    form2.reset();
    form1.reset();
    showMenu();
}