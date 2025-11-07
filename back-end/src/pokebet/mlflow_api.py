import os, mlflow, mlflow.sklearn, pandas as pd
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
from .utils.effectiveness_calculator import get_type_effectiveness
from pydantic import BaseModel

router = APIRouter()

load_dotenv()

TRACK = os.getenv("MLFLOW_TRACKING_URI")
NAME = os.getenv("MLFLOW_MODEL_NAME")
ALIAS = os.getenv("MLFLOW_MODEL_ALIAS")

ml_model = None


def init_mlflow_model():
    global ml_model
    mlflow.set_tracking_uri(TRACK)
    ml_model = mlflow.sklearn.load_model(f"models:/{NAME}@{ALIAS}")


def ratio_stats(a: float, b: float):
    s = a + b
    return 0.5 if s == 0.0 else a / s


class RawPredictBody(BaseModel):
    HP_1: float
    Attack_1: float
    Defense_1: float
    Sp_Atk_1: float
    Sp_Def_1: float
    Speed_1: float
    Type1_1: str | None = None
    Type2_1: str | None = None
    HP_2: float
    Attack_2: float
    Defense_2: float
    Sp_Atk_2: float
    Sp_Def_2: float
    Speed_2: float
    Type1_2: str | None = None
    Type2_2: str | None = None


def build_features_from_raw(r: RawPredictBody):
    feats = {
        "HP_diff": r.HP_1 - r.HP_2,
        "Attack_diff": r.Attack_1 - r.Attack_2,
        "Defense_diff": r.Defense_1 - r.Defense_2,
        "Sp_Atk_diff": r.Sp_Atk_1 - r.Sp_Atk_2,
        "Sp_Def_diff": r.Sp_Def_1 - r.Sp_Def_2,
        "Speed_diff": r.Speed_1 - r.Speed_2,
    }

    eff1, eff2 = get_type_effectiveness(r.Type1_1, r.Type2_1, r.Type1_2, r.Type2_2)
    feats["Type_Effectiveness_1"] = eff1
    feats["Type_Effectiveness_2"] = eff2

    bst1 = r.HP_1 + r.Attack_1 + r.Defense_1 + r.Sp_Atk_1 + r.Sp_Def_1 + r.Speed_1
    bst2 = r.HP_2 + r.Attack_2 + r.Defense_2 + r.Sp_Atk_2 + r.Sp_Def_2 + r.Speed_2
    feats["BST_1"] = bst1
    feats["BST_2"] = bst2
    feats["BST_diff"] = bst1 - bst2

    feats["HP_ratio"] = ratio_stats(r.HP_1, r.HP_2)
    feats["Attack_ratio"] = ratio_stats(r.Attack_1, r.Attack_2)
    feats["Defense_ratio"] = ratio_stats(r.Defense_1, r.Defense_2)
    feats["Sp_Atk_ratio"] = ratio_stats(r.Sp_Atk_1, r.Sp_Atk_2)
    feats["Sp_Def_ratio"] = ratio_stats(r.Sp_Def_1, r.Sp_Def_2)
    feats["Speed_ratio"] = ratio_stats(r.Speed_1, r.Speed_2)

    df = pd.DataFrame([feats])
    return df


@router.post("/predict-mlflow")
def predict_mlflow(req: RawPredictBody):
    if ml_model is None:
        raise HTTPException(503, "No Production model available")

    X = build_features_from_raw(req)
    print(ml_model.predict(X))
    proba = ml_model.predict_proba(X)[0]
    return {"probability_loss": float(proba[0]), "probability_win": float(proba[1])}


@router.post("/load-mlflow-model")
def load_mlflow_model(req: dict):
    version = req["version"]
    if version is None:
        raise HTTPException(400, "Version is required")

    name = req["name"]
    if name is None:
        raise HTTPException(400, "Name is required")

    global ml_model
    ml_model = mlflow.sklearn.load_model(f"models:/{name}/{version}")
    return {"message": "Model loaded successfully"}
