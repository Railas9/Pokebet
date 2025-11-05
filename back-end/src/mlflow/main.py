import mlflow
from train import train_model, load_data
import pandas as pd

mlflow.set_tracking_uri("http://127.0.0.1:5000")
mlflow.set_experiment("my-first-experiment")
mlflow.sklearn.autolog(registered_model_name="pokebet-rf-model")

client = mlflow.tracking.MlflowClient()

# for m in client.search_registered_models():
#     print(f"Model Name: {m.name}")
#     for v in m.latest_versions:
#         print(f" - Version: {v.version}, Stage: {v.current_stage}, Run ID: {v.run_id}")

model = mlflow.sklearn.load_model(model_uri="models:/pokebet-rf-model/2")
print(model)

example = pd.DataFrame(
    [
        {
            "HP_diff": 160 - 72,
            "Attack_diff": 160 - 95,
            "Defense_diff": 110 - 67,
            "Sp_Atk_diff": 65 - 103,
            "Sp_Def_diff": 110 - 71,
            "Speed_diff": 30 - 122,
        }
    ]
)
result = model.predict_proba(example)
print(f"Prediction result: {result}")
# Test logging and save
# X_train, X_test, y_train, y_test = load_data()
# with mlflow.start_run(run_name="pokebet-test-run"):
#     model = train_model(X_train, y_train)
