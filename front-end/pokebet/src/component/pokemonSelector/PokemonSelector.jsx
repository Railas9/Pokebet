// src/component/pokemonSelector/PokemonSelector.jsx
import React, { useState, useRef, useEffect } from "react";
import "./PokemonSelector.css";
import Pokeball from "../../assets/PokeBall.svg";
import PokeballSelected from "../../assets/PokeBall-1.svg";

function PokemonSelector({ list = [], onSelect, text = "Sélectionnez votre Pokémon" }) {
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
    if (onSelect) onSelect(pokemon.id);
  };

  return (
    <div className="pokemon-selector-container" ref={ref}>
      <button className="pokeball-btn" onClick={() => setOpen((o) => !o)}>
        <img
          src={selected ? PokeballSelected : Pokeball}
          alt="Pokeball"
          className="pokeball-svg"
        />
      </button>

      <span className="select-text">
        {selected ? selected.name : text}
      </span>

      <span className="pokemon-types">
        {selected
          ? selected.types["type1"] + (selected.types["type2"] ? ` / ${selected.types["type2"]}` : "")
          : ""}
      </span>

      <span className="base-stat-total">
        {selected ? `BST: ${Object.values(selected.stats).reduce((a, b) => a + b, 0)}` : ""}
      </span>

      {open && (
        <ul className="dropdown-list">
          {list.map((pokemon) => (
            <li
              key={pokemon.id}
              className="dropdown-item"
              onClick={() => handleSelect(pokemon)}
            >
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonSelector;