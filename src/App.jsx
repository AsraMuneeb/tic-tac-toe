import { useState } from 'react'
import gif1 from './assets/gif1.mp4'
import aud1 from './assets/aud1.mp3'
import heading from "./assets/title.png"
import './App.css'
import Players from './components/players.jsx'
import Log from './components/log.jsx'
import Board from './components/board.jsx'
import GameOver from './components/GameOver.jsx'
import {WINNING_COMBINATIONS} from './winning-combinations.js'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActive(rowIndex, colIndex){
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square:{row: rowIndex, col: colIndex}, player : currentPlayer}, ...prevTurns,
      ]
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <div className='main'>
      <img src={heading}/>
      <h1>GAME BOARD</h1>
      <div className='game-box'>
      <ul className='list'>
        <Players 
        initialName={PLAYERS.X}
        symbol="X"
        isActive={activePlayer === 'X'}
        onChangeName={handlePlayerNameChange}
        ></Players>
        <Players 
        initialName={PLAYERS.O}
        symbol="O"
        isActive={activePlayer === 'O'}
        onChangeName={handlePlayerNameChange}
        ></Players>
      </ul>
      {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <Board onSelectSquare={handleActive} board={gameBoard} />
    </div>
    <video src={gif1} autoPlay loop muted></video>
    {/* <Log turns={gameTurns}/> */}
    {/* <audio src={aud1} type="audio/mpeg" autoPlay loop >
    </audio> */}
    </div>
  )
}

export default App;
