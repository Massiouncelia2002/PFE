
# # python_scripts/predict_sarima.py

# import pandas as pd
# import matplotlib.pyplot as plt
# from statsmodels.tsa.statespace.sarimax import SARIMAX
# import warnings
# warnings.filterwarnings("ignore")

# # Charger les données groupées
# df = pd.read_csv("data_grouped.csv")

# # S'assurer que les dates sont au bon format
# df['mois'] = pd.to_datetime(df['mois'])

# # Initialiser la liste des prévisions
# all_predictions = []

# # Boucler sur chaque article
# # for code_article in df['codeArticle'].unique():
# #     df_article = df[df['codeArticle'] == code_article].copy()

# #     # if df_article.empty or len(df_article) < 6:
# #     #     print(f"⚠️ Pas assez de données pour l'article {code_article} (au moins 6 mois nécessaires)")
# #     #     continue


# for code_article in df['codeArticle'].unique():
#     df_article = df[df['codeArticle'] == code_article].copy()

#     df_article['mois'] = pd.to_datetime(df_article['mois'])
#     nb_mois = df_article['mois'].dt.to_period('M').nunique()

#     if df_article.empty or nb_mois < 6:
#         print(f"⚠️ Pas assez de données pour l'article {code_article} ({nb_mois} mois distincts, au moins 6 requis)")
#         continue

#     df_article.loc[:, 'mois'] = pd.to_datetime(df_article['mois'])
#     df_article.set_index('mois', inplace=True)
#     df_article = df_article.asfreq('MS')  # Mois début

#     serie = df_article['quantiteDemandee']

#     try:
#         # Modèle SARIMA
#         model = SARIMAX(serie, order=(1,1,1), seasonal_order=(1,1,1,12))
#         results = model.fit(disp=False)

#         # Prédire 3 mois
#         forecast = results.get_forecast(steps=3)
#         predicted = forecast.predicted_mean

#         # Afficher graphique (facultatif)
#         plt.figure(figsize=(10, 5))
#         serie.plot(label='Historique')
#         predicted.plot(label='Prévision SARIMA', color='red')
#         plt.title(f"Prévision de la demande — Article {code_article}")
#         plt.xlabel("Mois")
#         plt.ylabel("Quantité demandée")
#         plt.legend()
#         plt.grid(True)
#         plt.tight_layout()
#         plt.show()
#         # plt.show(block=False)
#         # plt.pause(1)  # attendre 1 seconde
#         # plt.close()

#         # Sauvegarder les prévisions
#         for date, qty in predicted.items():
#             all_predictions.append({
#                 "codeArticle": code_article,
#                 "mois": date.strftime('%Y-%m-%d'),
#                 "quantitePrevue": round(qty)
#             })

#         print(f"✅ Prévisions ajoutées pour {code_article}")

#     except Exception as e:
#         print(f"❌ Erreur pour l'article {code_article} :", e)

# # Exporter dans un CSV
# df_export = pd.DataFrame(all_predictions)
# df_export.to_csv("previsions.csv", index=False)
# print("✅ Fichier 'previsions.csv' généré avec succès ✅")







# # python_scripts/predict_sarima.py

# import pandas as pd
# import matplotlib.pyplot as plt
# from statsmodels.tsa.statespace.sarimax import SARIMAX
# import warnings
# warnings.filterwarnings("ignore")

# # Charger les données
# df = pd.read_csv("data_grouped.csv")

# # S'assurer que les dates sont bien en datetime
# df['mois'] = pd.to_datetime(df['mois'])

# # Liste des prévisions
# all_predictions = []

# # Boucle sur chaque combinaison codeDepot + codeArticle
# for (code_depot, code_article), group in df.groupby(['codeDepot', 'codeArticle']):

#     group = group.copy()
#     group.set_index('mois', inplace=True)
#     group = group.asfreq('MS')

#     nb_mois = group.index.to_period('M').nunique()

#     if nb_mois < 6:
#         print(f"⚠️ Pas assez de données pour {code_depot} - {code_article} ({nb_mois} mois)")
#         continue

#     serie = group['quantiteDemandee']

#     try:
#         model = SARIMAX(serie, order=(1,1,1), seasonal_order=(1,1,1,12))
#         results = model.fit(disp=False)

#         forecast = results.get_forecast(steps=3)
#         predicted = forecast.predicted_mean

#         # Tracer si besoin
#         plt.figure(figsize=(10, 5))
#         serie.plot(label='Historique')
#         predicted.plot(label='Prévision', color='red')
#         plt.title(f"Prévision — {code_depot} / {code_article}")
#         plt.xlabel("Mois")
#         plt.ylabel("Quantité")
#         plt.legend()
#         plt.grid(True)
#         plt.tight_layout()
#         plt.show()

#         for date, qty in predicted.items():
#             all_predictions.append({
#                 "codeDepot": code_depot,
#                 "codeArticle": code_article,
#                 "mois": date.strftime('%Y-%m-%d'),
#                 "quantitePrevue": round(qty)
#             })

#         print(f"✅ Prévisions générées pour {code_depot} - {code_article}")

#     except Exception as e:
#         print(f"❌ Erreur sur {code_depot} - {code_article} :", e)

# # Export CSV
# df_export = pd.DataFrame(all_predictions)
# df_export.to_csv("previsions.csv", index=False)
# print("✅ Fichier previsions.csv mis à jour avec codeDepot")





# import pandas as pd
# import matplotlib.pyplot as plt
# from statsmodels.tsa.statespace.sarimax import SARIMAX
# import warnings
# warnings.filterwarnings("ignore")

# # Charger les données groupées
# df = pd.read_csv("data_grouped.csv")

# # S'assurer que les dates sont au bon format
# df['mois'] = pd.to_datetime(df['mois'])

# # Initialiser la liste des prévisions
# all_predictions = []

# # ➤ Grouper par codeDepot ET codeArticle
# for (code_depot, code_article), group in df.groupby(["codeDepot", "codeArticle"]):
#     df_article = group.copy()

#     nb_mois = df_article['mois'].dt.to_period('M').nunique()
#     if nb_mois < 6:
#         print(f"⚠️ Pas assez de données pour {code_article} dans le dépôt {code_depot} ({nb_mois} mois)")
#         continue

#     df_article.set_index('mois', inplace=True)
#     df_article = df_article.asfreq('MS')  # fréquence mensuelle

#     serie = df_article['quantiteDemandee']

#     try:
#         model = SARIMAX(serie, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
#         results = model.fit(disp=False)

#         forecast = results.get_forecast(steps=3)
#         predicted = forecast.predicted_mean

#         for date, qty in predicted.items():
#             all_predictions.append({
#                 "codeDepot": code_depot,
#                 "codeArticle": code_article,
#                 "mois": date.strftime('%Y-%m-%d'),
#                 "quantitePrevue": round(qty)
#             })

#         print(f"✅ Prévisions ajoutées pour {code_article} dans dépôt {code_depot}")

#     except Exception as e:
#         print(f"❌ Erreur pour {code_article} ({code_depot}) :", e)

# # Export CSV
# df_export = pd.DataFrame(all_predictions)
# df_export.to_csv("previsions.csv", index=False)
# print("✅ Fichier 'previsions.csv' généré avec succès ✅")













# # python_scripts/predict_sarima.py

# import pandas as pd
# import matplotlib.pyplot as plt
# from statsmodels.tsa.statespace.sarimax import SARIMAX
# import warnings
# import sys

# warnings.filterwarnings("ignore")

# # ✅ Lire le codeDepot passé en argument
# if len(sys.argv) < 2:
#     print("❌ Veuillez fournir le codeDepot en argument.")
#     print("Exemple : python predict_sarima.py DEPOT123")
#     sys.exit(1)

# code_depot_utilisateur = sys.argv[1]

# # 📥 Charger les données
# df = pd.read_csv("data_grouped.csv")

# # 🗓️ S'assurer que les dates sont bien en datetime
# df['mois'] = pd.to_datetime(df['mois'])

# # ✅ Filtrer selon le codeDepot de l'utilisateur connecté
# df = df[df['codeDepot'] == code_depot_utilisateur]

# if df.empty:
#     print(f"⚠️ Aucun article trouvé pour le dépôt : {code_depot_utilisateur}")
#     sys.exit(0)

# all_predictions = []

# # 🔁 Boucle sur chaque article de ce dépôt
# for code_article, group in df.groupby('codeArticle'):

#     group = group.copy()
#     group.set_index('mois', inplace=True)
#     group = group.asfreq('MS')

#     nb_mois = group.index.to_period('M').nunique()

#     if nb_mois < 6:
#         print(f"⚠️ Pas assez de données pour {code_article} ({nb_mois} mois)")
#         continue

#     serie = group['quantiteDemandee']

#     try:
#         model = SARIMAX(serie, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
#         results = model.fit(disp=False)

#         forecast = results.get_forecast(steps=3)
#         predicted = forecast.predicted_mean

#         # 📊 Tracer facultatif
#         plt.figure(figsize=(10, 5))
#         serie.plot(label='Historique')
#         predicted.plot(label='Prévision', color='red')
#         plt.title(f"Prévision — {code_depot_utilisateur} / {code_article}")
#         plt.xlabel("Mois")
#         plt.ylabel("Quantité")
#         plt.legend()
#         plt.grid(True)
#         plt.tight_layout()
#         plt.show()

#         for date, qty in predicted.items():
#             all_predictions.append({
#                 "codeDepot": code_depot_utilisateur,
#                 "codeArticle": code_article,
#                 "mois": date.strftime('%Y-%m-%d'),
#                 "quantitePrevue": round(qty)
#             })

#         print(f"✅ Prévisions générées pour {code_article}")

#     except Exception as e:
#         print(f"❌ Erreur sur {code_article} :", e)

# # 💾 Export des prévisions
# df_export = pd.DataFrame(all_predictions)
# output_path = f"previsions_{code_depot_utilisateur}.csv"
# df_export.to_csv(output_path, index=False)
# print(f"✅ Fichier {output_path} généré avec succès.")






# import pandas as pd
# import matplotlib.pyplot as plt
# from statsmodels.tsa.statespace.sarimax import SARIMAX
# import warnings
# import sys
# import os

# warnings.filterwarnings("ignore")

# # 📁 Répertoire courant du script
# base_dir = os.path.dirname(os.path.abspath(__file__))

# # ✅ Lire la liste des codes dépôt (séparés par virgule)
# if len(sys.argv) < 2:
#     print("❌ Veuillez fournir les codes de dépôt en argument.")
#     print("Exemple : python predict_sarima.py DEPOT1,DEPOT2")
#     sys.exit(1)

# codes_depot = sys.argv[1].split(",")

# # 📥 Charger les données avec chemin absolu
# data_path = os.path.join(base_dir, "data_grouped.csv")
# df = pd.read_csv(data_path)

# # 🗓️ S'assurer que les dates sont bien en datetime
# df['mois'] = pd.to_datetime(df['mois'])

# # ✅ Filtrer selon les codesDepot de l'utilisateur connecté
# df = df[df['codeDepot'].isin(codes_depot)]

# if df.empty:
#     print(f"⚠️ Aucune donnée trouvée pour les dépôts : {', '.join(codes_depot)}")
#     sys.exit(0)

# all_predictions = []

# # 🔁 Boucle sur chaque combinaison dépôt + article
# for (code_depot, code_article), group in df.groupby(['codeDepot', 'codeArticle']):
#     group = group.copy()
#     group.set_index('mois', inplace=True)
#     group = group.asfreq('MS')

#     nb_mois = group.index.to_period('M').nunique()

#     if nb_mois < 6:
#         print(f"⚠️ Pas assez de données pour {code_depot} - {code_article} ({nb_mois} mois)")
#         continue

#     serie = group['quantiteDemandee']

#     try:
#         model = SARIMAX(serie, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
#         results = model.fit(disp=False)

#         forecast = results.get_forecast(steps=3)
#         predicted = forecast.predicted_mean

#         # 📊 Tracer (optionnel)
#         plt.figure(figsize=(10, 5))
#         serie.plot(label='Historique')
#         predicted.plot(label='Prévision', color='red')
#         plt.title(f"Prévision — {code_depot} / {code_article}")
#         plt.xlabel("Mois")
#         plt.ylabel("Quantité")
#         plt.legend()
#         plt.grid(True)
#         plt.tight_layout()
#         plt.show()

#         for date, qty in predicted.items():
#             all_predictions.append({
#                 "codeDepot": code_depot,
#                 "codeArticle": code_article,
#                 "mois": date.strftime('%Y-%m-%d'),
#                 "quantitePrevue": round(qty)
#             })

#         print(f"✅ Prévisions générées pour {code_depot} - {code_article}")

#     except Exception as e:
#         print(f"❌ Erreur sur {code_depot} - {code_article} :", e)

# # 💾 Export des prévisions
# df_export = pd.DataFrame(all_predictions)
# output_path = os.path.join(base_dir, "previsions.csv")
# df_export.to_csv(output_path, index=False)
# print(f"✅ Fichier {output_path} généré avec succès.")






# import pandas as pd
# import matplotlib.pyplot as plt
# from statsmodels.tsa.statespace.sarimax import SARIMAX
# import warnings
# import sys
# import os
# import io

# # Forcer l'encodage UTF-8 du terminal
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# warnings.filterwarnings("ignore")

# # 📁 Répertoire courant du script
# base_dir = os.path.dirname(os.path.abspath(__file__))

# # ✅ Lire la liste des codes dépôt (séparés par virgule)
# if len(sys.argv) < 2:
#     print("Veuillez fournir les codes de dépôt en argument.")
#     print("Exemple : python predict_sarima.py DEPOT1,DEPOT2")
#     sys.exit(1)

# codes_depot = sys.argv[1].split(",")

# # 📥 Charger les données avec chemin absolu
# data_path = os.path.join(base_dir, "data_grouped.csv")
# df = pd.read_csv(data_path)

# df['codeDepot'] = df['codeDepot'].astype(str).str.strip()  # Nettoyer les espaces

# print("✅ Aperçu du contenu data_grouped.csv :")
# print(df.head(10))

# print("✅ Liste des codes dépôt dans le CSV :", df['codeDepot'].unique())
# print("✅ Liste des codes dépôt fournis     :", codes_depot)


# # 🗓️ S'assurer que les dates sont bien en datetime
# df['mois'] = pd.to_datetime(df['mois'])

# # ✅ Filtrer selon les codesDepot de l'utilisateur connecté
# df = df[df['codeDepot'].isin(codes_depot)]

# print(f"📊 Données après filtre codeDepot : {len(df)} lignes")
# print(df.head())

# if df.empty:
#     print(f"Aucune donnée trouvée pour les dépôts : {', '.join(codes_depot)}")
#     sys.exit(0)

# all_predictions = []

# # 🔁 Boucle sur chaque combinaison dépôt + article
# for (code_depot, code_article), group in df.groupby(['codeDepot', 'codeArticle']):
#     group = group.copy()
#     group.set_index('mois', inplace=True)
#     group = group.asfreq('MS')

#     nb_mois = group.index.to_period('M').nunique()

#     if nb_mois < 6:
#         print(f"Pas assez de données pour {code_depot} - {code_article} ({nb_mois} mois)")
#         continue

#     serie = group['quantiteDemandee']

#     try:
#         model = SARIMAX(serie, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
#         results = model.fit(disp=False)

#         forecast = results.get_forecast(steps=3)
#         predicted = forecast.predicted_mean

#         # 📊 Tracer (optionnel)
#         plt.figure(figsize=(10, 5))
#         serie.plot(label='Historique')
#         predicted.plot(label='Prévision', color='red')
#         plt.title(f"Prévision — {code_depot} / {code_article}")
#         plt.xlabel("Mois")
#         plt.ylabel("Quantité")
#         plt.legend()
#         plt.grid(True)
#         plt.tight_layout()
#         plt.show()

#         for date, qty in predicted.items():
#             all_predictions.append({
#                 "codeDepot": code_depot,
#                 "codeArticle": code_article,
#                 "mois": date.strftime('%Y-%m-%d'),
#                 "quantitePrevue": round(qty)
#             })

#         print(f"Prévisions générées pour {code_depot} - {code_article}")

#     except Exception as e:
#         print(f"Erreur sur {code_depot} - {code_article} :", e)

# # # 💾 Export des prévisions
# # df_export = pd.DataFrame(all_predictions)
# # output_path = os.path.join(base_dir, "previsions.csv")
# # df_export.to_csv(output_path, index=False)
# # print(f"Fichier {output_path} généré avec succès.")


# # 💾 Export des prévisions dans un fichier commun
# print(f"Nombre de prévisions générées : {len(all_predictions)}")
# df_export = pd.DataFrame(all_predictions)

# # 🔁 Assure-toi que ce chemin est correct
# base_dir = os.path.dirname(os.path.abspath(__file__))
# output_path = os.path.join(base_dir, "previsions.csv")

# if os.path.exists(output_path):
#     os.remove(output_path)

# df_export.to_csv(output_path, index=False)
# print(f"✅ Écriture de {len(df_export)} prévisions dans le fichier : {output_path}")
# print(df_export.head())
# print(f"Fichier {output_path} généré avec succès.")











import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
import warnings
import sys
import os
import io

# Forcer l'encodage UTF-8 du terminal
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

warnings.filterwarnings("ignore")

# 📁 Répertoire courant du script
base_dir = os.path.dirname(os.path.abspath(__file__))

# ✅ Lire la liste des codes dépôt (séparés par virgule)
if len(sys.argv) < 2:
    print("❌ Veuillez fournir les codes de dépôt en argument.")
    print("Exemple : python predict_sarima.py DEPOT1,DEPOT2")
    sys.exit(1)

codes_depot = sys.argv[1].split(",")

# 📥 Charger les données avec chemin absolu
data_path = os.path.join(base_dir, "data_grouped.csv")
df = pd.read_csv(data_path)

df['codeDepot'] = df['codeDepot'].astype(str).str.strip()

print("✅ Aperçu du contenu data_grouped.csv :")
print(df.head(10))
print("✅ Liste des codes dépôt dans le CSV :", df['codeDepot'].unique())
print("✅ Liste des codes dépôt fournis     :", codes_depot)

# 🗓️ Dates en datetime
df['mois'] = pd.to_datetime(df['mois'])

# ✅ Filtrer les codes dépôt
df = df[df['codeDepot'].isin(codes_depot)]

print(f"📊 Données après filtre codeDepot : {len(df)} lignes")
if df.empty:
    print(f"⚠️ Aucune donnée trouvée pour les dépôts : {', '.join(codes_depot)}")
    sys.exit(0)

all_predictions = []

# 🔁 Boucle prévision
for (code_depot, code_article), group in df.groupby(['codeDepot', 'codeArticle']):
    group = group.copy()
    group.set_index('mois', inplace=True)
    group = group.asfreq('MS')

    nb_mois = group.index.to_period('M').nunique()

    if nb_mois < 6:
        print(f"⚠️ Pas assez de données pour {code_depot} - {code_article} ({nb_mois} mois)")
        continue

    serie = group['quantiteDemandee']

    try:
        model = SARIMAX(serie, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
        results = model.fit(disp=False)
        forecast = results.get_forecast(steps=3)
        predicted = forecast.predicted_mean

        for date, qty in predicted.items():
            prediction = {
                "codeDepot": code_depot,
                "codeArticle": code_article,
                "mois": date.strftime('%Y-%m-%d'),
                "quantitePrevue": round(qty)
            }
            all_predictions.append(prediction)
            print(f"📈 {prediction}")  # 👈 Affiche chaque prévision générée

        print(f"✅ Prévisions générées pour {code_depot} - {code_article}")

    except Exception as e:
        print(f"❌ Erreur sur {code_depot} - {code_article} :", e)

# 💾 Export des prévisions
print(f"📦 Nombre total de prévisions : {len(all_predictions)}")
if not all_predictions:
    print("⚠️ Aucune prévision à sauvegarder.")
    sys.exit(0)

df_export = pd.DataFrame(all_predictions)
output_path = os.path.join(base_dir, "previsions.csv")

# 🔄 Supprimer le fichier précédent s'il existe
if os.path.exists(output_path):
    os.remove(output_path)

df_export.to_csv(output_path, index=False)

print(f"✅ Écriture de {len(df_export)} prévisions dans le fichier : {output_path}")
print(df_export.head(5))  # 👈 Voir un échantillon
