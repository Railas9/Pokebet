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

# Test logging and save
X_train, X_test, y_train, y_test = load_data()
with mlflow.start_run(run_name="pokebet-test-run"):
    model = train_model(X_train, y_train)
