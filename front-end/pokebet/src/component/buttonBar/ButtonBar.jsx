import React from 'react';
import ActionButton from '../actionButton/ActionButton';
import './ButtonBar.css';

function ButtonBar({ onShuffleLeft, onBetLeft, onBetRight, onShuffleRight, side }) {
  if (side === "left") {
    return (
      <div className="button-bar">
        <ActionButton type="shuffle" text="Shuffle" onClick={onShuffleLeft} />
        <ActionButton type="bet-blue" text="Parier" onClick={onBetLeft} />
      </div>
    );
  } else if (side === "right") {
    return (
      <div className="button-bar">
        <ActionButton type="bet-red" text="Parier" onClick={onBetRight} />
        <ActionButton type="shuffle" text="Shuffle" onClick={onShuffleRight} />
      </div>
    );
  }

  return (
    <div className="button-bar">
      <div className="button-group left-group">
        <ActionButton type="shuffle" text="Mélanger" onClick={onShuffleLeft} />
        <ActionButton type="bet-blue" text="Parier" onClick={onBetLeft} />
      </div>
      <div className="button-divider"></div>
      <div className="button-group right-group">
        <ActionButton type="bet-red" text="Parier" onClick={onBetRight} />
        <ActionButton type="shuffle" text="Mélanger" onClick={onShuffleRight} />
      </div>
    </div>
  );
}

export default ButtonBar;

