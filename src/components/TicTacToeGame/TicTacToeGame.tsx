import React, { FC, useEffect, useState } from 'react';
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
import axios from 'axios';

import './TicTacToeGame.css';

import {
  IButtonColor,
  IHistory,
  IRequestBody,
  IResponse,
  IWinner,
} from '../../types/ticTacToe';
import GameGrid from '../GameGrid/GameGrid';

const initialWinner: IWinner = {
  winner: null,
  winnerRow: null,
};

const initialHistory: IHistory[] = [
  {
    squares: Array(9).fill(null),
    currentLocation: '',
    stepNumber: 0,
    winner: initialWinner,
  },
];

const url: string = 'http://localhost:1234/move';

const TicTacToeGame: FC = () => {
  const [history, setHistory] = useState<IHistory[]>(initialHistory);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [{ winner, winnerRow }, setWinner] = useState<IWinner>(initialWinner);
  const [isPlayWithComputer, setIsPlayWithComputer] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (winner || history.length === 10) {
      setGameOver(true);
    }
  }, [winner, history]);

  const handleClick = async (i: number): Promise<void> => {
    const current: IHistory = history[history.length - 1];
    const squares: (string | null)[] = current.squares.slice();

    if (winner || squares[i]) {
      return;
    }

    const body: IRequestBody = {
      history,
      currentStepNumber,
      isPlayWithComputer,
      i,
      xIsNext,
    };

    let response: IResponse | null = null;

    try {
      response = await axios.post(url, body);
    } catch (error) {
      console.log(error);
    }

    if (response) {
      setHistory(response.data.newHistory);
      setCurrentStepNumber(response.data.currentStepNumber);
      setXIsNext(response.data.xIsNext);
      setWinner(
        response.data.newHistory[response.data.newHistory.length - 1].winner,
      );
    }
  };

  const jumpTo = (step: number): void => {
    if (!gameOver) {
      return;
    }

    setCurrentStepNumber(step);
    setXIsNext(step % 2 === 0);
    setWinner(history[step].winner);
  };

  const reset = (): void => {
    setHistory(initialHistory);
    setCurrentStepNumber(0);
    setXIsNext(true);
    setWinner(initialWinner);
    setGameOver(false);
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

export default TicTacToeGame;
