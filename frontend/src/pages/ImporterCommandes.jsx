


import React, { useState, useEffect } from "react";

const ImporterCommandes = () => {
  const [fichier, setFichier] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [commandes, setCommandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
  };




  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fichier) {
    setMessage("Veuillez sélectionner un fichier Excel.");
    setType("danger");
    return;
  }

  const formData = new FormData();
  formData.append("file", fichier);

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/api/commande/commandes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });

    const result = await response.json();

    if (response.ok && result.success) {
      setType("success");
      setMessage(result.message || "Fichier importé avec succès.");
      fetchCommandesParDepot(); // recharge les commandes liées à tes dépôts
    } else {
      setType("danger");
      setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi du fichier :", error);
    setType("danger");
    setMessage("Erreur lors de l'envoi du fichier.");
  }
};

const fetchCommandes = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/commande/getcommandes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (response.ok) {
      setCommandes(result.data || []);
    } else {
      setMessage(result.error || "Erreur lors du chargement des commandes.");
      setType("danger");
    }
  } catch (error) {
    console.error("Erreur de récupération :", error);
  }
};

const fetchCommandesParDepot = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/commande/getcommandesByDepot", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (response.ok) {
      setCommandes(result.data || []);
    } else {
      setMessage(result.error || "Erreur lors du chargement des commandes.");
      setType("danger");
    }
  } catch (error) {
    console.error("Erreur de récupération des commandes :", error);
  }
};






  useEffect(() => {
    fetchCommandesParDepot();
  }, []);

  const commandesFiltrees = commandes.filter((cmd) => {
    const recherche = searchTerm.toLowerCase();
    const matchTexte =
      (cmd.codeClient && cmd.codeClient.toLowerCase().includes(recherche)) ||
      (cmd.nomClient && cmd.nomClient.toLowerCase().includes(recherche)) ||
      (cmd.codeArticle && cmd.codeArticle.toLowerCase().includes(recherche)) ||
      (cmd.codeCommande && cmd.codeCommande.toLowerCase().includes(recherche)) ||
      (cmd.designation && cmd.designation.toLowerCase().includes(recherche));

    const dateCmd = new Date(cmd.dateCommande);
    const dansPlage =
      (!dateDebut || dateCmd >= new Date(dateDebut)) &&
      (!dateFin || dateCmd <= new Date(dateFin));

    return matchTexte && dansPlage;
  });

  return (
    <div className="container mt-5">
      <h2>Importer les Commandes Clients</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-3">
          Importer
        </button>
        <button type="button" onClick={fetchCommandes} className="btn btn-success">
          Toutes les commandes
        </button>
      </form>

      {message && (
        <div className={`alert alert-${type} mt-3`} role="alert">
          {message}
        </div>
      )}

      {/* Filtres */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Rechercher client, article, code..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateDebut" className="d-block">Date début</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateFin" className="d-block">Date fin</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau */}
      {(searchTerm.trim() || dateDebut || dateFin) && commandesFiltrees.length > 0 && (
        <table className="table table-bordered mt-4">
          <thead className="table-light">
            <tr>
              <th>Code Commande</th>
              <th>Date</th>
              <th>Code Client</th>
              <th>Nom Client</th>
              <th>Code Article</th>
              <th>Désignation</th>
              <th>Quantité Demandée</th>
            </tr>
          </thead>
          <tbody>
            {commandesFiltrees.map((cmd, index) => (
              <tr key={index}>
                <td>{cmd.codeCommande}</td>
                <td>{new Date(cmd.dateCommande).toLocaleDateString()}</td>
                <td>{cmd.codeClient}</td>
                <td>{cmd.nomClient}</td>
                <td>{cmd.codeArticle}</td>
                <td>{cmd.designation}</td>
                <td>{cmd.quantiteDemandee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Filtrage commandes utilisateur */}
      <button
        type="button"
        onClick={fetchCommandesParDepot}
        className="btn btn-warning mt-3"
      >
        Filtrer mes commandes
      </button>

      {/* Aucun résultat */}
      {(searchTerm.trim() || dateDebut || dateFin) && commandesFiltrees.length === 0 && (
        <div className="alert alert-info mt-4">
          Aucun résultat trouvé pour la recherche.
        </div>
      )}
    </div>
  );
};

export default ImporterCommandes;




















  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!fichier) {
  //     setMessage("Veuillez sélectionner un fichier Excel.");
  //     setType("danger");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", fichier);

  //   try {
  //     const response = await fetch("http://localhost:5000/api/commande/commandes", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const result = await response.json();

  //     if (response.ok && result.success) {
  //       setType("success");
  //       setMessage(result.message || "Fichier importé avec succès.");
  //       fetchCommandesParDepot();
  //     } else {
  //       setType("danger");
  //       setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
  //     }
  //   } catch (error) {
  //     setType("danger");
  //     setMessage("Erreur lors de l'envoi du fichier.");
  //   }
  // };

  // const fetchCommandes = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/commande/getcommandes");
  //     const result = await response.json();
  //     if (response.ok) {
  //       setCommandes(result.data || []);
  //     } else {
  //       setMessage(result.error || "Erreur lors du chargement des commandes.");
  //       setType("danger");
  //     }
  //   } catch (error) {
  //     console.error("Erreur de récupération :", error);
  //   }
  // };

  // const fetchCommandesParDepot = async () => {
  //   try {
  //     const idUtilisateur = localStorage.getItem("idUtilisateur");
  //     const response = await fetch(`http://localhost:5000/api/commande/getcommandesByDepot/${idUtilisateur}`);
  //     const result = await response.json();
  //     if (response.ok) {
  //       setCommandes(result.data || []);
  //     } else {
  //       setMessage(result.error || "Erreur lors du chargement des commandes.");
  //       setType("danger");
  //     }
  //   } catch (error) {
  //     console.error("Erreur de récupération des commandes :", error);
  //   }
  // }; 