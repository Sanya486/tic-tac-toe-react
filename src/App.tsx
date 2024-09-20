import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import TickTacToeGame from './components/TickTacToeGame/TickTacToeGame';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <TickTacToeGame />
    </Container>
  );
}

export default App;
