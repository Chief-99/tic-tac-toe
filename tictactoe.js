const cells = document.querySelectorAll('.cell');
const dialog = document.getElementById('win-dialog');
const winMessage = document.getElementById('win-message');

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

    console.log(board);

    return { setCell, getCell, board };
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
        console.log(gameboard.board);
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
            playTurn(horz, vert);
            target.textContent = currentSymbol;
            checkGame();
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
                alert(`Congratulations player ${currentTurn}, you have won the game!!!`);
                return;
            } else if (
                cell(0, i) === cell(1, i) &&
                cell(1, i) === cell(2, i) &&
                cell(0, i) !== ''
            ) {
                alert(`Congratulations player ${currentTurn}, you have won the game!!!`);
                return;
            } else if (
                (cell(0, 0) === cell(1, 1) &&
                cell(1, 1) === cell(2, 2)) &&
                cell(0, 0) !== '' ||
                (cell(0, 2) === cell(1, 1) &&
                cell(1, 1) === cell(2, 0)) &&
                cell(2, 0) !== ''
            ) {
                alert(`Congratulations player ${currentTurn}, you have won the game!!!`);
                return;
            }
        }
    }

    return { userTurn };
})();


cells.forEach((cell) => {
    cell.addEventListener('click', gameFlow.userTurn);
})