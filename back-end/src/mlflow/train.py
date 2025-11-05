from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Paths
ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "data" / "merged_light.csv"

# Model parameters definition -> Hyperparameters for the RandomForestClassifier
model_params = {"n_estimators": 100, "random_state": 0, "max_features": 2}


def load_data(data_path: Path = DATA_PATH):
    print(f"Loading dataset from: {data_path}")
    df = pd.read_csv(data_path)
    X = df.drop(columns=["Is_First_Pokemon_Win"])
    y = df["Is_First_Pokemon_Win"]
    return train_test_split(X, y, test_size=0.2, random_state=42)


def train_model(X_train, y_train, params=model_params):
    model = RandomForestClassifier(**params)
    model.fit(X_train, y_train)
    return model
