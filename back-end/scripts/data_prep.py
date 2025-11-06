import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

DATA_PATH = os.getenv("DATA_PATH")


def data_prep(
    data_path,
    drop_columns,
):
    data = pd.read_csv(data_path)
    # Drop columns that are not needed
    data_clean = data.drop(columns=drop_columns, errors="ignore")

    # Remove rows with NaN values
    data_clean = data_clean.dropna()

    # Remove rows with duplicate values
    data_clean = data_clean.drop_duplicates()

    # Convert all columns to the correct type
    data_clean = data_clean.astype(float)

    print(data_clean.head())
    return data_clean


if __name__ == "__main__":
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
    data = pd.read_csv(DATA_PATH)
    data_clean = data_prep(DATA_PATH, drop_columns)
