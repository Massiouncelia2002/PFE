import psycopg2
import pandas as pd

# Remplace ces valeurs par les tiennes
host = "localhost"
port = "5432"
dbname = "nom_de_ta_base"
user = "ton_utilisateur"
password = "ton_mot_de_passe"

try:
    # Connexion à PostgreSQL
    conn = psycopg2.connect(
        host=host,
        port=port,
        dbname=dbname,
        user=user,
        password=password
    )

    print("✅ Connexion réussie à PostgreSQL !")

    # Exemple de requête : total des commandes par mois
    query = """
    SELECT 
        DATE_TRUNC('month', c."dateCommande") AS mois,
        SUM(c.quantite) AS total_quantite
    FROM commande c
    GROUP BY mois
    ORDER BY mois;
    """

    df = pd.read_sql_query(query, conn)
    print(df)

    conn.close()

except Exception as e:
    print("❌ Erreur de connexion ou d'exécution :", e)
