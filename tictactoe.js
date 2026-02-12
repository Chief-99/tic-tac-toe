const cells = document.querySelectorAll('.cell');

const gameboard = (function() {
    let board = [];

    for (let i = 0; i < 3; i++) {
        board.push([]);

        for (let j = 0; j < 3; j++) {
            board[i].push(' ');
        }
    }

    const setCell = function(horizontal, vertical, symbol) {
        board[horizontal][vertical] = symbol;
        return;
    }

    console.log(board);

    return { setCell, board };
})();

function createPlayer(name, symbol) {
    const getSymbol = () => symbol;
    return {name, getSymbol };
}

const player1 = createPlayer('Milo', 'X');
const player2 = createPlayer('Lungz', 'O');

const gameFlow = (function() {
    let random = Math.random();

    function initialTurn(random) {
        return random < 0.5 ? 1 : 2;
    }

    let currentTurn = initialTurn(random);

    const symbolOne = player1.getSymbol();
    const symbolTwo = player2.getSymbol();

    function playTurn(horz, vert) {
        let current = currentTurn;

        if (current === 1) {
            gameboard.setCell(horz, vert, symbolOne);
            currentTurn = 2;
        } else if (current === 2) {
            gameboard.setCell(horz, vert, symbolTwo);
            currentTurn = 1;
        }
        console.log(gameboard.board);
    }

    return { playTurn };
})();

function userTurn(e) {
    const target = e.target;

    const coordinateArray = target.id.split('-');
    const horz = coordinateArray[0];
    const vert = coordinateArray[1];

    gameFlow.playTurn(horz, vert);
}

cells.forEach((cell) => {
    cell.addEventListener('click', userTurn);
})