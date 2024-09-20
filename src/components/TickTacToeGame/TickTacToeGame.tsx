import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  Typography,
} from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import './TickTacToeGame.css';

import { IButtonColor, IHistory, IWinner } from '../../types/ticTacToe';
import { calculateWinner } from '../utils/calculateWinner';
import { getLocation } from '../utils/getLocation';
import GameGrid from '../GameGrid/GameGrid';
import { getRandomIndex } from '../utils/getRandomIndex';

const initialHistory: IHistory[] = [
  {
    squares: Array(9).fill(null),
    currentLocation: '',
    stepNumber: 0,
  },
];

const initialWinner: IWinner = {
  winner: null,
  winnerRow: null,
};

const TickTacToeGame = () => {
  const [history, setHistory] = useState<IHistory[]>(initialHistory);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [{ winner, winnerRow }, setWinner] = useState<IWinner>(initialWinner);
  const [isPlayWithComputer, setIsPlayWithComputer] = useState<boolean>(false);

  useEffect(() => {
    setWinner(calculateWinner(history[currentStepNumber]?.squares) as IWinner);
  }, [history, currentStepNumber]);

  const handleClick = (i: number): void => {
    const gameHistory: IHistory[] = history.slice(0, currentStepNumber + 1);
    const current: IHistory = history[history.length - 1];
    const squares: (string | null)[] = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    const currentLocation: string = getLocation(i);

    const userClick: IHistory[] = [
      {
        squares,
        currentLocation,
        stepNumber: history.length,
      },
    ];

    const winner: string | null = calculateWinner(squares).winner;
    
    const isPCTurn: boolean =
      isPlayWithComputer && !winner && history.length < 9;

    if (isPCTurn) {
      const emptyIndexes: number[] = [];

      const handleEmptyIndexes = (
        square: string | null,
        index: number,
      ): void => {
        if (square === null) {
          emptyIndexes.push(index);
        }
      };

      const squareCopy: Array<string | null> = squares.slice();

      squareCopy.forEach(handleEmptyIndexes);

      const randomIndex: number = getRandomIndex(emptyIndexes.length);
      const randomElement: number = emptyIndexes[randomIndex];

      squareCopy[randomElement] = !xIsNext ? 'X' : 'O';

      const currentLocation: string = getLocation(randomElement);

      setHistory(() => [
        ...history,
        ...userClick,
        {
          squares: squareCopy,
          currentLocation,
          stepNumber: history.length + 1,
        },
      ]);

      setCurrentStepNumber(gameHistory.length + 1);
      return;
    }

    setHistory(() => [...history, ...userClick]);
    setCurrentStepNumber(gameHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setCurrentStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const reset = (): void => {
    setHistory(initialHistory);
    setCurrentStepNumber(0);
    setXIsNext(true);
  };

  const getGameStatus = (): string => {
    let status;
    if (winner) {
      status = `🎊 Winner ${winner} 🎊`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return status;
  };

  const moves = (): JSX.Element[] => {
    const handleRenderHistory = (step: IHistory, move: number): JSX.Element => {
      const currentLocation: string = step.currentLocation
        ? `(${step.currentLocation})`
        : '';
      const desc: string = step.stepNumber
        ? `Move #${step.stepNumber}`
        : "Let's go🚀";
      const classButton: IButtonColor =
        move === currentStepNumber
          ? 'secondary'
          : !step.stepNumber
          ? 'success'
          : 'primary';

      return (
        <Box key={move}>
          <ListItem
            sx={{ display: 'flex', alignItems: 'center', width: '258px' }}
            onClick={() => jumpTo(move)}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'white' }}>
                <ExpandCircleDownIcon fontSize="large" color={classButton} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${desc} ${currentLocation}`} />
          </ListItem>
          <Divider variant="middle" component="li" />
        </Box>
      );
    };

    return history.map(handleRenderHistory);
  };

  return (
    <>
      <Typography variant="h1" className="title">
        Tic Tac Toe
      </Typography>
      <Typography sx={{ marginBottom: 6 }} variant="h2" className="subtitle">
        Have fun! 😎
      </Typography>
      <Box className="game">
        <Box>
          <GameGrid
            squares={history[currentStepNumber]?.squares || Array(9).fill(null)}
            winnerSquares={winnerRow}
            onClick={(i: number) => handleClick(i)}
          />
          <FormControlLabel
            labelPlacement="bottom"
            control={
              <Switch
                disabled={history.length > 1}
                value={isPlayWithComputer}
                onChange={() => setIsPlayWithComputer(prev => !prev)}
              />
            }
            label="Play vs Computer"
          />
        </Box>
        <Box className="game-info">
          <Typography sx={{ marginBottom: 2, fontSize: 24 }} variant="h3">
            {getGameStatus()}
          </Typography>
          <Button onClick={() => reset()} variant="contained">
            New game
          </Button>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {moves()}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default TickTacToeGame;
