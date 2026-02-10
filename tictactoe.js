const gameboard = (function() {
    let board = [];

    for (let i = 0; i < 3; i++) {
        board.push([]);

        for (let j = 0; j < 3; j++) {
            board[i].push('0');
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
    return {name, symbol };
}

const player1 = createPlayer('Milo', 'X');
const player2 = createPlayer('Lungz', 'O');