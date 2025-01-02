import React from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log.jsx";
import {
  deriveWinner,
  deriveGameBoard,
  deriveActivePlayer,
} from "./components/GameInitialSet";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [players, setPlayers] = React.useState(PLAYERS);
  const [gameTurns, setGameTurns] = React.useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(row, col) {
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updateTurns = [
        { square: { row: row, col: col }, player: currentPlayer },
        ...prevTurn,
      ];

      return updateTurns;
    });
  }

  function handleGameRestart() {
    setGameTurns([]);
  }

  function handlerPlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlerPlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlerPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleGameRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
