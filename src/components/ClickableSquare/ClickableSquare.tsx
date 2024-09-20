import React from 'react';

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
