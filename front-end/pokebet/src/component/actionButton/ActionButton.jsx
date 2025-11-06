import React from 'react';
import './ActionButton.css';
import RectangleBlue from '../../assets/Rectangle_Blue.svg';
import RectangleRed from '../../assets/Rectangle_Red.svg';
import RectangleWhite from '../../assets/Rectangle_White.svg';

function ActionButton({ type = 'shuffle', text, onClick }) {
  let backgroundImage;

  switch (type) {
    case 'bet-blue':
      backgroundImage = RectangleBlue;
      break;
    case 'bet-red':
      backgroundImage = RectangleRed;
      break;
    case 'shuffle':
    default:
      backgroundImage = RectangleWhite;
      break;
  }

  return (
    <button
      className={`action-button action-button-${type}`}
      onClick={onClick}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {text}
    </button>
  );
}

export default ActionButton;

