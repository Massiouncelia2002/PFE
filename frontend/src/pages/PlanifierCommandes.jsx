import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayoutPlannificateur from './AdminLayoutPlannificateur'; 

const PlanifierCommandes = () => {
  const { state } = useLocation();
  const article = state?.article;

  const [resultat, setResultat] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!article?.codeArticle || !article?.codeDepot) return;

    const fetchEtPartager = async () => {
      try {
       
        const clientsRes = await axios.get(
          `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
          { headers }
        );

        const clients = clientsRes.data;

        if (!clients || clients.length === 0) {
          setResultat([]);
          setMessage("Aucune commande trouvée pour cet article.");
          return;
        }


        const clientsAvecCommande = clients.map((c) => ({
          codeClient: c.codeClient,
          nomClient: c.nomClient,
          codeCommande: c.codeCommande,
          quantiteDemandee: c.quantiteDemandee,
          dateCommande: c.dateCommande,
        }));

       
        const partageRes = await axios.post(
          "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
          {
            clients: clientsAvecCommande,
            codeArticle: article.codeArticle,
            codeDepot: article.codeDepot,
          }
        );

        setResultat(partageRes.data);
        setMessage("");
      } catch (err) {
        console.error("❌ Erreur globale :", err);
        setMessage("Erreur serveur lors de la planification.");
      }
    };

    fetchEtPartager();
  }, []); 

  if (!article) return <p>❌ Aucun article sélectionné.</p>;

  return (
    <AdminLayoutPlannificateur>
    <div className="container mt-4">
      <h3>
        Planification pour l'article : {article.designation} ({article.codeArticle})
      </h3>

      {message && <div className="alert alert-danger mt-2">{message}</div>}

      {resultat.length > 0 ? (
        <>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Client</th>
                <th>Code Client</th>
                <th>Date de commande</th>
                <th>Quantité demandée</th>
                <th>Quantité à livrer</th>
              </tr>
            </thead>
            <tbody>
              {resultat.map((client, index) => (
                <tr key={index}>
                  <td>{client.nomClient}</td>
                  <td>{client.codeClient}</td>
                  <td>{client.dateCommande || "-"}</td>
                  <td>{client.quantiteDemandee}</td>
                  <td>{client.quantiteALivrer}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="btn btn-success mt-4"
            onClick={() =>
              navigate("/AffecterVehiculePage", {
                state: {
                  article,
                  clientsPlanifies: resultat,
                },
              })
            }
          >
            ✅ Affecter les véhicules
          </button>
        </>
      ) : (
        <p className="text-muted mt-3">Aucune commande à planifier pour cet article.</p>
      )}
    </div>
    </AdminLayoutPlannificateur>
  );
};

export default PlanifierCommandes;
