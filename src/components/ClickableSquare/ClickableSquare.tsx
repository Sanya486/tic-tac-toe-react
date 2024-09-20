import React from 'react';

import './ClickableSquare.css'

const ClickableSquare = ({
  value,
  winnerClass,
  onClick,
}: {
  value: string;
  winnerClass: string;
  onClick: () => void;
}) => (
  <button className={`${winnerClass} square`} onClick={onClick}>
    {value}
  </button>
);

export default ClickableSquare;
