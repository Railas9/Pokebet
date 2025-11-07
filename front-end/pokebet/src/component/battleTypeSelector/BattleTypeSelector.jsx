import React, { useState } from 'react';
import './BattleTypeSelector.css';

function BattleTypeSelector() {
  const [selectedType, setSelectedType] = useState('1v1');

  return (
    <div className="battle-type-selector">
      <span className="battle-type-label">Type de combat</span>
      <label className="battle-option">
        <span className="battle-text">6 contre 6</span>
        <input
          type="radio"
          name="battleType"
          value="6v6"
          checked={selectedType === '6v6'}
          onChange={(e) => setSelectedType(e.target.value)}
        />
        <span className="checkbox-custom"></span>
      </label>
      <label className="battle-option">
        <span className="battle-text">1 contre 1</span>
        <input
          type="radio"
          name="battleType"
          value="1v1"
          checked={selectedType === '1v1'}
          onChange={(e) => setSelectedType(e.target.value)}
        />
        <span className="checkbox-custom"></span>
      </label>
    </div>
  );
}

export default BattleTypeSelector;

