import React, { FC } from 'react';
import ClickableSquare from '../ClickableSquare/ClickableSquare';
import { Box } from '@mui/material';

import './GameGrid.css';

interface IProps {
  winnerSquares: Array<number> | null;
  squares: Array<string | null>;
  onClick: (i: number) => void;
}

type WinnerClass = 'square--green' | '';

const GameGrid: FC<IProps> = ({ winnerSquares, squares, onClick }) => {
  const createBoard = (row: number, col: number) => {
    const board: JSX.Element[] = [];
    let cellCounter = 0;

    for (let i = 0; i < row; i += 1) {
      const columns = [];
      for (let j = 0; j < col; j += 1) {
        columns.push(renderSquare(cellCounter++));
      }
      board.push(
        <Box key={i} className="board-row">
          {columns}
        </Box>,
      );
    }

    return board;
  };

  const renderSquare = (i: number) => {
    const winnerClass: WinnerClass =
      winnerSquares &&
      (winnerSquares[0] === i ||
        winnerSquares[1] === i ||
        winnerSquares[2] === i)
        ? 'square--green'
        : '';

    return (
      <ClickableSquare
        winnerClass={winnerClass}
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };
  return <>{createBoard(3, 3)}</>;
};

export default GameGrid;
