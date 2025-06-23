# python_scripts/prepare_data.py

import pandas as pd

# Charger les commandes extraites
df = pd.read_csv("commandes.csv")

# Convertir la date en mois
df['dateCommande'] = pd.to_datetime(df['dateCommande'])
df['mois'] = df['dateCommande'].dt.to_period('M').dt.to_timestamp()

# Grouper par codeArticle + mois
df_grouped = df.groupby(['codeArticle', 'mois'])['quantiteDemandee'].sum().reset_index()

# Enregistrer pour la prédiction
df_grouped.to_csv("data_grouped.csv", index=False)
print("✅ Données groupées sauvegardées dans data_grouped.csv")
