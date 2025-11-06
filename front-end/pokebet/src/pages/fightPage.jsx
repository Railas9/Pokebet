import React, { useEffect, useCallback, useState } from "react"
import { useParams } from "react-router-dom"

import logo from "../assets/PokeBet_Group.svg"
import bg_logo from "../assets/BG_Logo.svg"
import vs_logo from "../assets/VS-Vector.svg"

import ProbabilityBar from "../component/probabilityBar/ProbabilityBar"
import ActionButton from "../component/actionButton/ActionButton"
import { useNavigate } from "react-router-dom";

function FightPage() {
	const { side, ids, probas } = useParams()
	const [leftId, rightId] = ids.split("_")
	const API_BASE = "http://127.0.0.1:8000"
	const [pokemonLeft, setPokemonLeft] = useState(null)
	const [pokemonRight, setPokemonRight] = useState(null)
	const [winner, setWinner] = useState(null)
    const navigate = useNavigate();

    const goToResultsPage = () => {
        navigate("/results/" + side + "/" + winner);
    };

	const fetchLeftPokemon = useCallback(async () => {
		try {
			const res = await fetch(`${API_BASE}/pokemon/${leftId}`)
			const data = await res.json()
			setPokemonLeft(data)
		} catch (err) {
			console.error("Error fetching left Pokemon data:", err)
		}
	}, [leftId, API_BASE])

	const fetchRightPokemon = useCallback(async () => {
		try {
			const res = await fetch(`${API_BASE}/pokemon/${rightId}`)
			const data = await res.json()
			setPokemonRight(data)
		} catch (err) {
			console.error("Error fetching right Pokemon data:", err)
		}
	}, [rightId, API_BASE])

	useEffect(() => {
		fetchLeftPokemon()
		fetchRightPokemon()
	}, [fetchLeftPokemon, fetchRightPokemon])

	useEffect(() => {
		if (pokemonLeft && pokemonRight) {
			let scoreA = 0
			let scoreB = 0

			if (pokemonLeft.stats.hp > pokemonRight.stats.hp) {
                scoreA++;
                scoreB--;
            }
			else if (pokemonLeft.stats.hp < pokemonRight.stats.hp) {
                scoreB++
                scoreA--;
            }
            console.log(`After HP comparison - ${pokemonLeft.name}: ${scoreA}, ${pokemonRight.name}: ${scoreB}`)

            if (pokemonLeft.stats.attack > pokemonRight.stats.defense) {
                scoreA ++;
                scoreB --;
            }
            else if (pokemonLeft.stats.attack < pokemonRight.stats.defense) {
                scoreB ++;
                scoreA --;
            }
            console.log(`After Attack comparison - ${pokemonLeft.name}: ${scoreA}, ${pokemonRight.name}: ${scoreB}`)

            if (pokemonLeft.stats.defense > pokemonRight.stats.attack) {
                scoreA ++;
                scoreB --;
            }
            else if (pokemonLeft.stats.defense < pokemonRight.stats.attack) {
                scoreB ++;
                scoreA --;
            }
            console.log(`After Defense comparison - ${pokemonLeft.name}: ${scoreA}, ${pokemonRight.name}: ${scoreB}`)

            if (pokemonLeft.stats.sp_attack > pokemonRight.stats.sp_defense) {
                scoreA ++;
                scoreB --;
            }
            else if (pokemonLeft.stats.sp_attack < pokemonRight.stats.sp_defense) {
                scoreB ++;
                scoreA --;
            }
            console.log(`After Sp. Attack comparison - ${pokemonLeft.name}: ${scoreA}, ${pokemonRight.name}: ${scoreB}`)

            if (pokemonLeft.stats.sp_defense > pokemonRight.stats.sp_attack) {
                scoreA ++;
                scoreB --;
            }
            else if (pokemonLeft.stats.sp_defense < pokemonRight.stats.sp_attack) {
                scoreB ++;
                scoreA --;
            }
            console.log(`After Sp. Defense comparison - ${pokemonLeft.name}: ${scoreA}, ${pokemonRight.name}: ${scoreB}`)

            if (pokemonLeft.stats.speed > pokemonRight.stats.speed) {
                scoreA ++;
                scoreB --;
            }
            else if (pokemonLeft.stats.speed < pokemonRight.stats.speed) {
                scoreB ++;
                scoreA --;
            }
            console.log(`After Speed comparison - ${pokemonLeft.name}: ${scoreA}, ${pokemonRight.name}: ${scoreB}`)




			// --- Résultat final ---
            console.log(`Scores - ${pokemonLeft.name}: ${scoreA}, ${pokemonRight.name}: ${scoreB}`)
			if (scoreA > scoreB) setWinner("left")
			else if (scoreB > scoreA) setWinner("right")
			else setWinner("draw")
		}
	}, [pokemonLeft, pokemonRight])

	return (
		<>
			<div className='header'>
				<img className='bg-logo' src={bg_logo} alt='PokeBet_BG' />
				<img className='logo' src={logo} alt='PokeBet_Logo' />
			</div>

			<div className='main-content'>
				<img className='vs-logo' src={vs_logo} alt='VS_Logo' />

				<div className={side === "left" ? "left-side picked" : "left-side unpicked"}>
                    <div className="left-info">
                        <p className='pokemon-name left-stat'>
                            {pokemonLeft ? pokemonLeft.name : "Chargement..."}
                        </p>
                        <div className='left-stats'>
                            <p className='hp left-stat'>{pokemonLeft ? pokemonLeft.stats.hp : "Chargement..."} PV</p>
                            <p className='attack left-stat'>Attaque - {pokemonLeft ? pokemonLeft.stats.attack : "..."}</p>
                            <p className='defense left-stat'>Défense - {pokemonLeft ? pokemonLeft.stats.defense : "..."}</p>
                            <p className='sp-attack left-stat'>Attaque Spéciale - {pokemonLeft ? pokemonLeft.stats.sp_attack : "..."}</p>
                            <p className='sp-defense left-stat'>Défense Spéciale - {pokemonLeft ? pokemonLeft.stats.sp_defense : "..."}</p>
                            <p className='speed left-stat'>Vitesse - {pokemonLeft ? pokemonLeft.stats.speed : "..."}</p>
                        </div>
                    </div>
				</div>

				<div className={side === "right" ? "right-side picked" : "right-side unpicked"}>
                    <div className="right-info">
                        <p className='pokemon-name right-stat'>
                            {pokemonRight ? pokemonRight.name : "Chargement..."}
                        </p>
                        <div className='right-stats'>
                            <p className='hp right-stat'>{pokemonRight ? pokemonRight.stats.hp : "Chargement..."} PV</p>
                            <p className='attack right-stat'>{pokemonRight ? pokemonRight.stats.attack : "..."} - Attaque</p>
                            <p className='defense right-stat'>{pokemonRight ? pokemonRight.stats.defense : "..."} - Défense</p>
                            <p className='sp-attack right-stat'>{pokemonRight ? pokemonRight.stats.sp_attack : "..."} - Attaque Spéciale</p>
                            <p className='sp-defense right-stat'>{pokemonRight ? pokemonRight.stats.sp_defense : "..."} - Défense Spéciale</p>
                            <p className='speed right-stat'>{pokemonRight ? pokemonRight.stats.speed : "..."} - Vitesse</p>
                        </div>
                    </div>
				</div>

				<div className='controls-section'>
					<ProbabilityBar
						leftPercent={probas}
						rightPercent={100 - parseInt(probas)}
					/>
				</div>

				<ActionButton type="shuffle" text={"Voir les résultats"} onClick={goToResultsPage} />
			</div>
		</>
	)
}

export default FightPage