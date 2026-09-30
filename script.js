/* =========================================================
   TIC TAC TOE - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. GET HTML ELEMENTS
   ========================================================= */

const gameSetup = document.getElementById("game-setup");
const gameSection = document.getElementById("game-section");

const pvpModeBtn = document.getElementById("pvp-mode-btn");
const aiModeBtn = document.getElementById("ai-mode-btn");

const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const impossibleBtn = document.getElementById("impossible-btn");

const symbolXBtn = document.getElementById("symbol-x-btn");
const symbolOBtn = document.getElementById("symbol-o-btn");

const startGameBtn = document.getElementById("start-game-btn");

const turnIndicator = document.getElementById("turn-indicator");

const cells = document.querySelectorAll(".cell");

const restartBtn = document.getElementById("restart-btn");
const newGameBtn = document.getElementById("new-game-btn");

const xScore = document.getElementById("x-score");
const drawScore = document.getElementById("draw-score");
const oScore = document.getElementById("o-score");

const gamesPlayed = document.getElementById("games-played");
const totalWins = document.getElementById("total-wins");
const totalLosses = document.getElementById("total-losses");
const totalDraws = document.getElementById("total-draws");
const winRate = document.getElementById("win-rate");

const historyList = document.getElementById("game-history-list");

const resultModal = document.getElementById("result-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

const playAgainBtn = document.getElementById("play-again-btn");
const modalNewGameBtn = document.getElementById("modal-new-game-btn");

const themeToggle = document.getElementById("theme-toggle");
const soundToggle = document.getElementById("sound-toggle");


/* =========================================================
   2. GAME VARIABLES
   ========================================================= */

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = false;

let gameMode = "pvp";

let difficulty = "easy";

let playerSymbol = "X";

let aiSymbol = "O";

let moveCount = 0;


/* =========================================================
   3. SCORE VARIABLES
   ========================================================= */

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

let playedGames = 0;
let wins = 0;
let losses = 0;
let draws = 0;


/* =========================================================
   4. WINNING COMBINATIONS
   ========================================================= */

const winningCombinations = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


/* =========================================================
   5. STARTING PAGE
   ========================================================= */

gameSection.style.display = "none";


/* =========================================================
   6. PLAYER VS PLAYER BUTTON
   ========================================================= */

pvpModeBtn.addEventListener("click", function () {

    gameMode = "pvp";

    pvpModeBtn.classList.add("active");
    aiModeBtn.classList.remove("active");

    easyBtn.classList.remove("active");
    mediumBtn.classList.remove("active");
    impossibleBtn.classList.remove("active");

});


/* =========================================================
   7. PLAYER VS AI BUTTON
   ========================================================= */

aiModeBtn.addEventListener("click", function () {

    gameMode = "ai";

    aiModeBtn.classList.add("active");
    pvpModeBtn.classList.remove("active");

    easyBtn.classList.add("active");

    mediumBtn.classList.remove("active");
    impossibleBtn.classList.remove("active");

});


/* =========================================================
   8. EASY BUTTON
   ========================================================= */

easyBtn.addEventListener("click", function () {

    difficulty = "easy";

    easyBtn.classList.add("active");

    mediumBtn.classList.remove("active");
    impossibleBtn.classList.remove("active");

});


/* =========================================================
   9. MEDIUM BUTTON
   ========================================================= */

mediumBtn.addEventListener("click", function () {

    difficulty = "medium";

    mediumBtn.classList.add("active");

    easyBtn.classList.remove("active");
    impossibleBtn.classList.remove("active");

});


/* =========================================================
   10. IMPOSSIBLE BUTTON
   ========================================================= */

impossibleBtn.addEventListener("click", function () {

    difficulty = "impossible";

    impossibleBtn.classList.add("active");

    easyBtn.classList.remove("active");
    mediumBtn.classList.remove("active");

});


/* =========================================================
   11. SELECT X
   ========================================================= */

symbolXBtn.addEventListener("click", function () {

    playerSymbol = "X";

    aiSymbol = "O";

    symbolXBtn.classList.add("active");
    symbolOBtn.classList.remove("active");

});


/* =========================================================
   12. SELECT O
   ========================================================= */

symbolOBtn.addEventListener("click", function () {

    playerSymbol = "O";

    aiSymbol = "X";

    symbolOBtn.classList.add("active");
    symbolXBtn.classList.remove("active");

});


/* =========================================================
   13. START GAME
   ========================================================= */

startGameBtn.addEventListener("click", function () {

    console.log("START GAME BUTTON WORKING");

    /*
       Hide setup screen
    */

    gameSetup.style.display = "none";

    /*
       Show game screen
    */

    gameSection.style.display = "block";

    /*
       Start a fresh game
    */

    startGame();

});


/* =========================================================
   14. START GAME FUNCTION
   ========================================================= */

function startGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    moveCount = 0;

    gameActive = true;

    currentPlayer = "X";

    clearBoard();

    updateTurn();

    /*
       If AI selected O,
       human X starts.

       If AI selected X,
       AI starts.
    */

    if (gameMode === "ai" && playerSymbol === "O") {

        currentPlayer = "X";

        updateTurn();

    }

    else if (gameMode === "ai" && playerSymbol === "X") {

        currentPlayer = "X";

        updateTurn();

        setTimeout(function () {

            aiMove();

        }, 500);

    }

}


/* =========================================================
   15. CLEAR BOARD
   ========================================================= */

function clearBoard() {

    cells.forEach(function (cell) {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("X");

        cell.classList.remove("o");
        cell.classList.remove("O");

        cell.classList.remove("winner");
        cell.classList.remove("winning");

        cell.style.pointerEvents = "auto";

    });

}


/* =========================================================
   16. CELL CLICK
   ========================================================= */

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        if (!gameActive) {

            return;

        }

        /*
           Get cell number.

           Example:

           cell-0 -> 0
           cell-1 -> 1
           cell-2 -> 2
        */

        const index =
            parseInt(cell.id.replace("cell-", ""));

        /*
           Don't allow an occupied cell
        */

        if (board[index] !== "") {

            return;

        }

        /*
           In AI mode, player cannot play
           while AI's turn is happening.
        */

        if (
            gameMode === "ai" &&
            currentPlayer !== playerSymbol
        ) {

            return;

        }

        makeMove(index, currentPlayer);

        /*
           If game ended, don't continue.
        */

        if (!gameActive) {

            return;

        }

        /*
           Change player
        */

        switchPlayer();

        /*
           If AI mode and it is AI's turn,
           let AI play.
        */

        if (
            gameMode === "ai" &&
            currentPlayer === aiSymbol
        ) {

            setTimeout(function () {

                aiMove();

            }, 500);

        }

    });

});


/* =========================================================
   17. MAKE MOVE
   ========================================================= */

function makeMove(index, player) {

    /*
       Store X or O in board
    */

    board[index] = player;

    moveCount++;

    /*
       Display X or O
    */

    const cell =
        document.getElementById("cell-" + index);

    cell.textContent = player;

    /*
       Add CSS class
    */

    if (player === "X") {

        cell.classList.add("x");
        cell.classList.add("X");

    }

    else {

        cell.classList.add("o");
        cell.classList.add("O");

    }

    /*
       Check winner
    */

    const winningLine = findWinner();

    if (winningLine !== null) {

        finishGame(player, winningLine);

        return;

    }

    /*
       Check draw
    */

    if (moveCount === 9) {

        finishGame("draw", null);

        return;

    }

}


/* =========================================================
   18. SWITCH PLAYER
   ========================================================= */

function switchPlayer() {

    if (currentPlayer === "X") {

        currentPlayer = "O";

    }

    else {

        currentPlayer = "X";

    }

    updateTurn();

}


/* =========================================================
   19. UPDATE TURN DISPLAY
   ========================================================= */

function updateTurn() {

    if (!gameActive) {

        return;

    }

    if (gameMode === "ai") {

        if (currentPlayer === playerSymbol) {

            turnIndicator.textContent =
                "Your Turn - " + playerSymbol;

        }

        else {

            turnIndicator.textContent =
                "AI Turn - " + aiSymbol;

        }

    }

    else {

        turnIndicator.textContent =
            "Player " + currentPlayer + "'s Turn";

    }

}


/* =========================================================
   20. FIND WINNER
   ========================================================= */

function findWinner() {

    for (
        let i = 0;
        i < winningCombinations.length;
        i++
    ) {

        const combination =
            winningCombinations[i];

        const a = combination[0];

        const b = combination[1];

        const c = combination[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            return combination;

        }

    }

    return null;

}


/* =========================================================
   21. FINISH GAME
   ========================================================= */

function finishGame(result, winningLine) {

    gameActive = false;

    /*
       Stop clicking cells
    */

    cells.forEach(function (cell) {

        cell.style.pointerEvents = "none";

    });


    /* --------------------------------
       DRAW
    -------------------------------- */

    if (result === "draw") {

        scoreDraw++;

        draws++;

        playedGames++;

        resultTitle.textContent = "DRAW!";

        resultMessage.textContent =
            "Nobody won this game.";

    }


    /* --------------------------------
       X OR O WON
    -------------------------------- */

    else {

        /*
           Update score
        */

        if (result === "X") {

            scoreX++;

        }

        else {

            scoreO++;

        }

        playedGames++;


        /*
           AI GAME
        */

        if (gameMode === "ai") {

            if (result === playerSymbol) {

                wins++;

                resultTitle.textContent =
                    "YOU WIN!";

                resultMessage.textContent =
                    "Congratulations! You defeated the AI.";

            }

            else {

                losses++;

                resultTitle.textContent =
                    "AI WINS!";

                resultMessage.textContent =
                    "The AI won this game.";

            }

        }


        /*
           PVP GAME
        */

        else {

            resultTitle.textContent =
                "PLAYER " + result + " WINS!";

            resultMessage.textContent =
                "Player " + result +
                " completed the winning line.";

        }

    }


    /*
       Highlight winning cells
    */

    if (winningLine !== null) {

        for (let i = 0; i < winningLine.length; i++) {

            const index = winningLine[i];

            const cell =
                document.getElementById(
                    "cell-" + index
                );

            cell.classList.add("winner");
            cell.classList.add("winning");

        }

    }


    /*
       Update everything
    */

    updateScores();

    updateStatistics();

    showResult();

}


/* =========================================================
   22. UPDATE SCOREBOARD
   ========================================================= */

function updateScores() {

    xScore.textContent = scoreX;

    drawScore.textContent = scoreDraw;

    oScore.textContent = scoreO;

}


/* =========================================================
   23. UPDATE STATISTICS
   ========================================================= */

function updateStatistics() {

    gamesPlayed.textContent =
        playedGames;

    totalWins.textContent =
        wins;

    totalLosses.textContent =
        losses;

    totalDraws.textContent =
        draws;


    let percentage = 0;

    if (playedGames > 0) {

        percentage =
            (wins / playedGames) * 100;

    }

    winRate.textContent =
        percentage.toFixed(1) + "%";

}


/* =========================================================
   24. SHOW RESULT MODAL
   ========================================================= */

function showResult() {

    /*
       Your HTML uses <dialog>.
    */

    if (resultModal.showModal) {

        resultModal.showModal();

    }

    else {

        resultModal.style.display = "flex";

    }

}


/* =========================================================
   25. CLOSE RESULT MODAL
   ========================================================= */

function closeResult() {

    if (resultModal.close) {

        resultModal.close();

    }

    else {

        resultModal.style.display = "none";

    }

}


/* =========================================================
   26. CLOSE BUTTON
   ========================================================= */

closeModalBtn.addEventListener("click", function () {

    closeResult();

});


/* =========================================================
   27. PLAY AGAIN
   ========================================================= */

playAgainBtn.addEventListener("click", function () {

    closeResult();

    startGame();

});


/* =========================================================
   28. NEW GAME
   ========================================================= */

newGameBtn.addEventListener("click", function () {

    gameSection.style.display = "none";

    gameSetup.style.display = "block";

    gameActive = false;

    closeResult();

});


/* =========================================================
   29. MODAL NEW GAME
   ========================================================= */

modalNewGameBtn.addEventListener("click", function () {

    closeResult();

    gameSection.style.display = "none";

    gameSetup.style.display = "block";

    gameActive = false;

});


/* =========================================================
   30. RESTART GAME
   ========================================================= */

restartBtn.addEventListener("click", function () {

    closeResult();

    startGame();

});


/* =========================================================
   31. EASY AI
   ========================================================= */

function easyAI() {

    /*
       Find all empty cells
    */

    let emptyCells = [];

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            emptyCells.push(i);

        }

    }

    /*
       Pick random empty cell
    */

    const randomIndex =
        Math.floor(
            Math.random() * emptyCells.length
        );

    return emptyCells[randomIndex];

}


/* =========================================================
   32. FIND WINNING MOVE
   ========================================================= */

function findWinningMove(player) {

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            /*
               Temporarily place player
            */

            board[i] = player;

            /*
               Check whether this creates a win
            */

            const result = findWinner();

            /*
               Remove temporary move
            */

            board[i] = "";

            if (result !== null) {

                return i;

            }

        }

    }

    return null;

}


/* =========================================================
   33. MEDIUM AI
   ========================================================= */

function mediumAI() {

    /*
       1. Try to win
    */

    let move =
        findWinningMove(aiSymbol);

    if (move !== null) {

        return move;

    }


    /*
       2. Block player
    */

    move =
        findWinningMove(playerSymbol);

    if (move !== null) {

        return move;

    }


    /*
       3. Take center
    */

    if (board[4] === "") {

        return 4;

    }


    /*
       4. Take corner
    */

    const corners = [
        0,
        2,
        6,
        8
    ];

    let emptyCorners = [];

    for (let i = 0; i < corners.length; i++) {

        if (board[corners[i]] === "") {

            emptyCorners.push(corners[i]);

        }

    }

    if (emptyCorners.length > 0) {

        const random =
            Math.floor(
                Math.random() *
                emptyCorners.length
            );

        return emptyCorners[random];

    }


    /*
       5. Take random cell
    */

    return easyAI();

}


/* =========================================================
   34. IMPOSSIBLE AI
   MINIMAX
   ========================================================= */

function impossibleAI() {

    let bestScore = -Infinity;

    let bestMove = null;


    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            /*
               Try AI move
            */

            board[i] = aiSymbol;

            /*
               Calculate score
            */

            let score =
                minimax(
                    board,
                    0,
                    false
                );

            /*
               Undo move
            */

            board[i] = "";


            /*
               Keep best move
            */

            if (score > bestScore) {

                bestScore = score;

                bestMove = i;

            }

        }

    }

    return bestMove;

}


/* =========================================================
   35. MINIMAX
   ========================================================= */

function minimax(position, depth, maximizing) {

    /*
       Check current position
    */

    let result =
        evaluatePosition(position);


    /*
       AI won
    */

    if (result === 10) {

        return result - depth;

    }


    /*
       Player won
    */

    if (result === -10) {

        return result + depth;

    }


    /*
       Draw
    */

    if (result === 0) {

        return 0;

    }


    /* --------------------------------
       AI'S TURN
    -------------------------------- */

    if (maximizing) {

        let bestScore = -Infinity;


        for (let i = 0; i < 9; i++) {

            if (position[i] === "") {

                position[i] = aiSymbol;


                let score =
                    minimax(
                        position,
                        depth + 1,
                        false
                    );


                position[i] = "";


                if (score > bestScore) {

                    bestScore = score;

                }

            }

        }

        return bestScore;

    }


    /* --------------------------------
       PLAYER'S TURN
    -------------------------------- */

    else {

        let bestScore = Infinity;


        for (let i = 0; i < 9; i++) {

            if (position[i] === "") {

                position[i] = playerSymbol;


                let score =
                    minimax(
                        position,
                        depth + 1,
                        true
                    );


                position[i] = "";


                if (score < bestScore) {

                    bestScore = score;

                }

            }

        }

        return bestScore;

    }

}


/* =========================================================
   36. EVALUATE BOARD
   ========================================================= */

function evaluatePosition(position) {

    for (
        let i = 0;
        i < winningCombinations.length;
        i++
    ) {

        const combination =
            winningCombinations[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];


        if (
            position[a] !== "" &&
            position[a] === position[b] &&
            position[a] === position[c]
        ) {

            if (position[a] === aiSymbol) {

                return 10;

            }

            if (position[a] === playerSymbol) {

                return -10;

            }

        }

    }


    /*
       Check draw
    */

    let emptyFound = false;

    for (let i = 0; i < 9; i++) {

        if (position[i] === "") {

            emptyFound = true;

            break;

        }

    }

    if (!emptyFound) {

        return 0;

    }


    /*
       Game still running
    */

    return null;

}


/* =========================================================
   37. AI MOVE
   ========================================================= */

function aiMove() {

    if (!gameActive) {

        return;

    }

    if (gameMode !== "ai") {

        return;

    }

    if (currentPlayer !== aiSymbol) {

        return;

    }


    let move;


    /*
       EASY
    */

    if (difficulty === "easy") {

        move = easyAI();

    }


    /*
       MEDIUM
    */

    else if (difficulty === "medium") {

        move = mediumAI();

    }


    /*
       IMPOSSIBLE
    */

    else {

        move = impossibleAI();

    }


    /*
       Make AI move
    */

    if (move !== null) {

        makeMove(move, aiSymbol);

    }


    /*
       If game did not finish,
       switch back to player.
    */

    if (gameActive) {

        switchPlayer();

    }

}


/* =========================================================
   38. THEME BUTTON
   ========================================================= */

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");

});


/* =========================================================
   39. SOUND BUTTON
   ========================================================= */

let soundOn = true;

soundToggle.addEventListener("click", function () {

    soundOn = !soundOn;

    if (soundOn) {

        soundToggle.textContent = "🔊 Sound";

    }

    else {

        soundToggle.textContent = "🔇 Sound";

    }

});


/* =========================================================
   40. INITIAL SETUP
   ========================================================= */

pvpModeBtn.classList.add("active");

symbolXBtn.classList.add("active");

easyBtn.classList.add("active");

console.log("Tic Tac Toe JavaScript loaded successfully!");