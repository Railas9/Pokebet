import React from "react";
import './PokemonSelector.css';

import Pokeball from '../../assets/Pokeball.png';

function PokemonSelector({ onClick, text = "Sélectionnez votre Pokémon" }) {
  
  return (
    <div className="pokemon-selector-container">
      <button className="pokeball-btn" onClick={onClick}>
        <img src={Pokeball} alt="Pokeball" className="pokeball-img" />
      </button>
      <span className="select-text">{text}</span>
    </div>
  );
}

export default PokemonSelector;