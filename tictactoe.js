const cells = document.querySelectorAll('.cell');
const dialog = document.getElementById('win-dialog');
const winMessage = document.getElementById('win-message');
const closeButton = document.getElementById('dialog-close-button');

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
            currentSymbol = symbolOne;
            gameboard.setCell(horz, vert, symbolOne);
            currentTurn = 2;
        } else if (currentTurn === 2) {
            currentSymbol = symbolTwo;
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
            target.textContent = currentSymbol;
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
        dialog.showModal();

        if (outcome === 'winner') {
            winMessage.textContent = `Congratulations player ${currentTurnDisplay}, you won the game!!!`;
        } else if (outcome === 'draw') {
            winMessage.textContent = `Both players are evenly matched! Please play again.`;
        }

        dialog.addEventListener('close', () => {
            cells.forEach((cell) => cell.textContent = '');
            gameboard.clearBoard();
            console.log(gameboard.getBoard());
        });
    }

    return { userTurn };
})();

closeButton.addEventListener('click', () => dialog.close());

cells.forEach((cell) => {
    cell.addEventListener('click', gameFlow.userTurn);
})