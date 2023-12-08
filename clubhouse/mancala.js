board = {
    pockets: [[4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4]],
    stores: [0, 0],
};
turn = 0;

function playMove(player, moveNum) {
    if (!isValidMove(player, moveNum)) {
        return;
    }

    var seeds = board.pockets[player][moveNum];
    board.pockets[player][moveNum] = 0;

    var playerTracker = player;
    var moveNumTracker = moveNum;
    while (seeds > 0) {
        if (moveNumTracker == 5) {
            if (playerTracker == player) {
                board.stores[playerTracker]++;
                seeds--;
            }
            moveNumTracker++;
        } else if (moveNumTracker >= 6) {
            playerTracker = +!playerTracker;
            moveNumTracker = 0;
            board.pockets[playerTracker][moveNumTracker]++;
            seeds--;
        } else {
            moveNumTracker++;
            board.pockets[playerTracker][moveNumTracker]++;
            seeds--;
        }
    }

    if (board.pockets[playerTracker][moveNumTracker] == 1 && playerTracker == player) {
        s = 1 + board.pockets[+!player][5 - moveNumTracker];
        board.stores[player] += s;
        board.pockets[+!player][5 - moveNumTracker] = 0;
        board.pockets[player][moveNumTracker] = 0;
    }

    if (checkWin()) {
        board.stores[0] += board.pockets[0].reduce((partialSum, a) => partialSum + a, 0);
        board.pockets[0] = [0, 0, 0, 0, 0, 0];
        board.stores[1] += board.pockets[1].reduce((partialSum, a) => partialSum + a, 0);
        board.pockets[1] = [0, 0, 0, 0 ,0, 0];
    }

    if (moveNumTracker == 6) {
        turn = turn;
    } else {
        turn = +!turn;
    }

    updateBoard()
}

function initialise(){
    board = {
        pockets: [[4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4]],
        stores: [0, 0],
    };
    turn = 0;
}


function isValidMove(player, moveNum) {
    if (player != turn) {
        return false;
    } else if (board.pockets[player][moveNum] == 0) {
        return false;
    } else {
        return true;
    }
}

function checkWin() {
    if (board.pockets[0].reduce((partialSum, a) => partialSum + a, 0) == 0 || board.pockets[1].reduce((partialSum, a) => partialSum + a, 0) == 0) {
        return true;
    } else {
        return false;
    }
}

function updateBoard() {
    document.getElementById("aStorage").innerHTML=board.stores[0]
    document.getElementById("bStorage").innerHTML=board.stores[1]
    
    for (var i = 0; i < board.pockets[0].length; i++) {
        document.getElementById("a" + i).innerHTML = board.pockets[0][i]
        document.getElementById("b" + i).innerHTML = board.pockets[1][i]        
    }

}