import React from 'react';
import './ProbabilityBar.css';

function ProbabilityBar({ leftPercent, rightPercent}) {
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
        >
          {leftPercent}%
        </span>
        <span
          className="value-right"
        >
          {rightPercent}%
        </span>
      </div>
    </div>
  );
}

export default ProbabilityBar;

