Pour lancer le serveur, utiliser la commande :
```uvicorn --app-dir src pokebet.main:app --reload```

Si la commande a une erreur, initier le venv avec la commande :
```python -m venv .venv```

Puis, si cela ne marche vraiment pas, installer les dépendances avec la commande :
```pip install fastapi uvicorn```

Par la suite, relancez la commande.