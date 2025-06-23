# python_scripts/extract_data.py

import pandas as pd
from connect_pg import get_connection

conn = get_connection()

if conn:
    query = """
    SELECT 
      ac."codeArticle", 
      cc."dateCommande", 
      ac."quantiteDemandee"
    FROM "commandeClients" cc
    JOIN "articlesCommandeClient" ac ON cc."codeCommande" = ac."codeCommande"
    """

    df = pd.read_sql_query(query, conn)
    conn.close()

    df.to_csv("commandes.csv", index=False)
    print("✅ Données enregistrées dans commandes.csv")
else:
    print("⚠️ Connexion échouée.")
