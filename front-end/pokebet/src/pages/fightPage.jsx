import React, { useEffect, useCallback, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import logo from "../assets/PokeBet_Group.svg"
import bg_logo from "../assets/BG_Logo.svg"
import vs_logo from "../assets/VS-Vector.svg"

import ProbabilityBar from "../component/probabilityBar/ProbabilityBar"
import ActionButton from "../component/actionButton/ActionButton"

function FightPage() {
    const { side, ids, probas } = useParams()
    const [leftId, rightId] = ids.split("_")
    const API_BASE = "http://127.0.0.1:8000"

    const [pokemonLeft, setPokemonLeft] = useState(null)
    const [pokemonRight, setPokemonRight] = useState(null)
    const [winner, setWinner] = useState(null)
    const [showDifferences, setShowDifferences] = useState(false)
    const [battleStarted, setBattleStarted] = useState(false)

    const navigate = useNavigate()

    const goToResultsPage = () => {
        navigate("/results/" + side + "/" + winner)
    }

    const showStatDifference = () => {
        setShowDifferences(true)
        setBattleStarted(true)
    }

    const fetchLeftPokemon = useCallback(async () => {
        const res = await fetch(`${API_BASE}/pokemon/${leftId}`)
        const data = await res.json()
        setPokemonLeft(data)
    }, [leftId])

    const fetchRightPokemon = useCallback(async () => {
        const res = await fetch(`${API_BASE}/pokemon/${rightId}`)
        const data = await res.json()
        setPokemonRight(data)
    }, [rightId])

    useEffect(() => {
        fetchLeftPokemon()
        fetchRightPokemon()
    }, [fetchLeftPokemon, fetchRightPokemon])

    useEffect(() => {
        if (pokemonLeft && pokemonRight) {
            let scoreA = 0, scoreB = 0
            const compare = (a, b) => (a > b ? [1, -1] : a < b ? [-1, 1] : [0, 0])

            const stats = [
                ["hp", "hp"],
                ["attack", "defense"],
                ["defense", "attack"],
                ["sp_attack", "sp_defense"],
                ["sp_defense", "sp_attack"],
                ["speed", "speed"],
            ]

            stats.forEach(([a, b]) => {
                const [resA, resB] = compare(pokemonLeft.stats[a], pokemonRight.stats[b])
                scoreA += resA
                scoreB += resB
            })

            if (scoreA > scoreB) setWinner("left")
            else if (scoreB > scoreA) setWinner("right")
            else setWinner("draw")
        }
    }, [pokemonLeft, pokemonRight])

    const getStatColor = (leftValue, rightValue) => {
        if (!showDifferences) return {}
        if (leftValue > rightValue) return { backgroundColor: "rgba(0,179,255,1)",}
        if (leftValue < rightValue) return { backgroundColor: "rgba(255,0,0,1)",}
        return { backgroundColor: "rgba(255,187,0,1)" }
    }

    return (
        <>
            <div className='header'>
                <img className='bg-logo' src={bg_logo} alt='PokeBet_BG' />
                <img className='logo' src={logo} alt='PokeBet_Logo' />
            </div>

            <div className='main-content'>
                <img className='vs-logo' src={vs_logo} alt='VS_Logo' />

                <div className={side === "left" ? "left-side picked" : "left-side unpicked"}>
                    {pokemonLeft && pokemonRight && (
                        <div className="left-info">
                            <p className='pokemon-name'>{pokemonLeft.name}</p>
                            <div className='left-stats'>
                                <p className="left-stat" style={getStatColor(pokemonLeft.stats.hp, pokemonRight.stats.hp)}>PV - {pokemonLeft.stats.hp}</p>
                                <p className="left-stat" style={getStatColor(pokemonLeft.stats.attack, pokemonRight.stats.defense)}>Attaque - {pokemonLeft.stats.attack}</p>
                                <p className="left-stat" style={getStatColor(pokemonLeft.stats.defense, pokemonRight.stats.attack)}>Défense - {pokemonLeft.stats.defense}</p>
                                <p className="left-stat" style={getStatColor(pokemonLeft.stats.sp_attack, pokemonRight.stats.sp_defense)}>Attaque Spéciale - {pokemonLeft.stats.sp_attack}</p>
                                <p className="left-stat" style={getStatColor(pokemonLeft.stats.sp_defense, pokemonRight.stats.sp_attack)}>Défense Spéciale - {pokemonLeft.stats.sp_defense}</p>
                                <p className="left-stat" style={getStatColor(pokemonLeft.stats.speed, pokemonRight.stats.speed)}>Vitesse - {pokemonLeft.stats.speed}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className={side === "right" ? "right-side picked" : "right-side unpicked"}>
                    {pokemonLeft && pokemonRight && (
                        <div className="right-info">
                            <p className='pokemon-name right-stat'>{pokemonRight.name}</p>
                            <div className='right-stats'>
                                <p className="right-stat" style={getStatColor(pokemonRight.stats.hp, pokemonLeft.stats.hp)}>PV - {pokemonRight.stats.hp}</p>
                                <p className="right-stat" style={getStatColor(pokemonRight.stats.attack, pokemonLeft.stats.defense)}>Attaque - {pokemonRight.stats.attack}</p>
                                <p className="right-stat" style={getStatColor(pokemonRight.stats.defense, pokemonLeft.stats.attack)}>Défense - {pokemonRight.stats.defense}</p>
                                <p className="right-stat" style={getStatColor(pokemonRight.stats.sp_attack, pokemonLeft.stats.sp_defense)}>Attaque Spéciale - {pokemonRight.stats.sp_attack}</p>
                                <p className="right-stat" style={getStatColor(pokemonRight.stats.sp_defense, pokemonLeft.stats.sp_attack)}>Défense Spéciale - {pokemonRight.stats.sp_defense}</p>
                                <p className="right-stat" style={getStatColor(pokemonRight.stats.speed, pokemonLeft.stats.speed)}>Vitesse - {pokemonRight.stats.speed}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className='controls-section'>
                    <ProbabilityBar
                        leftPercent={probas}
                        rightPercent={100 - parseInt(probas)}
                    />
                </div>

                {!battleStarted && (
                    <ActionButton
                        type="shuffle"
                        text={"Commencer le combat"}
                        onClick={showStatDifference}
                    />
                )}

                {battleStarted && (
                    <ActionButton
                        type="shuffle"
                        text={"Voir les résultats"}
                        onClick={goToResultsPage}
                    />
                )}
            </div>
        </>
    )
}

export default FightPage