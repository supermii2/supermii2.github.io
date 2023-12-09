NUM_POCKETS = 6;
STARTING_POCKET_VALUE = 4;
STARTING_STORE_VALUE = 0;

var board;

initialiseBoard();
renderBoard();

function initialiseBoard(){
    board = {
        pockets: [Array(NUM_POCKETS).fill(STARTING_POCKET_VALUE),
             Array(NUM_POCKETS).fill(STARTING_POCKET_VALUE)],
        stores: [STARTING_STORE_VALUE, STARTING_STORE_VALUE],
        turn: false,
    };
}

function isValidMove(player, moveNum) {
    if (player != board.turn || board.pockets[player][moveNum] == 0) return false;
    return true;
}

function isWinningPosition() {
    return !(board.pockets[0].reduce((partialSum, a) => partialSum + a, 0) 
    && board.pockets[1].reduce((partialSum, a) => partialSum + a, 0));
}

function handleMoveFinish(currentPlayer, currentMoveNum) {
    if (currentMoveNum != NUM_POCKETS) {
        if (board.pockets[currentPlayer][currentMoveNum] == 1 && board.turn == currentPlayer) {
            board.pockets[currentPlayer][currentMoveNum] += board.pockets[1 - currentPlayer][NUM_POCKETS - currentMoveNum - 1];
            board.pockets[1 - currentPlayer][NUM_POCKETS - currentMoveNum - 1] = 0;
        }
        board.turn = 1 - board.turn;
    }
}

function handleGameWin() {
    board.stores[0] += board.pockets[0].reduce((partialSum, a) => partialSum + a, 0);
    board.stores[1] += board.pockets[1].reduce((partialSum, a) => partialSum + a, 0);

    for (var i = 0; i < NUM_POCKETS; i++) {
        board.pockets[0][i] = 0;
        board.pockets[1][i] = 0;
    }
}

function playMove(currentPlayer, currentMoveNum, stones) {
    if (currentMoveNum == NUM_POCKETS) {
        if (board.turn == currentPlayer) {
            board.stores[currentPlayer]++;
            if (stones == 1) handleMoveFinish(currentPlayer, currentMoveNum);
            else playMove(1 - currentPlayer, 0, stones - 1);
        } else {
            playMove(1 - currentPlayer, 0, stones);
        }
    } else {
        board.pockets[currentPlayer][currentMoveNum]++;
        if (stones == 1) handleMoveFinish(currentPlayer, currentMoveNum);
        else playMove(currentPlayer, currentMoveNum + 1, stones - 1);
    }
}

function tryToPlayMove(player, moveNum) {

    if (!isValidMove(player, moveNum)) return;
    var stones = board.pockets[player][moveNum];
    board.pockets[player][moveNum] = 0;
    playMove(player, moveNum + 1, stones);
    
    if(isWinningPosition()) handleGameWin();

    renderBoard()
}

function renderBoard() {
    document.getElementById("aStorage").innerHTML=board.stores[0];
    document.getElementById("bStorage").innerHTML=board.stores[1];
    
    for (var i = 0; i < NUM_POCKETS; i++) {
        document.getElementById("a" + i).innerHTML = board.pockets[0][i];
        document.getElementById("b" + i).innerHTML = board.pockets[1][i];
    }
    
    document.getElementById("info").innerHTML = `It is player ${board.turn + 1}'s turn to play!`;
}