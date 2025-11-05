import React, { useState, useRef, useEffect } from "react";
import './PokemonSelector.css';
import Pokeball from "../../assets/PokeBall.svg";
import PokeballSelected from "../../assets/PokeBall-1.svg";
import pokemonList from "./pokemonList";

function PokemonSelector({ onSelect, text = "Sélectionnez votre Pokémon" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (pokemon) => {
    setSelected(pokemon);
    setOpen(false);
    if (onSelect) onSelect(pokemon);
  };

  return (
    <div className="pokemon-selector-container" ref={ref}>
      <button className="pokeball-btn" onClick={() => setOpen((o) => !o)}>
        <img src={selected ? PokeballSelected : Pokeball} alt="Pokeball" className="pokeball-svg" />
      </button>
      <span className="select-text">{selected || text}</span>
      {open && (
        <ul className="dropdown-list">
          {pokemonList.map((pokemon) => (
            <li
              key={pokemon}
              className="dropdown-item"
              onClick={() => handleSelect(pokemon)}
            >
              {pokemon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonSelector;