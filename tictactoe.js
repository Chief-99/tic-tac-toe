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

    return { setCell };
})();

function createPlayer(name, symbol) {
    const getSymbol = () => symbol;
    return {name, getSymbol };
}

const player1 = createPlayer('Milo', 'X');
const player2 = createPlayer('Lungz', 'O');

console.log(player1);