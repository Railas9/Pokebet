import os, mlflow, mlflow.sklearn, pandas as pd
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

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


@router.post("/predict-mlflow")
def predict_mlflow(req: dict):
    if ml_model is None:
        raise HTTPException(503, "No Production model available")
    X = pd.DataFrame([req])
    print(ml_model.predict(X))
    proba = ml_model.predict_proba(X)[0]
    return {"probability_loss": float(proba[0]), "probability_win": float(proba[1])}
