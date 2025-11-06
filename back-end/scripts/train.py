import os, mlflow, mlflow.sklearn, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from dotenv import load_dotenv
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from data_prep import data_prep

load_dotenv()

TRACK = os.getenv("MLFLOW_TRACKING_URI")
EXP = os.getenv("MLFLOW_EXPERIMENT_NAME")
NAME = os.getenv("MLFLOW_MODEL_NAME")
DATA = os.getenv("DATA_PATH")


def main():
    mlflow.set_tracking_uri(TRACK)
    mlflow.set_experiment(EXP)

    drop_columns = [
        "First_pokemon",
        "Second_pokemon",
        "Winner",
        "Name_1",
        "Name_2",
        "Type_1_1",
        "Type_1_2",
        "Type_2_1",
        "Type_2_2",
        "HP_1",
        "Attack_1",
        "Defense_1",
        "Sp_Atk_1",
        "Sp_Def_1",
        "Speed_1",
        "HP_2",
        "Attack_2",
        "Defense_2",
        "Sp_Atk_2",
        "Sp_Def_2",
        "Speed_2",
        "Generation_1",
        "Generation_2",
        "Legendary_1",
        "Legendary_2",
    ]

    df = data_prep(DATA, drop_columns)
    y = df["Is_First_Pokemon_Win"]
    X = df.drop(columns=["Is_First_Pokemon_Win"])

    Xtr, Xte, ytr, yte = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
    )

    mlflow.sklearn.autolog(registered_model_name=NAME)

    with mlflow.start_run(run_name="rf-baseline"):
        model = RandomForestClassifier(n_estimators=100, max_features=2, random_state=0)
        model.fit(Xtr, ytr)

        # Prédictions test
        y_pred = model.predict(Xte)

        # Acc -> accuracy score represent the percentage of correct predictions over the total number of predictions
        acc = accuracy_score(yte, y_pred)
        # F1 -> F1 score is the harmonic mean of precision and recall
        # Precision -> A Ratio, Among all the positive predictions, how many are actually positive ?
        # Recall -> A Ratio, Among all the actual positive cases, how many are predicted as positive ?
        f1 = f1_score(yte, y_pred)

        # --- LOG MLflow ---
        mlflow.log_metric("acc_test", acc)
        mlflow.log_metric("f1_test", f1)


if __name__ == "__main__":
    main()
