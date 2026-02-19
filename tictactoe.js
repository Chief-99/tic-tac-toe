const cells = document.querySelectorAll('.cell');
const dialog = document.getElementById('win-dialog');
const winMessage = document.getElementById('win-message');
const closeButton = document.getElementById('dialog-close-button');
const p1Count = document.querySelector('.player1-count');
const p2Count = document.querySelector('.player2-count');
const drawCount = document.querySelector('.draw-count');
const pageBoard = document.getElementById('board');
const resetButton = document.getElementById('reset-button')
const scoreCount = document.querySelectorAll('.count');

// Where I got the SVGs and the idea:
// Source - https://stackoverflow.com/a/77239269
// Posted by herrstrietzel
// Retrieved 2026-02-19, License - CC BY-SA 4.0
const svg_x = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50">
        <line pathLength="100" class="stroke-line" x1="8.5" y1="8.5" x2="41.5" y2="41.5" />
        <line pathLength="100" class="stroke-line stroke-delayed" x1="41.5" y1="8.5" x2="8.5" y2="41.5" />
    </svg>
`;

const svg_o = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50">
        <circle class="stroke-circle" pathLength="100" cx="25" cy="25" r="18" transform="rotate(-90) scale(1 -1)" transform-origin="25 25" />
    </svg>
`;

const gameboard = (function () {
    let board = [];

    for (let i = 0; i < 3; i++) {
        board.push([]);

        for (let j = 0; j < 3; j++) {
            board[i].push('');
        }
    }

    const setCell = function (horizontal, vertical, symbol) {
        board[horizontal][vertical] = symbol;
        return;
    }

    const getCell = function (horizontal, vertical) {
        return board[horizontal][vertical];
    }

    const clearBoard = function () {
        board.forEach((elem) => {
            elem.forEach((element, index) => elem[index] = '');
            cells.forEach((cell) => cell.textContent = '');
        });
    }

    const getBoard = function () {
        return board;
    }

    console.log(board);

    return { setCell, getCell, clearBoard, getBoard };
})();

function createPlayer(name, symbol) {
    const getSymbol = () => symbol;
    return { name, getSymbol };
}

const player1 = createPlayer('Milo', 'X');
const player2 = createPlayer('Lungz', 'O');

const gameFlow = (function () {
    let random = Math.random();
    let score = {
        player1: 0,
        player2: 0,
        draw: 0,
    };

    function resetScore () {
        score.draw = 0;
        score.player1 = 0;
        score.player2 = 0;
        gameboard.clearBoard();
        scoreCount.forEach((score) => score.textContent = 0);
    }

    function initialTurn(random) {
        return random < 0.5 ? 1 : 2;
    }

    let currentTurn = initialTurn(random);
    let currentTurnDisplay = currentTurn;

    const symbolOne = player1.getSymbol();
    const symbolTwo = player2.getSymbol();
    let currentSymbol;

    function playTurn(horz, vert) {
        if (currentTurn === 1) {
            currentSymbol = svg_x;
            gameboard.setCell(horz, vert, symbolOne);
            currentTurn = 2;
        } else if (currentTurn === 2) {
            currentSymbol = svg_o;
            gameboard.setCell(horz, vert, symbolTwo);
            currentTurn = 1;
        }
        console.log(gameboard.getBoard());
    }

    function userTurn(e) {
        const target = e.target;

        const coordinateArray = target.id.split('-');
        const horz = coordinateArray[0];
        const vert = coordinateArray[1];
        console.log(gameboard.getCell(horz, vert))

        if (target.textContent) {
            return;
        } else {
            currentTurnDisplay = currentTurn;
            playTurn(horz, vert);
            target.innerHTML = currentSymbol;
            checkGame();
            checkDraw(gameboard.getBoard());
            return;
        }

    }

    function checkGame() {
        let cell = gameboard.getCell;

        for (let i = 0; i < 3; i++) {
            if (
                cell(i, 0) === cell(i, 1) &&
                cell(i, 1) === cell(i, 2) &&
                cell(i, 2) !== ''
            ) {
                displayVictor('winner');
                return;
            } else if (
                cell(0, i) === cell(1, i) &&
                cell(1, i) === cell(2, i) &&
                cell(0, i) !== ''
            ) {
                displayVictor('winner');
                return;
            } else if (
                (cell(0, 0) === cell(1, 1) &&
                    cell(1, 1) === cell(2, 2)) &&
                cell(0, 0) !== '' ||
                (cell(0, 2) === cell(1, 1) &&
                    cell(1, 1) === cell(2, 0)) &&
                cell(2, 0) !== ''
            ) {
                displayVictor('winner');
                return;
            }
        }
    }

    function checkDraw(board) {
        let draw;
        let length = 0;

        for (let i = 0; i < 3; i++) {
            draw = board[i].filter(cell => cell === '');
            length += draw.length;
        }

        if (length === 0) {
            displayVictor('draw');
        }
        return;
    }

    function displayVictor(outcome) {
        setTimeout(() => dialog.showModal(), 1100);

        if (outcome === 'winner') {
            winMessage.textContent = `Congratulations player ${currentTurnDisplay}, you won the game!!!`;
            score[`player${currentTurnDisplay}`]++;

            setTimeout(() => {
                if (currentTurnDisplay === 1) {
                    p1Count.textContent = score.player1;
                } else {
                    p2Count.textContent = score.player2;
                }
            }, 1100);
            
        } else if (outcome === 'draw') {
            winMessage.textContent = `Both players are evenly matched! Please play again.`;
            score.draw++;
            setTimeout(() => {
                drawCount.textContent = score.draw;
            }, 1100);
        }

        pageBoard.classList.toggle('unclickable');

    }
    
    return { userTurn, resetScore };
})();

closeButton.addEventListener('click', () => dialog.close());

dialog.addEventListener('close', () => {
    gameboard.clearBoard();
    pageBoard.classList.toggle('unclickable');
});

cells.forEach((cell) => {
    cell.addEventListener('click', gameFlow.userTurn);
})

resetButton.addEventListener('click', gameFlow.resetScore);