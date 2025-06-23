# import psycopg2
# import os
# from dotenv import load_dotenv
# from pathlib import Path

# # Charger le fichier .env
# dotenv_path = Path(__file__).resolve().parent.parent / 'backend' / '.env'
# load_dotenv(dotenv_path=dotenv_path)

# # Lire les infos de connexion
# host = os.getenv("DB_HOST")
# port = os.getenv("DB_PORT")
# dbname = os.getenv("DB_NAME")
# user = os.getenv("DB_USER")
# password = os.getenv("DB_PASSWORD")

# print(f"🔍 Connexion à PostgreSQL sur {host}:{port} avec utilisateur {user}")

# try:
#     conn = psycopg2.connect(
#         host=host,
#         port=port,
#         dbname=dbname,
#         user=user,
#         password=password
#     )
#     print("✅ Connexion réussie à PostgreSQL !")
#     conn.close()

# except Exception as e:
#     print("❌ Erreur de connexion :", e)






# python_scripts/connect_pg.py

import psycopg2
import os
from dotenv import load_dotenv
from pathlib import Path

# Charger les variables d'environnement depuis ../backend/.env
dotenv_path = Path(__file__).resolve().parent.parent / 'backend' / '.env'
load_dotenv(dotenv_path=dotenv_path)


def get_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD")
        )
        print("✅ Connexion PostgreSQL réussie")
        return conn
    except Exception as e:
        print("❌ Erreur de connexion :", e)
        return None
