function runSquaredleSolver() {
    // GET SQUAREDLE BOARD
    const board = document.getElementById("output").innerHTML
    function solveBoard(wordList, board) {
        function parseSquaredleBoard(boardString) {
            if (boardString == "") {
                return [];
            }
            var parsedBoard = [];
            var currentRow = [];
            for (let i = 0; i < boardString.length; i++) {
                if (boardString[i] == "\n") {
                    parsedBoard.push(currentRow);
                    currentRow = []
                } else {
                    currentRow.push(boardString[i])
                }
            }
            parsedBoard.push(currentRow);
            return parsedBoard;
        }

        function createArray(m, n) {
            const myArray = [];
            for (let i = 0; i < m; i++) {
            const row = [];
            for (let j = 0; j < n; j++) {
                row.push(false);
            }
            myArray.push(row);
            }
            return myArray;
        }

        squaredleBoard = parseSquaredleBoard(board);
        height = squaredleBoard.length;
        length = squaredleBoard[0].length;
        visited = createArray(height, length);
        const answers = new Set();

        const SEARCH_DIRECTIONS = [[-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]];

        const MIN_WORD_SIZE = 4;

        function checkValidCoord(length, height, curr_x, curr_y) {
            return curr_x >= 0 && curr_x < length && curr_y >=0 && curr_y < height;
        }
        function DFS(board, visited, currentNode, currentWord, length, height, curr_x, curr_y) {
            if (currentNode.hasOwnProperty("isEnd") && currentWord.length >= MIN_WORD_SIZE) {
                answers.add(currentWord);
            }

            visited[curr_y][curr_x] = true;

            for (let i = 0; i < SEARCH_DIRECTIONS.length; i++) {
                var new_curr_x = curr_x + SEARCH_DIRECTIONS[i][0];
                var new_curr_y = curr_y + SEARCH_DIRECTIONS[i][1];

                if (checkValidCoord(length, height, new_curr_x, new_curr_y) &&
                currentNode.hasOwnProperty(board[new_curr_y][new_curr_x]) &&
                !visited[new_curr_y][new_curr_x]) {
                    newLetter = board[new_curr_y][new_curr_x];
                    DFS(board, visited, currentNode[newLetter], currentWord + newLetter, length, height, new_curr_x, new_curr_y);
                } 
            }
            visited[curr_y][curr_x] = false        
        }

        function solveBoard() {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < height; j++) {
                    DFS(squaredleBoard, visited, wordList[squaredleBoard[j][i]], squaredleBoard[j][i], length, height, i, j)
                }
            }
        }
        solveBoard();
        const output = Array.from(answers).sort().join(", ")
        return output;
    }
    fetch("output.json")
    .then(data => solveBoard(data, board))
    .then(data => {
        const outputElement = document.getElementById('output');
        outputElement.textContent = data;
      });
}
