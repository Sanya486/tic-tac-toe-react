import React, { useEffect, useRef, useState } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import { getLocation } from '../utils/getLocation';
import GameGrid from '../GameGrid/GameGrid';

const initialHistory = [
  {
    squares: Array(9).fill(null),
    currentLocation: '',
    stepNumber: 0,
  },
];

const initialWinner = {
  winner: null,
  winnerRow: null,
};

const TickTacToeGame = () => {
  const [history, setHistory] = useState(initialHistory);
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [{ winner, winnerRow }, setWinner] = useState(initialWinner);
  const [isTwoPlayers, setIsTwoPlayers] = useState(false);
  // const [isComputersTurn, setIsComputersTurn] = useState(true);

  const isComputersTurn = useRef(true);

  useEffect(() => {
    setWinner(calculateWinner(history[currentStepNumber]?.squares) as any);
  }, [history, currentStepNumber]);

  const handleClick = (i: number) => {
    const gameHistory = history.slice(0, currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    const currentLocation = getLocation(i);

    const historyAfterUserClick = [
      ...history,
      {
        squares,
        currentLocation,
        stepNumber: history.length,
      },
    ];

    if (!isTwoPlayers) {
      const emptyIndexes: number[] = [];

      squares.forEach((square, index) => {
        if (square === null) {
          emptyIndexes.push(index);
        }
      });

      console.log('emptyIndexes :', emptyIndexes);

      const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
      const randomElement = emptyIndexes[randomIndex];

      squares[randomElement] = !xIsNext ? 'X' : 'O';

      const currentLocation = getLocation(randomElement);
      console.log('currentLocation :', currentLocation);

      setHistory(() => [
        ...historyAfterUserClick,
        {
          squares,
          currentLocation,
          stepNumber: historyAfterUserClick.length,
        },
      ]);

      setCurrentStepNumber(gameHistory.length + 1);

      return;
    }

    setHistory(historyAfterUserClick);
    setXIsNext(!xIsNext);
    setCurrentStepNumber(gameHistory.length);
  };

  const jumpTo = (step: number) => {
    setCurrentStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const sortMoves = () => {
    setHistory(history.reverse());
  };

  const reset = () => {
    setHistory(initialHistory);
    setCurrentStepNumber(0);
    setXIsNext(true);
  };

  const getGameStatus = () => {
    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return status;
  };

  const moves = () => {
    return history.map((step, move) => {
      const currentLocation = step.currentLocation
        ? `(${step.currentLocation})`
        : '';
      const desc = step.stepNumber
        ? `Go to move #${step.stepNumber}`
        : 'Go to game start';
      const classButton = move === currentStepNumber ? 'button--green' : '';

      return (
        <li key={move}>
          <button
            className={`${classButton} button`}
            onClick={() => jumpTo(move)}
          >
            {`${desc} ${currentLocation}`}
          </button>
        </li>
      );
    });
  };

  return (
    <>
      <h1 className="title">Tic Tac Toe</h1>
      <h2 className="subtitle">Have fun! 😎</h2>
      <div className="game">
        <div className="game-board">
          <GameGrid
            squares={history[currentStepNumber]?.squares}
            winnerSquares={winnerRow}
            onClick={(i: number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <p>{getGameStatus()}</p>
          <button className="button" onClick={() => sortMoves()}>
            Sort moves
          </button>
          <button className="button button--new-game" onClick={() => reset()}>
            New game
          </button>
          <ol>{moves()}</ol>
        </div>
      </div>
    </>
  );
};

export default TickTacToeGame;
