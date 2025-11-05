from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import random
from .probabilities import probability_matchup
from pathlib import Path
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PokéBet API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data ---

# POKEMONS = [
#    {"id": 1, "name": "Ronflex",     "type1": "Normal",   "type2": None,      "bst": 540},
#    {"id": 2, "name": "Amphinobi",   "type1": "Eau",      "type2": "Ténèbres","bst": 530},
#    {"id": 3, "name": "Ectoplasma",  "type1": "Spectre",  "type2": "Poison",  "bst": 500},
#    {"id": 4, "name": "Reshiram",    "type1": "Feu",      "type2": "Dragon",  "bst": 680},
#    {"id": 5, "name": "Pingoléon",   "type1": "Eau",      "type2": "Acier",   "bst": 530},
#    {"id": 6, "name": "Corvaillus",  "type1": "Vol",      "type2": "Acier",   "bst": 495},
#    {"id": 7, "name": "Brutalibré",  "type1": "Combat",   "type2": "Vol",     "bst": 500},
#    {"id": 8, "name": "Raichu",      "type1": "Électrik", "type2": None,      "bst": 485},
#    {"id": 9, "name": "Archéduc",    "type1": "Plante",   "type2": "Spectre", "bst": 530},
#    {"id":10, "name": "Mistigrix",   "type1": "Psy",      "type2": None,      "bst": 466},
#]

_base_path = Path(__file__).resolve().parent.parent
_pokemon_file = _base_path / "../pokemon_list.json"

try:
    with _pokemon_file.open("r", encoding="utf-8") as f:
        POKEMONS = json.load(f)
except FileNotFoundError:
    raise RuntimeError(f"pokemon_list.json not found at {_pokemon_file}")
except json.JSONDecodeError as e:
    raise RuntimeError(f"Failed to parse {_pokemon_file}: {e}")


class Pokemon(BaseModel):
    id: int
    name: str
    image_url: Optional[str] = None
    class Types(BaseModel):
        type1: str
        type2: Optional[str] = None
    types: Types
    class Stats(BaseModel):
        hp: int
        attack: int
        defense: int
        sp_attack: int
        sp_defense: int
        speed: int
    stats: Stats


class PokemonListResponse(BaseModel):
    pokemon: List[Pokemon]

class PredictRequest(BaseModel):
    pokemon_a: List[int]
    pokemon_b: List[int]

class PredictResponse(BaseModel):
    winner_ids: List[int]
    probabilities: dict


def get_pokemon_by_id(pokemon_id: int) -> Optional[dict]:
    for p in POKEMONS:
        if p["id"] == pokemon_id:
            return p
    return None

# --- Routes ---
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/pokemon/all", response_model=PokemonListResponse)
def all_pokemon():
    return {"pokemon": POKEMONS}

@app.get("/pokemon/random", response_model=PokemonListResponse)
def random_pokemon(team: bool = False):
    count = 6 if team else 1

    items = random.sample(POKEMONS, count)
    return {"pokemon": items}

@app.get("/pokemon/{pokemon_id}", response_model=Pokemon)
def get_pokemon(pokemon_id: int):
    pokemon = get_pokemon_by_id(pokemon_id)
    if not pokemon:
        raise HTTPException(404, "Pokémon non trouvé")
    return pokemon

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    # Récupération des Pokémon par ID
    team_a = [get_pokemon_by_id(pid) for pid in req.pokemon_a]
    team_b = [get_pokemon_by_id(pid) for pid in req.pokemon_b]

    if None in team_a or None in team_b:
        raise HTTPException(400, "Un ou plusieurs Pokémon n'existent pas")

    # Extraction des BST
    bsts_a = [p["bst"] for p in team_a]
    bsts_b = [p["bst"] for p in team_b]

    # Calcul proba
    p_a, p_b = probability_matchup(bsts_a, bsts_b)

    # Détermination du gagnant
    if p_a > p_b:
        winner = req.pokemon_a
    elif p_b > p_a:
        winner = req.pokemon_b
    else:
        winner = []  # ex-aequo, on verra plus tard

    return {
        "winner_ids": winner,
        "probabilities": {
            "team_a": p_a,
            "team_b": p_b
        }
    }
