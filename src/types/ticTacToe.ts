export type IHistory = {
  squares: Array<null | string>;
  currentLocation: string;
  stepNumber: number;
};

export type IWinner = {
  winner: string | null;
  winnerRow: string | null;
};

export type IButtonColor = 'secondary' | 'success' | 'primary';
