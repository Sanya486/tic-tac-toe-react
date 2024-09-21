export type IHistory = {
  squares: Array<null | string>;
  currentLocation: string;
  stepNumber: number;
  winner: IWinner;
};

export type IWinner = {
  winner: string | null;
  winnerRow: Array<number> | null;
};

export type IButtonColor = 'secondary' | 'success' | 'primary';

export type IResponseData = {
  newHistory: IHistory[];
  currentStepNumber: number;
  winner: IWinner;
  xIsNext: boolean;
};

export type IResponse = {
  data: IResponseData;
  status: number;
  statusText: string;
  headers: object;
  config: object;
  request: object;
};

export type IRequestBody = {
  history: IHistory[];
  currentStepNumber: number;
  isPlayWithComputer: boolean;
  i: number;
  xIsNext: boolean;
};
