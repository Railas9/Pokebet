import os
import mlflow
from mlflow.tracking import MlflowClient
from dotenv import load_dotenv

load_dotenv()

TRACK = os.getenv("MLFLOW_TRACKING_URI")
EXP = os.getenv("MLFLOW_EXPERIMENT_NAME")
NAME = os.getenv("MLFLOW_MODEL_NAME")
ALIAS = os.getenv("MLFLOW_MODEL_ALIAS")


def main():
    mlflow.set_tracking_uri(TRACK)
    client = MlflowClient()

    exp = client.get_experiment_by_name(EXP)
    print(exp)
    runs = client.search_runs(
        [exp.experiment_id],
        order_by=["metrics.f1_test DESC"],
    )

    if not runs:
        print("No run found")
        return
    best_run = runs[0]

    versions = client.search_model_versions(f"name='{NAME}'")

    match = [v for v in versions if v.run_id == best_run.info.run_id]
    if not match:
        print("No version of the registry linked to the best run")
        return

    v = match[0]
    client.set_registered_model_alias(name=NAME, version=v.version, alias=ALIAS)
    print(f"Promoted {NAME} v{v.version} to {ALIAS}")


if __name__ == "__main__":
    main()
