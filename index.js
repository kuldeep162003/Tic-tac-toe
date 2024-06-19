// JS code


// Handle music button
const audio = document.querySelector('#bg-music');
const musicBtn = document.querySelector('.music-btn');
const musicImg = document.querySelector('.music-img');
const gameAudio = document.querySelector('.game-audio');
const tooltiptext = document.querySelector('.tooltiptext');
let playing = false;
function handleMusic(){
    // console.log(musicImg);
    if(playing){
        audio.pause();
        playing = false;
        if(musicBtn.classList.contains('active')){
            musicBtn.classList.remove('active');
        }
        if(musicImg.classList.contains('active')){
            musicImg.classList.remove('active');
        }
        if(gameAudio.classList.contains('active')){
            gameAudio.classList.remove('active');
        }
        tooltiptext.style.scale = '1';
    }
    else{
        audio.play();
        playing = true;
        if(!musicBtn.classList.contains('active')){
            musicBtn.classList.add('active');
        }
        if(!musicImg.classList.contains('active')){
            musicImg.classList.add('active');
        }
        if(!gameAudio.classList.contains('active')){
            gameAudio.classList.add('active');
        }
        tooltiptext.style.scale = '0.9';
    }
}


// Handle submenu for play with computer and multiplayer
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

// active and hide function

function menuRemoveActive(){
    if(menu.classList.contains('active')){
        menu.classList.remove('active');
    }
}
function form1AddHide(){
    if(!form1.classList.contains('hide')){
        form1.classList.add('hide');
    }
}
function form2AddHide(){
    if(!form2.classList.contains('hide')){
        form2.classList.add('hide');
    }
}
function markMenuAddHide(){
    if(!markMenu.classList.contains('hide')){
        markMenu.classList.add('hide')
    }
}
function markMenuRemoveHide(){
    if(markMenu.classList.contains('hide')){
        markMenu.classList.remove('hide')
    }
}
function overGridMenuRemoveHide(){
    if(overGridMenu.classList.contains('hide')){
        overGridMenu.classList.remove('hide');
    }
}
function gameLayoutRemoveHide(){
    if(gameLayout.classList.contains('hide')){
        gameLayout.classList.remove('hide');
    }
}
function roundNumberDivRemoveHide(){
    if(roundNumberDiv.classList.contains('hide')){
        roundNumberDiv.classList.remove('hide');
    }
}
function gameUIAddActive(){
    if(!gameUI.classList.contains('active')){
        gameUI.classList.add('active');
    }
}
function removePreviousListenersFromCells(){
    if(listeners.length !== 0){
        for(let index = 0; index<9; index++){
            boxes[index].removeEventListener('click', listeners[index]);
        }
        listeners.length = 0;
    }
}
function gameOverMenuRemoveActive(){
    if(gameOverMenu.classList.contains('active')){
        gameOverMenu.classList.remove('active');
    }
}

function gameUIRemoveActive(){
    if(gameUI.classList.contains('active')){
        gameUI.classList.remove('active')
    }
}
function menuAddActive(){
    if(!menu.classList.contains('active')){
        menu.classList.add('active');
    }
}

// For handling User input of play-with-computer and multiplayer
const roundNumberEle = document.querySelector('#round-number-ele');
const markMenu = document.querySelector('.mark-menu');
const overGridMenu = document.querySelector('.overgrid-menu');
const xMarkLabel = document.querySelector('#x-mark-label');
const oMarkLabel = document.querySelector('#o-mark-label');
const xMark = document.querySelector('#x-mark');
const oMark = document.querySelector('#o-mark');
const startBtn = document.querySelector('.start-button');
const gameLayout = document.querySelector('.game-layout');
const roundNumberDiv = document.querySelector('.round-number-div');
const menu = document.querySelector('.menu');
const gameUI = document.querySelector('.game-ui');
const listeners = [];
let inputCount;
let difficultyLevel;
let againstCompMode = false;
let multiplayerMode = false;


function playWithComp(){
    initGame();
    againstCompMode = true;
    multiplayerMode = false;
    roundNumberEle.innerHTML = '1';
    difficultyLevel = document.querySelector('input[type = "radio"]:checked').id;
    inputCount = document.querySelector('#input-count').value;
    // console.log(menu);
    
    menuRemoveActive();
    form1AddHide();
    form2AddHide();
    markMenuRemoveHide();
    overGridMenuRemoveHide();
    gameLayoutRemoveHide();
    roundNumberDivRemoveHide();
    gameUIAddActive();
    
    removePreviousListenersFromCells();
    for(let index = 0; index<9; index++){
    
        listeners[index] = () => handleClickComp(index);

        boxes[index].addEventListener('click', listeners[index]);
    }

    return false;
}

function playMulti(){
    initGame();
    againstCompMode = false;
    multiplayerMode = true;
    roundNumberEle.innerHTML = '1';
    inputCount = document.querySelector('#input-count2').value;

    menuRemoveActive();
    form1AddHide();
    form2AddHide();
    markMenuAddHide();
    overGridMenuRemoveHide();
    gameLayoutRemoveHide();
    roundNumberDivRemoveHide();
    gameUIAddActive();

    removePreviousListenersFromCells();
    
    for(let index = 0; index<9; index++){
            
        listeners[index] = () => handleClickMulti(index);

        boxes[index].addEventListener('click', listeners[index]);
    }

    return false;
}


// Game Initialization
const boxes = document.querySelectorAll('.box');
let currentPlayer;
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
let msgg = document.querySelector('#msgg');
let gameStarted = false;

function initGame(){
    gameStatus = ['', '', '', '', '', '', '', '', '',];
    currentPlayer = 'X'
    occupiedCells = 0;
    gameStarted = false;
    possibleIndexForComp = [0,1,2,3,4,5,6,7,8];
    playerXScoreEle.innerHTML = '0';
    playerOScoreEle.innerHTML = '0';
    tieEle.innerHTML = '0';
    xMarkLabel.style.pointerEvents = 'all'
    oMarkLabel.style.pointerEvents = 'all'
    startBtn.style.scale = '1';
    for(let i=0; i<9; i++){
        boxes[i].innerHTML = '';
        // boxes[i].style.pointerEvents = 'all';
        boxes[i].style.pointerEvents = 'none';
        boxes[i].classList = `box box${i+1}`;
    }
    msgg.innerHTML = 'Current player: (<span id="player-sign">X</span>)';

    gameOverMenuRemoveActive();
    gameUIAddActive();
}


async function startGame(){
    startBtn.style.scale = '0';
    gameStarted = true;
    for(let i=0; i<9; i++){
        boxes[i].style.pointerEvents = 'all';
    }
    if(xMarkLabel.style.pointerEvents === 'all'){
        xMarkLabel.style.pointerEvents = 'none';
    }
    if(oMarkLabel.style.pointerEvents === 'all'){
        oMarkLabel.style.pointerEvents = 'none';
    }
    if(againstCompMode && oMark.checked){
        // Computer move
        await delay(200);
        let compMove;
        if(difficultyLevel === 'difficult'){
            compMove = findBestMove();
        }
        else{
            let best = findBestMove();
            let arr = [best, playRandomly(), best, best, best, playRandomly(), best, playRandomly(), best, best];

            compMove = arr[Math.floor(Math.random()*arr.length)];
        }

        if (currentPlayer === 'X') {
            boxes[compMove].innerHTML = 'X';
            boxes[compMove].style.color = '#31C4BE';
            gameStatus[compMove] = 'X';
        } else {
            boxes[compMove].innerHTML = 'O';
            boxes[compMove].style.color = '#f2b237';
            gameStatus[compMove] = 'O';
        }
        swap();
        occupiedCells += 1;
        boxes[compMove].style.pointerEvents = 'none';
        possibleIndexForComp = possibleIndexForComp.filter(item => item !== compMove);
    }
}

function showMenu(){
    gameOverMenuRemoveActive();
    gameUIRemoveActive();
    menuAddActive();
}

function checkMatchOver(occupiedCells){
    let winner;
    msgg = document.querySelector('#msgg');
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

async function checkGameOver(){
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
        if(!overGridMenu.classList.contains('hide')){
            overGridMenu.classList.add('hide');
        }
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
        currentPlayer = 'X';
        msgg.innerHTML = 'Current player: (<span id="player-sign">X</span>)';
        for(let i=0; i<9; i++){
            boxes[i].innerHTML = '';
            boxes[i].style.pointerEvents = 'all';
            boxes[i].classList = `box box${i+1}`;
        }
        roundNumberEle.innerHTML = Number(roundNumber)+1;
        if(againstCompMode && oMark.checked){
            // Computer move
            await delay(200);
            let compMove;
            if(difficultyLevel === 'difficult'){
                compMove = findBestMove();
            }
            else{
                let best = findBestMove();
                let arr = [best, playRandomly(), best, best, best, playRandomly(), best, playRandomly(), best, best];

                compMove = arr[Math.floor(Math.random()*arr.length)];
            }

            if (currentPlayer === 'X') {
                boxes[compMove].innerHTML = 'X';
                boxes[compMove].style.color = '#31C4BE';
                gameStatus[compMove] = 'X';
            } else {
                boxes[compMove].innerHTML = 'O';
                boxes[compMove].style.color = '#f2b237';
                gameStatus[compMove] = 'O';
            }
            swap();
            occupiedCells += 1;
            boxes[compMove].style.pointerEvents = 'none';
            possibleIndexForComp = possibleIndexForComp.filter(item => item !== compMove);
        }
    }
}

async function replayGame(){
    if(gameStarted){
        gameStatus = ['', '', '', '', '', '', '', '', '',];
        occupiedCells = 0;
        possibleIndexForComp = [0,1,2,3,4,5,6,7,8];
        currentPlayer = 'X';
        msgg.innerHTML = 'Current player: (<span id="player-sign">X</span>)';
        for(let i=0; i<9; i++){
            boxes[i].innerHTML = '';
            boxes[i].style.pointerEvents = 'all';
            boxes[i].classList = `box box${i+1}`;
        }
        if(againstCompMode && oMark.checked){
            // Computer move
            await delay(200);
            let compMove;
            if(difficultyLevel === 'difficult'){
                compMove = findBestMove();
            }
            else{
                let best = findBestMove();
                let arr = [best, playRandomly(), best, best, best, playRandomly(), best, playRandomly(), best, best];
    
                compMove = arr[Math.floor(Math.random()*arr.length)];
            }
    
            if (currentPlayer === 'X') {
                boxes[compMove].innerHTML = 'X';
                boxes[compMove].style.color = '#31C4BE';
                gameStatus[compMove] = 'X';
            } else {
                boxes[compMove].innerHTML = 'O';
                boxes[compMove].style.color = '#f2b237';
                gameStatus[compMove] = 'O';
            }
            swap();
            occupiedCells += 1;
            boxes[compMove].style.pointerEvents = 'none';
            possibleIndexForComp = possibleIndexForComp.filter(item => item !== compMove);
        }
    }
}

// For swapping turns
function swap(){
    let currentPlayerEle = document.querySelector('#player-sign');
    if(currentPlayer === 'X'){
        currentPlayerEle.innerHTML = 'O';
        currentPlayer = 'O'
    }
    else{
        currentPlayerEle.innerHTML = 'X';
        currentPlayer = 'X';
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkWin(){
    for(let i=0; i<winningCongfig.length; i++){
        if((gameStatus[winningCongfig[i][0]] !== '' || gameStatus[winningCongfig[i][1]] !== '' || gameStatus[winningCongfig[i][0]] !== '') && ((gameStatus[winningCongfig[i][0]] === gameStatus[winningCongfig[i][1]]) && (gameStatus[winningCongfig[i][1]] === gameStatus[winningCongfig[i][2]]))){
            return true;
        }
    }
    return false;
}

function playRandomly(){
    let compMoveIndex = Math.floor(Math.random() * possibleIndexForComp.length);
    return possibleIndexForComp[compMoveIndex];
}

function findBestMove(){
    // find winning move
    for(let i=0; i<9; i++){
        // console.log(gameStatus[i]);
        if(gameStatus[i] === ''){
            gameStatus[i] = currentPlayer;
            if(checkWin()){
                gameStatus[i] = '';
                return i;
            }
            gameStatus[i] = '';
        }
    }

    // check to block other player's win
    for(let i=0; i<9; i++){
        if(gameStatus[i] === ''){
            gameStatus[i] = currentPlayer === 'X' ? 'O' : 'X';
            if(checkWin()){
                gameStatus[i] = '';
                return i;
            }
            gameStatus[i] = '';
        }
    }

    // try to take the center
    if(gameStatus[4] === ''){
        return 4;
    }

    // take any possible cell
    return playRandomly();
}


// Eventlistener functions
// 1. while playing with computer
async function handleClickComp(index) {
    if (boxes[index].innerHTML === '') {
        // Player's move
        if (currentPlayer === 'X') {
            boxes[index].innerHTML = 'X';
            boxes[index].style.color = '#31C4BE';
            gameStatus[index] = 'X';
        } else {
            boxes[index].innerHTML = 'O';
            boxes[index].style.color = '#f2b237';
            gameStatus[index] = 'O';
        }
        swap();
        occupiedCells += 1;
        boxes[index].style.pointerEvents = 'none';
        if(checkMatchOver(occupiedCells)){
            await delay(800);
            checkGameOver();
            return;
        }

        // console.log(`Number of occupied cells: ${occupiedCells}`);
        // Computer move
        await delay(200);
        let compMove;
        possibleIndexForComp = possibleIndexForComp.filter(item => item !== index);
        if(difficultyLevel === 'difficult'){
            compMove = findBestMove();
        }
        else{
            let best = findBestMove();
            let arr = [best, playRandomly(), best, best, best, playRandomly(), best, playRandomly(), best, best];

            compMove = arr[Math.floor(Math.random()*arr.length)];
        }

        if (currentPlayer === 'X') {
            boxes[compMove].innerHTML = 'X';
            boxes[compMove].style.color = '#31C4BE';
            gameStatus[compMove] = 'X';
        } else {
            boxes[compMove].innerHTML = 'O';
            boxes[compMove].style.color = '#f2b237';
            gameStatus[compMove] = 'O';
        }
        swap();
        occupiedCells += 1;
        boxes[compMove].style.pointerEvents = 'none';
        possibleIndexForComp = possibleIndexForComp.filter(item => item !== compMove);
        if(checkMatchOver(occupiedCells)){
            await delay(800);
            checkGameOver();
            return;
        }
    }
}

async function handleClickMulti(index){
    if(boxes[index].innerHTML === ''){
        if (currentPlayer === 'X') {
            boxes[index].innerHTML = 'X';
            boxes[index].style.color = '#31C4BE';
            gameStatus[index] = 'X';
        }
        else {
            boxes[index].innerHTML = 'O';
            boxes[index].style.color = '#f2b237';
            gameStatus[index] = 'O';
        }
        swap();
        occupiedCells += 1;
        boxes[index].style.pointerEvents = 'none';
        if(checkMatchOver(occupiedCells)){
            await delay(800);
            checkGameOver();
            return;
        }
    }
}

function startNewGame(){
    initGame();
    roundNumberEle.innerHTML = '1';
    overGridMenuRemoveHide();
    gameLayoutRemoveHide();
    roundNumberDivRemoveHide();
    gameOverMenuRemoveActive();
}

function backToMenu(){
    form2.reset();
    form1.reset();
    document.getElementById('playWithComp').checked = false;
    document.getElementById('multiplayer').checked = false;
    showMenu();
}
