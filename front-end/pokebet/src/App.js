import "./App.css"
import bg_logo from "./assets/BG_Logo.svg"
import logo from "./assets/PokeBet_Group.svg"
import PokemonSelector from "../src/component/pokemonSelector/PokemonSelector.jsx"
import React, { useEffect, useState } from "react";

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

	return (
		<div className='App'>
			<div className='header'>
				<img className='bg-logo' src={bg_logo} alt='PokeBet_BG'></img>
				<img className='logo' src={logo} alt='PokeBet_Logo'></img>
			</div>

			<div className='arena'>
				{loading ? (
					<p>Chargement de la liste...</p>
				) : error ? (
					<p className='error'>{error}</p>
				) : (
					<>
						<div className='side left'>
							<PokemonSelector
								text={selectedLeftId || "Sélectionnez votre Pokémon"}
								list={pokemonList}
								onSelect={setSelectedLeftId}
							/>
						</div>
						<div className='divider' />
						<div className='side right'>
							<PokemonSelector
								text={selectedRightId || "Sélectionnez votre Pokémon"}
								list={pokemonList}
								onSelect={setSelectedRightId}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default App
