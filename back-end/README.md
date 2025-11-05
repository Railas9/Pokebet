## Setup MLFLOW

### Lancement du serveur

Pour lancer le serveur MLFLOW utiliser la commande suivante dans un env python (au niveau du backend du projet):

`mlflow server --backend-store-uri "sqlite:///<path_absolu_du_projet>/back-end/mlflow.db" --default-artifact-root "file:///<path_absolu_du_projet>/back-end/src/mlflow" --host <host> --port <port>`

host peut être par exemple : 127.0.0.1 ou localhost
port peut être par exemple : 5000

Si le serveur est bien lancé, vous pouvez accéder à l'ui de MLFLOW en allant sur ce lien : `"http://<host>:<port>"`

### Changement de la variable d'env MLFLOW_TRACKING_URI

Adapter les variables d'environnement dans votre fichier .env (si il n'est pas déjà créé, vous pouvez le faire en partant du .env.example)
`MLFLOW_TRACKING_URI=http://<host>:<port>`

### Init du premier modèle

Avant de lancé le serveur vous devez d'abord init un modèle (sinon les routes de predict ne marcheront pas)

Lancez le script :

`train.py`

Ce script va entraîner un premier model et l'enregistrer dans Mlflow.

Et après lancez :

`promote_best.py`

Ce script là va associer l'alias "prod" avec le model ayant eu les meilleurs résultats de prédiction.
L'alias est un id qu'on associe à un model name et une version afin de pouvoir versionner nos models.

Et maintenant vous pouvez lancer le serveur et commencer à le requêter.

## Setup Serveur

Pour lancer le serveur, utiliser la commande :
`uvicorn --app-dir src pokebet.main:app --reload`

Si la commande a une erreur, initier le venv avec la commande :
`python -m venv .venv`

Puis, si cela ne marche vraiment pas, installer les dépendances avec la commande :
`pip install fastapi uvicorn`

Par la suite, relancez la commande.
