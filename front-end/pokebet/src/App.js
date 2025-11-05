import "./App.css"
import bg_logo from "./assets/BG_Logo.svg"
import logo from "./assets/PokeBet_Group.svg"
import PokemonSelector from "../src/component/pokemonSelector/PokemonSelector.jsx"
import React, { useState } from "react";

function App() {
	const [selectedLeft, setSelectedLeft] = useState(null);
	const [selectedRight, setSelectedRight] = useState(null);

	return (
		<div className='App'>
			<div className='header'>
				<img className='bg-logo' src={bg_logo} alt='PokeBet_BG'></img>
				<img className='logo' src={logo} alt='PokeBet_Logo'></img>
			</div>

			<div className='arena'>
				<div className='side left'>
					<PokemonSelector text={selectedLeft || "Sélectionnez votre Pokémon"} onSelect={setSelectedLeft} />
				</div>
				<div className='divider' />
				<div className='side right'>
					<PokemonSelector text={selectedRight || "Sélectionnez votre Pokémon"} onSelect={setSelectedRight} />
				</div>
			</div>
		</div>
	)
}

export default App
