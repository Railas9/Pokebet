import React, { useState, useEffect } from "react";
import "../App.css";
import bg_logo from "../assets/BG_Logo.svg";
import logo from "../assets/PokeBet_Group.svg";
import PokemonSelector from "../component/pokemonSelector/PokemonSelector.jsx";
import BattleTypeSelector from "../component/battleTypeSelector/BattleTypeSelector.jsx";
import ProbabilityBar from "../component/probabilityBar/ProbabilityBar.jsx";
import ButtonBar from "../component/buttonBar/ButtonBar.jsx";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [selectedLeftId, setSelectedLeftId] = useState(null);
  const [selectedRightId, setSelectedRightId] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [probaBar, setProbaBar] = useState({ left: 50, right: 50 });
  const navigate = useNavigate();

  const API_BASE = "http://127.0.0.1:8000";

  async function postPokemonStatDifference(diff) {
    try {
      const response = await fetch(`${API_BASE}/predict-mlflow`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(diff),
      });
      const data = await response.json();
      console.log("Prédiction reçue :", data);
      setProbaBar({
        left: Math.round(data.probability_win * 100),
        right: Math.round(data.probability_loss * 100),
      });
    } catch (err) {
      console.error(
        "Erreur lors de l'envoi des données de différence de statistiques.",
        err
      );
    }
  }

  const calculateStatDifference = React.useCallback(() => {
    if (!selectedLeftId || !selectedRightId || !pokemonList.length) {
      return null;
    }

    const leftPokemon = pokemonList.find((p) => p.id === selectedLeftId);
    const rightPokemon = pokemonList.find((p) => p.id === selectedRightId);

    if (!leftPokemon || !rightPokemon) {
      return null;
    }

    const pokemonsStats = {
      HP_1: leftPokemon.stats.hp,
      Attack_1: leftPokemon.stats.attack,
      Defense_1: leftPokemon.stats.defense,
      Sp_Atk_1: leftPokemon.stats.sp_attack,
      Sp_Def_1: leftPokemon.stats.sp_defense,
      Speed_1: leftPokemon.stats.speed,
      Type1_1: leftPokemon.types.type1,
      Type2_1: leftPokemon.types.type2 || null,

      HP_2: rightPokemon.stats.hp,
      Attack_2: rightPokemon.stats.attack,
      Defense_2: rightPokemon.stats.defense,
      Sp_Atk_2: rightPokemon.stats.sp_attack,
      Sp_Def_2: rightPokemon.stats.sp_defense,
      Speed_2: rightPokemon.stats.speed,
      Type1_2: rightPokemon.types.type1,
      Type2_2: rightPokemon.types.type2 || null,
    };

    postPokemonStatDifference(pokemonsStats);
  }, [selectedLeftId, selectedRightId, pokemonList]);

  useEffect(() => {
    if (selectedLeftId && selectedRightId) {
      const diff = calculateStatDifference();
      console.log(diff);
    }
  }, [selectedLeftId, selectedRightId, calculateStatDifference]);

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

  useEffect(() => {
    fetchPokemonList();
  }, [API_BASE]);

  async function setRandomPokemon(selector) {
    try {
      const response = await fetch(`${API_BASE}/pokemon/one_random/`);
      if (!response.ok) {
        throw new Error("Erreur au niveau du serveur.");
      }
      const data = await response.json();
      if (selector === "left") {
        setSelectedLeftId(data.id);
      } else if (selector === "right") {
        setSelectedRightId(data.id);
      }
    } catch (err) {
      console.error("Erreur lors de la sélection aléatoire des Pokémon.", err);
    }
  }

  const handleShuffleLeft = () => {
    setRandomPokemon("left");
  };

  const handleBetLeft = () => {
    if (selectedLeftId && selectedRightId != null) {
      navigate(
        "/fight/left/" +
          selectedLeftId +
          "_" +
          selectedRightId +
          "/" +
          probaBar.left
      );
    } else {
      alert("Veuillez sélectionner les deux Pokémon avant de parier.");
    }
  };

  const handleBetRight = () => {
    if (selectedLeftId && selectedRightId != null) {
      navigate(
        "/fight/right/" +
          selectedLeftId +
          "_" +
          selectedRightId +
          "/" +
          probaBar.left
      );
    } else {
      alert("Veuillez sélectionner les deux Pokémon avant de parier.");
    }
  };

  const handleShuffleRight = () => {
    setRandomPokemon("right");
  };

  return (
    <>
      <div className="header">
        <img className="bg-logo" src={bg_logo} alt="PokeBet_BG"></img>
        <img className="logo" src={logo} alt="PokeBet_Logo"></img>
        <BattleTypeSelector />
      </div>
      <div className="main-content">
        <div className="controls-section">
          <ProbabilityBar
            leftPercent={probaBar.left}
            rightPercent={probaBar.right}
          />
        </div>

        <hr className="divider" />

        <div className="arena">
          {loading ? (
            <p>Chargement de la liste...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <div className="side left">
                <div className="side-buttons left-buttons">
                  <ButtonBar
                    onShuffleLeft={handleShuffleLeft}
                    onBetLeft={handleBetLeft}
                    onBetRight={handleBetRight}
                    onShuffleRight={handleShuffleRight}
                    side="left"
                  />
                </div>
                <div className="side-selector">
                  <PokemonSelector
                    text={selectedLeftId || "Sélectionnez votre Pokémon"}
                    list={pokemonList}
                    onSelect={setSelectedLeftId}
                  />
                </div>
              </div>
              <div className="divider-full" />
              <div className="side right">
                <div className="side-buttons right-buttons">
                  <ButtonBar
                    onShuffleLeft={handleShuffleLeft}
                    onBetLeft={handleBetLeft}
                    onBetRight={handleBetRight}
                    onShuffleRight={handleShuffleRight}
                    side="right"
                  />
                </div>
                <div className="side-selector">
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
    </>
  );
}

export default MainPage;
