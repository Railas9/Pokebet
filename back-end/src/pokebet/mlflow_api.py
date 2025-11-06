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


class PredictBody(BaseModel):
    HP_diff: float
    Attack_diff: float
    Defense_diff: float
    Sp_Atk_diff: float
    Sp_Def_diff: float
    Speed_diff: float
    Type1_1: str | None = None
    Type2_1: str | None = None
    Type1_2: str | None = None
    Type2_2: str | None = None


@router.post("/predict-mlflow")
def predict_mlflow(req: PredictBody):
    if ml_model is None:
        raise HTTPException(503, "No Production model available")

    eff1, eff2 = get_type_effectiveness(
        req.Type1_1, req.Type2_1, req.Type1_2, req.Type2_2
    )
    X = pd.DataFrame(
        [
            {
                "HP_diff": req.HP_diff,
                "Attack_diff": req.Attack_diff,
                "Defense_diff": req.Defense_diff,
                "Sp_Atk_diff": req.Sp_Atk_diff,
                "Sp_Def_diff": req.Sp_Def_diff,
                "Speed_diff": req.Speed_diff,
                "Type_Effectiveness_1": eff1,
                "Type_Effectiveness_2": eff2,
            }
        ]
    )
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
