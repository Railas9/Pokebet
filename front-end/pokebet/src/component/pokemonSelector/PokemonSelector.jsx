import React from "react";
import './PokemonSelector.css';

import Pokeball from '../../../assets/Pokeball.png';

function PokemonSelector({ onClick, text = "Sélectionnez votre Pokémon" }) {
  
  return (
    <button className="pokemon-selector-button" onClick={onClick}>
      <img src={Pokeball} alt="Pokeball" className="pokemon-selector-icon" />
      <span>{text}</span>
    </button>
  );
}

export default PokemonSelector;