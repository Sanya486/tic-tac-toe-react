import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import TicTacToeGame from './components/TicTacToeGame/TicTacToeGame';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <TicTacToeGame />
    </Container>
  );
}

export default App;
