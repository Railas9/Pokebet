from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import pandas as pd
import mlflow


router = APIRouter()


TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://127.0.0.1:5000")
MODEL_URI = os.getenv("MLFLOW_MODEL_URI", "models:/pokebet-rf-model/1")
EXPERIMENT_NAME = os.getenv("MLFLOW_EXPERIMENT_NAME", "pokebet-rf-model")

ml_model = None
client = None


def init_mlflow_model():
    global ml_model
    global client
    try:
        mlflow.set_tracking_uri(TRACKING_URI)
        mlflow.set_experiment(EXPERIMENT_NAME)
        ml_model = mlflow.sklearn.load_model(model_uri=MODEL_URI)
        client = mlflow.tracking.MlflowClient()
    except Exception:
        ml_model = None


class MLPredictRequest(BaseModel):
    HP_diff: float
    Attack_diff: float
    Defense_diff: float
    Sp_Atk_diff: float
    Sp_Def_diff: float
    Speed_diff: float


@router.get("/models")
def get_models():
    print(client.search_registered_models())
    models = client.search_registered_models()
    return {"models": models}


@router.post("/predict-mlflow")
def predict_mlflow(req: MLPredictRequest):
    global ml_model
    if ml_model is None:
        init_mlflow_model()
        if ml_model is None:
            raise HTTPException(status_code=503, detail="MLflow model not loaded")

    features = pd.DataFrame(
        [
            {
                "HP_diff": req.HP_diff,
                "Attack_diff": req.Attack_diff,
                "Defense_diff": req.Defense_diff,
                "Sp_Atk_diff": req.Sp_Atk_diff,
                "Sp_Def_diff": req.Sp_Def_diff,
                "Speed_diff": req.Speed_diff,
            }
        ]
    )

    try:
        proba = ml_model.predict_proba(features)
        return {
            "probabilities": {
                "probability_loss": float(proba[0][0]),
                "probability_win": float(proba[0][1]),
            }
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}")
