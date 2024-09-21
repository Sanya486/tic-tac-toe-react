import React, { FC } from 'react';

import './ClickableSquare.css';

interface IProps {
  value: string | null;
  winnerClass: string;
  onClick: () => void;
}

const ClickableSquare: FC<IProps> = ({ value, winnerClass, onClick }) => (
  <button className={`${winnerClass} square`} onClick={onClick}>
    {value}
  </button>
);

export default ClickableSquare;
