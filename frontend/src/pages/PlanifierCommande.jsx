import React, { useEffect, useState } from "react";

function PlanifierCommande() {
  const [commandes, setCommandes] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);

  const [vehiculesDispo, setVehiculesDispo] = useState([]);
  const [vehiculeSelectionne, setVehiculeSelectionne] = useState(""); 
  const [vehiculesSelectionnes, setVehiculesSelectionnes] = useState([]); 
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    const fetchData = async () => {
      try {
    
        const commandesRes = await fetch("http://localhost:5000/api/commande/getcommandes");
        const rawCommandes = await commandesRes.json();

        
        const regrouped = rawCommandes.data.reduce((acc, curr) => {
          let existing = acc.find(c => c.codeCommande === curr.codeCommande);
          if (!existing) {
            existing = {
              codeCommande: curr.codeCommande,
              dateCommande: curr.dateCommande,
              client: {
                codeClient: curr.codeClient,
                nomClient: curr.nomClient
              },
              articleCommandeClients: []
            };
            acc.push(existing);
          }
          existing.articleCommandeClients.push({
            codeArticle: curr.codeArticle,
            designation: curr.designation,
            quantiteDemandee: curr.quantiteDemandee
          });
          return acc;
        }, []);

        setCommandes(regrouped);

        
        const vehiculesRes = await fetch("http://localhost:5000/vehicules");
        const vehiculesData = await vehiculesRes.json();
        setVehiculesDispo(vehiculesData || []);
      } catch (err) {
        console.error("Erreur de chargement des données :", err);
        setMessage("Erreur de chargement des données");
      }
    };

    fetchData();
  }, []);

  
  const handleCommandeChange = (e) => {
    const selectedIndex = parseInt(e.target.value);
    setSelectedCommande(commandes[selectedIndex]);
  };

  
  const handleVehiculeSelectionChange = (e) => {
    setVehiculeSelectionne(e.target.value);
  };

 
  const handleAjouterVehicule = () => {
    if (!vehiculeSelectionne) {
      setMessage("Veuillez choisir un véhicule à ajouter.");
      return;
    }

    
    if (vehiculesSelectionnes.find(v => v.matricule === vehiculeSelectionne)) {
      setMessage("Ce véhicule est déjà ajouté.");
      return;
    }

   
    const vehicule = vehiculesDispo.find(v => v.matricule === vehiculeSelectionne);
    if (!vehicule) {
      setMessage("Véhicule non trouvé.");
      return;
    }

    
    setVehiculesSelectionnes(prev => [...prev, { matricule: vehicule.matricule, quantiteTransporte: 0 }]);
    setMessage("");
  };

  
  const handleQuantiteChange = (matricule, quantite) => {
    setVehiculesSelectionnes(prev =>
      prev.map(v =>
        v.matricule === matricule ? { ...v, quantiteTransporte: quantite } : v
      )
    );
  };

 
  const handlePlanification = async () => {
    if (!selectedCommande) {
      setMessage("Veuillez sélectionner une commande.");
      return;
    }
    if (vehiculesSelectionnes.length === 0) {
      setMessage("Veuillez ajouter au moins un véhicule avec quantité.");
      return;
    }

    
    for (const v of vehiculesSelectionnes) {
      if (!v.quantiteTransporte || v.quantiteTransporte <= 0) {
        setMessage(`Quantité invalide pour le véhicule ${v.matricule}.`);
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/commandePlanifie/planifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeCommande: selectedCommande.codeCommande,
          vehicules: vehiculesSelectionnes
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Commande planifiée avec succès !");
        // Reset
        setSelectedCommande(null);
        setVehiculesSelectionnes([]);
        setVehiculeSelectionne("");
      } else {
        setMessage(result.error || "Erreur lors de la planification.");
      }
    } catch (error) {
      console.error("Erreur lors de la planification :", error);
      setMessage("Erreur serveur.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Planifier une commande</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Sélectionner une commande :</label>
        <select
          className="w-full border rounded px-3 py-2"
          onChange={handleCommandeChange}
          value={selectedCommande ? commandes.indexOf(selectedCommande) : ""}
        >
          <option value="">-- Choisir une commande --</option>
          {commandes.map((commande, index) => (
            <option key={index} value={index}>
              {commande.codeCommande} - {commande.client.nomClient}
            </option>
          ))}
        </select>
      </div>

   
      {selectedCommande && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <p><strong>Date :</strong> {new Date(selectedCommande.dateCommande).toLocaleDateString()}</p>
          <p><strong>Client :</strong> {selectedCommande.client?.nomClient}</p>
          <p className="mt-2 font-semibold">Articles commandés :</p>
          <ul className="list-disc list-inside">
            {selectedCommande.articleCommandeClients.map((article, idx) => (
              <li key={idx}>
                {article.designation || article.codeArticle} - Quantité : {article.quantiteDemandee}
              </li>
            ))}
          </ul>
        </div>
      )}

      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Choisir un véhicule disponible :</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={vehiculeSelectionne}
          onChange={handleVehiculeSelectionChange}
        >
          <option value="">-- Choisir un véhicule --</option>
          {vehiculesDispo.map(v => (
            <option key={v.matricule} value={v.matricule}>
              {v.matricule} - Capacité: {v.capaciteVehicule} - Statut: {v.statut}
            </option>
          ))}
        </select>
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleAjouterVehicule}
        >
          Ajouter véhicule
        </button>
      </div>

    
      {vehiculesSelectionnes.length > 0 && (
        <div className="mb-6 border p-4 rounded bg-gray-100">
          <p className="font-semibold mb-3">Véhicules sélectionnés :</p>
          {vehiculesSelectionnes.map(v => (
            <div key={v.matricule} className="flex items-center space-x-4 mb-2">
              <span className="w-1/2">{v.matricule}</span>
              <input
                type="number"
                min="1"
                placeholder="Quantité transportée"
                value={v.quantiteTransporte}
                onChange={(e) => handleQuantiteChange(v.matricule, parseInt(e.target.value) || 0)}
                className="w-1/3 border rounded px-2 py-1"
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handlePlanification}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Planifier la commande
      </button>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}

export default PlanifierCommande;
