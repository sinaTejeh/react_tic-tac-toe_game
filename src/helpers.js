import { INITIAL_GAME_BOARD } from "./config.js";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

export const driveActivePlayer = function (turns) {
    let currentPlayer = 'X';
    if (turns.length > 0 && turns[0].player === 'X') currentPlayer = 'O';
    return currentPlayer;
};

export function dirveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
};

export const driveWinner = function (gameBoard, players) {
    let winner;

    WINNING_COMBINATIONS.forEach(combination => {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
            console.log(winner);
        }

    });
    return winner;
};