class PokemonBattleModel:
    def __init__(self, client):
        self.client = client

    def get_models(self):
        models = {}
        for m in self.client.search_registered_models():
            versions = []
            for v in m.latest_versions:
                versions.append(
                    {"version": v.version, "stage": v.current_stage, "run_id": v.run_id}
                )
            models[m.name] = versions
        return models

    def load_model(self, model_name: str, model_version: str):
        model_uri = f"models:/{model_name}/{model_version}"
        model = mlflow.sklearn.load_model(model_uri=model_uri)
        return model

    def predict(self, model, features: dict):
        example = pd.DataFrame([features])
        result = model.predict_proba(example)
        return result
