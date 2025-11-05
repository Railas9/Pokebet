import random
from typing import List, Tuple

def probability_matchup(bsts_a: List[int], bsts_b: List[int]) -> Tuple[float, float]:

    """Calcule la probabilité de victoire de l'équipe A contre l'équipe B, a implementé pour MLFlow"""

    sum_a = sum(bsts_a)
    sum_b = sum(bsts_b)

    bias = (sum_a - sum_b) / (len(bsts_a) * 800.0)
    base = 0.5 + bias

    p_a = base + random.uniform(-0.05, 0.05)
    p_a = round(min(max(p_a, 0.05), 0.95), 2)
    p_b = round(1 - p_a, 2)

    return p_a, p_b
