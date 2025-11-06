import "./App.css"
import bg_logo from "./assets/BG_Logo.svg"
import logo from "./assets/PokeBet_Group.svg"
import PokemonSelector from "../src/component/pokemonSelector/PokemonSelector.jsx"
import React, { useEffect, useState } from "react";
import BattleTypeSelector from "../src/component/battleTypeSelector/BattleTypeSelector.jsx"
import ProbabilityBar from "../src/component/probabilityBar/ProbabilityBar.jsx"
import ButtonBar from "../src/component/buttonBar/ButtonBar.jsx"

function App() {
	const [selectedLeftId, setSelectedLeftId] = useState(null);
	const [selectedRightId, setSelectedRightId] = useState(null);
	const [pokemonList, setPokemonList] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const API_BASE = "http://127.0.0.1:8000";

	useEffect(() => {
		async function fetchPokemonList() {
			try {
				setLoading(true);
				const response = await fetch(`${API_BASE}/pokemon/all`);
				if (!response.ok) {
					throw new Error("Erreur au niveau du serveur.");
				}
				const data = await response.json();
				setPokemonList(data.pokemon);
			} catch (err) {
				setError("Impossible de récupérer la liste des Pokémon.");
			} finally {
				setLoading(false);
			}
		}
		fetchPokemonList();
	}, [API_BASE]);

	async function setRandomPokemon(selector) {
		try {
			const response = await fetch(`${API_BASE}/pokemon/one_random`);
			if (!response.ok) {
				throw new Error("Erreur au niveau du serveur.");
			}
			const data = await response.json();
			if (selector === "left") {
				setSelectedLeftId(data.pokemon.id);
			} else if (selector === "right") {
				setSelectedRightId(data.pokemon.id);
			}
		} catch (err) {
			console.error("Erreur lors de la sélection aléatoire des Pokémon.", err);
		}
	}

	const handleShuffleLeft = () => {
		setRandomPokemon("left");
	};

	const handleBetLeft = () => {
		console.log("Parier côté gauche");
	};

	const handleBetRight = () => {
		console.log("Parier côté droit");
	};

	const handleShuffleRight = () => {
		setRandomPokemon("right");
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
					{loading ? (
						<p>Chargement de la liste...</p>
					) : error ? (
						<p className='error'>{error}</p>
					) : (
						<>
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
									<PokemonSelector
										text={selectedLeftId || "Sélectionnez votre Pokémon"}
										list={pokemonList}
										onSelect={setSelectedLeftId}
									/>
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
									<PokemonSelector
										text={selectedRightId || "Sélectionnez votre Pokémon"}
										list={pokemonList}
										onSelect={setSelectedRightId}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
