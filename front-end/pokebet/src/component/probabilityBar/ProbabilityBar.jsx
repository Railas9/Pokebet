import React from 'react';
import './ProbabilityBar.css';

function ProbabilityBar({ leftPercent = 55, rightPercent = 45 }) {
  return (
    <div className="probability-bar-container">
      <div className="probability-label">Probabilité de victoire</div>
      <div className="probability-bar">
        <div
          className="probability-segment left"
          style={{ width: `${leftPercent}%` }}
        >
        </div>
        <div
          className="probability-segment right"
          style={{ width: `${rightPercent}%` }}
        >
        </div>
      </div>
      <div className="probability-values">
        <span
          className="value-left"
          style={{ left: `${leftPercent / 2}%` }}
        >
          {leftPercent}%
        </span>
        <span
          className="value-right"
          style={{ left: `${50 + rightPercent / 2}%` }}
        >
          {rightPercent}%
        </span>
      </div>
    </div>
  );
}

export default ProbabilityBar;

