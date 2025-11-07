type_chart = {
    "Normal": {"Rock": 0.5, "Ghost": 0.0, "Steel": 0.5},
    "Fire": {
        "Fire": 0.5,
        "Water": 0.5,
        "Grass": 2.0,
        "Ice": 2.0,
        "Bug": 2.0,
        "Rock": 0.5,
        "Dragon": 0.5,
        "Steel": 2.0,
    },
    "Water": {
        "Fire": 2.0,
        "Water": 0.5,
        "Grass": 0.5,
        "Ground": 2.0,
        "Rock": 2.0,
        "Dragon": 0.5,
    },
    "Electric": {
        "Water": 2.0,
        "Electric": 0.5,
        "Grass": 0.5,
        "Ground": 0.0,
        "Flying": 2.0,
        "Dragon": 0.5,
    },
    "Grass": {
        "Fire": 0.5,
        "Water": 2.0,
        "Grass": 0.5,
        "Poison": 0.5,
        "Ground": 2.0,
        "Flying": 0.5,
        "Bug": 0.5,
        "Rock": 2.0,
        "Dragon": 0.5,
        "Steel": 0.5,
    },
    "Ice": {
        "Fire": 0.5,
        "Water": 0.5,
        "Grass": 2.0,
        "Ground": 2.0,
        "Flying": 2.0,
        "Dragon": 2.0,
        "Ice": 0.5,
        "Steel": 0.5,
    },
    "Fighting": {
        "Normal": 2.0,
        "Ice": 2.0,
        "Rock": 2.0,
        "Dark": 2.0,
        "Steel": 2.0,
        "Poison": 0.5,
        "Flying": 0.5,
        "Psychic": 0.5,
        "Bug": 0.5,
        "Ghost": 0.0,
        "Fairy": 0.5,
    },
    "Poison": {
        "Grass": 2.0,
        "Fairy": 2.0,
        "Poison": 0.5,
        "Ground": 0.5,
        "Rock": 0.5,
        "Ghost": 0.5,
        "Steel": 0.0,
    },
    "Ground": {
        "Fire": 2.0,
        "Electric": 2.0,
        "Poison": 2.0,
        "Rock": 2.0,
        "Steel": 2.0,
        "Grass": 0.5,
        "Bug": 0.5,
        "Flying": 0.0,
    },
    "Flying": {
        "Grass": 2.0,
        "Fighting": 2.0,
        "Bug": 2.0,
        "Electric": 0.5,
        "Rock": 0.5,
        "Steel": 0.5,
    },
    "Psychic": {
        "Fighting": 2.0,
        "Poison": 2.0,
        "Psychic": 0.5,
        "Steel": 0.5,
        "Dark": 0.0,
    },
    "Bug": {
        "Grass": 2.0,
        "Psychic": 2.0,
        "Dark": 2.0,
        "Fire": 0.5,
        "Fighting": 0.5,
        "Poison": 0.5,
        "Flying": 0.5,
        "Ghost": 0.5,
        "Steel": 0.5,
        "Fairy": 0.5,
    },
    "Rock": {
        "Fire": 2.0,
        "Ice": 2.0,
        "Flying": 2.0,
        "Bug": 2.0,
        "Fighting": 0.5,
        "Ground": 0.5,
        "Steel": 0.5,
    },
    "Ghost": {"Psychic": 2.0, "Ghost": 2.0, "Dark": 0.5, "Normal": 0.0},
    "Dragon": {"Dragon": 2.0, "Steel": 0.5, "Fairy": 0.0},
    "Dark": {"Psychic": 2.0, "Ghost": 2.0, "Fighting": 0.5, "Dark": 0.5, "Fairy": 0.5},
    "Steel": {
        "Rock": 2.0,
        "Ice": 2.0,
        "Fairy": 2.0,
        "Fire": 0.5,
        "Water": 0.5,
        "Electric": 0.5,
        "Steel": 0.5,
    },
    "Fairy": {
        "Fighting": 2.0,
        "Dragon": 2.0,
        "Dark": 2.0,
        "Fire": 0.5,
        "Poison": 0.5,
        "Steel": 0.5,
    },
}


def effectiveness(attacker_type, defender_types):
    if attacker_type is None:
        return 1.0

    mult = 1.0
    for d in defender_types:
        if d is None:
            continue
        mult *= type_chart.get(attacker_type, {}).get(d, 1.0)
    return mult


def get_type_effectiveness(type1_1, type2_1, type1_2, type2_2):

    eff1 = effectiveness(type1_1, [type1_2, type2_2])
    eff2 = effectiveness(type1_2, [type1_1, type2_1])

    return eff1, eff2
