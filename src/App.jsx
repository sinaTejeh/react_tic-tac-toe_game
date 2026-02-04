import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const driveActivePlayer = function (turns) {
  let currentPlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') currentPlayer = 'O';
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = driveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(arr => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

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
    }
  });

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectedSquare = function (rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = driveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer
        }
        , ...prevTurns
      ];
      return updatedTurns;
    });
  };

  const handleRematch = function () {
    setGameTurns([]);
  };

  const handlePlayerNameChange = function (symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onSelcetedPlayer={handleSelectedSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
