import "./App.css"
import bg_logo from "./assets/BG_Logo.svg"
import logo from "./assets/PokeBet_Group.svg"
import PokemonSelector from "../src/component/pokemonSelector/PokemonSelector.jsx"
import BattleTypeSelector from "../src/component/battleTypeSelector/BattleTypeSelector.jsx"
import ProbabilityBar from "../src/component/probabilityBar/ProbabilityBar.jsx"
import ButtonBar from "../src/component/buttonBar/ButtonBar.jsx"
import React, { useState } from "react";

function App() {
	const [selectedLeft, setSelectedLeft] = useState(null);
	const [selectedRight, setSelectedRight] = useState(null);

	const handleShuffleLeft = () => {
		console.log("Shuffle gauche");
	};

	const handleBetLeft = () => {
		console.log("Parier côté gauche");
	};

	const handleBetRight = () => {
		console.log("Parier côté droit");
	};

	const handleShuffleRight = () => {
		console.log("Shuffle droit");
	};

	return (
		<div className='App'>
			<div className='header'>
				<img className='bg-logo' src={bg_logo} alt='PokeBet_BG'></img>
				<img className='logo' src={logo} alt='PokeBet_Logo'></img>
				<BattleTypeSelector />
			</div>

			<div className='main-content'>
				<div className='controls-section'>
					<ProbabilityBar leftPercent={55} rightPercent={45} />
				</div>

				<div className='arena'>
					<div className='side left'>
						<div className='side-buttons left-buttons'>
							<ButtonBar
								onShuffleLeft={handleShuffleLeft}
								onBetLeft={handleBetLeft}
								onBetRight={handleBetRight}
								onShuffleRight={handleShuffleRight}
								side="left"
							/>
						</div>
						<div className='side-selector'>
							<PokemonSelector text={selectedLeft || "Sélectionnez votre Pokémon"} onSelect={setSelectedLeft} />
						</div>
					</div>
					<div className='divider-full' />
					<div className='side right'>
						<div className='side-buttons right-buttons'>
							<ButtonBar
								onShuffleLeft={handleShuffleLeft}
								onBetLeft={handleBetLeft}
								onBetRight={handleBetRight}
								onShuffleRight={handleShuffleRight}
								side="right"
							/>
						</div>
						<div className='side-selector'>
							<PokemonSelector text={selectedRight || "Sélectionnez votre Pokémon"} onSelect={setSelectedRight} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
