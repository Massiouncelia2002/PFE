import React, { useEffect, useState } from "react";
import axios from "axios";

function ListeCommandesPlanifiees({ clientId }) {
  const [commandes, setCommandes] = useState([]);
  const [depotId, setDepotId] = useState(""); 
  const [token, setToken] = useState(""); 

  useEffect(() => {
    if (depotId) {
      axios
        .get(`http://localhost:5000/commandes/depot/${depotId}`)
        .then((res) => setCommandes(res.data))
        .catch((err) => console.error(err));
    }
  }, [depotId]);

  const genererBonLivraison = async (commandePlanifieId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/commandePlanifie//genererBonLivraison/:commandePlanifieId${commandePlanifieId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const { downloadUrl } = response.data;

      
      window.open(`http://localhost:5000${downloadUrl}`, "_blank");
    } catch (error) {
      console.error("Erreur génération bon de livraison :", error);
      alert("Erreur lors de la génération du bon de livraison.");
    }
  };

  return (
    <div>
      <h2>Commandes planifiées pour le dépôt {depotId}</h2>

      <ul>
        {commandes.map((cmd) => (
          <li key={cmd.commandePlanifieId}>
            Commande : {cmd.codeCommande} - Quantité : {cmd.quantiteTransporte}
            <button
              onClick={() => genererBonLivraison(cmd.commandePlanifieId)}
              style={{ marginLeft: "10px" }}
            >
              Générer Bon de Livraison
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListeCommandesPlanifiees;
