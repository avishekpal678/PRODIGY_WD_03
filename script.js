let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementById(`cell-${index}`).classList.add(currentPlayer.toLowerCase());
        checkResult();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkResult() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCells = winCondition;
            break;
        }
    }

    if (roundWon) {
        highlightWinningCells(winningCells);
        message.innerText = `Congratulations! ${currentPlayer} Wins!`;
        message.classList.add('win');
        winSound.play();
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        message.innerText = "Opps! Match Draw!";
        message.classList.add('draw');
        drawSound.play();
        gameActive = false;
    }
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        document.getElementById(`cell-${index}`).classList.add('highlight');
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.innerText = "";
    message.className = "";
    cells.forEach(cell => {
        cell.className = 'cell';
    });
}
