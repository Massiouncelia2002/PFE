
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AffecterVehiculePage = () => {
//   const { state } = useLocation();
//   const { article, clientsPlanifies } = state || {};

//   const [affectations, setAffectations] = useState([
//     { matricule: "", quantiteTransportee: "", dateDepartPrevue: "", heureDepartPrevue: "" }
//   ]);

//   const [vehiculesDisponibles, setVehiculesDisponibles] = useState([]);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   const handleChange = (index, field, value) => {
//     const updated = [...affectations];
//     updated[index][field] = value;
//     setAffectations(updated);
//   };

//   const ajouterLigne = () => {
//     setAffectations([
//       ...affectations,
//       { matricule: "", quantiteTransportee: "", dateDepartPrevue: "", heureDepartPrevue: "" }
//     ]);
//   };

//   const fetchVehiculesDisponibles = async (date, heure) => {
//     if (!date || !heure) return;

//     const depart = new Date(`${date}T${heure}`);
//     const retour = new Date(depart);
//     retour.setHours(retour.getHours() + 4); // durée estimée : 4h

//     const params = {
//       dateHeureDepart: depart.toISOString(),
//       dateHeureRetour: retour.toISOString(),
//     };

//     try {
//       const res = await axios.get("http://localhost:5000/api/livraison/vehicules-disponibles", {
//         headers,
//         params,
//       });
//       setVehiculesDisponibles(res.data);
//     } catch (err) {
//       console.error("❌ Erreur récupération véhicules :", err);
//     }
//   };

//   const handleDateOrHeureChange = (index, field, value) => {
//     handleChange(index, field, value);

//     const date = field === "dateDepartPrevue" ? value : affectations[index].dateDepartPrevue;
//     const heure = field === "heureDepartPrevue" ? value : affectations[index].heureDepartPrevue;

//     if (date && heure) {
//       fetchVehiculesDisponibles(date, heure);
//     }
//   };

//   const envoyer = async () => {
//     try {
//       const codePlanification = clientsPlanifies[0]?.codePlanification;
//       if (!codePlanification) {
//         setMessage("Code de planification manquant.");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/livraison/affecter-vehicules",
//         { codePlanification, affectations },
//         { headers }
//       );

//       setMessage("✅ Affectation réussie !");
//       console.log("📦 Résultat :", res.data);
//       navigate("/");
//     } catch (err) {
//       console.error("❌ Erreur :", err);
//       setMessage("Erreur lors de l'affectation.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Affecter les véhicules pour : {article?.designation}</h3>

//       {affectations.map((ligne, index) => (
//         <div key={index} className="row g-2 mb-3">
//           <div className="col-md-3">
//             <select
//               className="form-select"
//               value={ligne.matricule}
//               onChange={(e) => handleChange(index, "matricule", e.target.value)}
//             >
//               <option value="">-- Sélectionner un véhicule --</option>
//               {vehiculesDisponibles.map((v) => (
//                 <option key={v.matricule} value={v.matricule}>
//                   {v.matricule} | Capacité: {v.capaciteVehicule} | Statut: {v.statut}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-2">
//             <input
//               type="number"
//               placeholder="Qté transportée"
//               className="form-control"
//               value={ligne.quantiteTransportee}
//               onChange={(e) => handleChange(index, "quantiteTransportee", e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <input
//               type="date"
//               className="form-control"
//               value={ligne.dateDepartPrevue}
//               onChange={(e) => handleDateOrHeureChange(index, "dateDepartPrevue", e.target.value)}
//             />
//           </div>
//           <div className="col-md-2">
//             <input
//               type="time"
//               className="form-control"
//               value={ligne.heureDepartPrevue}
//               onChange={(e) => handleDateOrHeureChange(index, "heureDepartPrevue", e.target.value)}
//             />
//           </div>
//         </div>
//       ))}

//       <button className="btn btn-outline-primary me-2" onClick={ajouterLigne}>
//         + Ajouter un véhicule
//       </button>
//       <button className="btn btn-success" onClick={envoyer}>
//         ✅ Confirmer l'affectation
//       </button>

//       {message && <div className="alert alert-info mt-3">{message}</div>}
//     </div>
//   );
// };

// export default AffecterVehiculePage;










// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AffecterVehiculePage = () => {
//   const { state } = useLocation();
//   const { article } = state || {};

//   const [clients, setClients] = useState([]);
//   const [affectations, setAffectations] = useState([]);
//   const [vehiculesDisponibles, setVehiculesDisponibles] = useState([]);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/clients-avec-quantiteALivrer/${article.codeArticle}`,
//           { headers }
//         );
//         setClients(res.data);
//         const initialAffectations = res.data.map((client) => ({
//           codeClient: client.codeClient,
//           quantiteTransportee: client.quantiteALivrer,
//           matricule: "",
//           dateDepartPrevue: "",
//           heureDepartPrevue: ""
//         }));
//         setAffectations(initialAffectations);
//       } catch (err) {
//         console.error("❌ Erreur récupération clients :", err);
//         setMessage("Erreur lors de la récupération des données clients.");
//       }
//     };

//     if (article?.codeArticle) fetchClients();
//   }, [article]);

//   const handleChange = (index, field, value) => {
//     const updated = [...affectations];
//     updated[index][field] = value;
//     setAffectations(updated);
//   };

//   const fetchVehiculesDisponibles = async (date, heure) => {
//     if (!date || !heure) return;

//     const depart = new Date(`${date}T${heure}`);
//     const retour = new Date(depart);
//     retour.setHours(retour.getHours() + 4);

//     const params = {
//       dateHeureDepart: depart.toISOString(),
//       dateHeureRetour: retour.toISOString(),
//     };

//     try {
//       const res = await axios.get("http://localhost:5000/api/livraison/vehicules-disponibles", {
//         headers,
//         params,
//       });
//       setVehiculesDisponibles(res.data);
//     } catch (err) {
//       console.error("❌ Erreur récupération véhicules :", err);
//     }
//   };

//   const handleDateOrHeureChange = (index, field, value) => {
//     handleChange(index, field, value);

//     const date = field === "dateDepartPrevue" ? value : affectations[index].dateDepartPrevue;
//     const heure = field === "heureDepartPrevue" ? value : affectations[index].heureDepartPrevue;

//     if (date && heure) {
//       fetchVehiculesDisponibles(date, heure);
//     }
//   };

//   const envoyer = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/livraison/affecter-vehicules",
//         { codeArticle: article.codeArticle, affectations },
//         { headers }
//       );

//       setMessage("✅ Affectation réussie !");
//       console.log("📦 Résultat :", res.data);
//       navigate("/");
//     } catch (err) {
//       console.error("❌ Erreur :", err);
//       setMessage("Erreur lors de l'affectation.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Affecter les véhicules pour : {article?.designation}</h3>

//       {affectations.map((ligne, index) => (
//         <div key={index} className="row g-2 mb-3">
//           <div className="col-md-2">
//             <span className="form-control bg-light">{ligne.codeClient}</span>
//           </div>
//           <div className="col-md-2">
//             <span className="form-control bg-light">{ligne.quantiteTransportee}</span>
//           </div>
//           <div className="col-md-3">
//             <select
//               className="form-select"
//               value={ligne.matricule}
//               onChange={(e) => handleChange(index, "matricule", e.target.value)}
//             >
//               <option value="">-- Véhicule --</option>
//               {vehiculesDisponibles.map((v) => (
//                 <option key={v.matricule} value={v.matricule}>
//                   {v.matricule} | Capacité: {v.capaciteVehicule}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-2">
//             <input
//               type="date"
//               className="form-control"
//               value={ligne.dateDepartPrevue}
//               onChange={(e) => handleDateOrHeureChange(index, "dateDepartPrevue", e.target.value)}
//             />
//           </div>
//           <div className="col-md-2">
//             <input
//               type="time"
//               className="form-control"
//               value={ligne.heureDepartPrevue}
//               onChange={(e) => handleDateOrHeureChange(index, "heureDepartPrevue", e.target.value)}
//             />
//           </div>
//         </div>
//       ))}

//       <button className="btn btn-success" onClick={envoyer}>
//         ✅ Confirmer l'affectation
//       </button>

//       {message && <div className="alert alert-info mt-3">{message}</div>}
//     </div>
//   );
// };

// export default AffecterVehiculePage;




import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AffecterVehiculePage = () => {
  const { state } = useLocation();
  const { article } = state || {};

  const [clients, setClients] = useState([]);
  const [affectations, setAffectations] = useState([]);
  const [vehiculesDisponibles, setVehiculesDisponibles] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/articleDepot/clients-avec-quantiteALivrer/${article.codeArticle}`,
          { headers }
        );
        setClients(res.data);
        const initial = res.data.map((client) => ({
          codeClient: client.codeClient,
          quantiteTransportee: client.quantiteALivrer,
          matricule: "",
          dateDepartPrevue: "",
          heureDepartPrevue: ""
        }));
        setAffectations(initial);
      } catch (err) {
        console.error("❌ Erreur récupération clients :", err);
        setMessage("Erreur lors de la récupération des données clients.");
      }
    };

    if (article?.codeArticle) fetchClients();
  }, [article]);

  const handleChange = (index, field, value) => {
    const updated = [...affectations];
    updated[index][field] = value;
    setAffectations(updated);
  };

  const fetchVehiculesDisponibles = async (date, heure) => {
    if (!date || !heure) return;
    const depart = new Date(`${date}T${heure}`);
    const retour = new Date(depart);
    retour.setHours(retour.getHours() + 4);

    const params = {
      dateHeureDepart: depart.toISOString(),
      dateHeureRetour: retour.toISOString(),
    };

    try {
      const res = await axios.get("http://localhost:5000/api/livraison/vehicules-disponibles", {
        headers,
        params,
      });
      setVehiculesDisponibles(res.data);
    } catch (err) {
      console.error("❌ Erreur récupération véhicules :", err);
    }
  };

  const handleDateOrHeureChange = (index, field, value) => {
    handleChange(index, field, value);

    const date = field === "dateDepartPrevue" ? value : affectations[index].dateDepartPrevue;
    const heure = field === "heureDepartPrevue" ? value : affectations[index].heureDepartPrevue;

    if (date && heure) {
      fetchVehiculesDisponibles(date, heure);
    }
  };

  const envoyer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/livraison/affecter-vehicules",
        { codeArticle: article.codeArticle, affectations },
        { headers }
      );

      setMessage("✅ Affectation réussie !");
      console.log("📦 Résultat :", res.data);
      navigate("/");
    } catch (err) {
      console.error("❌ Erreur :", err);
      setMessage("Erreur lors de l'affectation.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Affectation des véhicules – Article : {article?.designation}</h3>

      {message && <div className="alert alert-info">{message}</div>}

      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>Code Client</th>
            <th>Qté à livrer</th>
            <th>Véhicule</th>
            <th>Date Départ</th>
            <th>Heure Départ</th>
          </tr>
        </thead>
        <tbody>
          {affectations.map((ligne, index) => (
            <tr key={index}>
              <td>{ligne.codeClient}</td>
              <td>{ligne.quantiteTransportee}</td>
              <td>
                <select
                  className="form-select"
                  value={ligne.matricule}
                  onChange={(e) => handleChange(index, "matricule", e.target.value)}
                >
                  <option value="">-- Véhicule --</option>
                  {vehiculesDisponibles.map((v) => (
                    <option key={v.matricule} value={v.matricule}>
                      {v.matricule} | {v.capaciteVehicule}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  value={ligne.dateDepartPrevue}
                  onChange={(e) => handleDateOrHeureChange(index, "dateDepartPrevue", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={ligne.heureDepartPrevue}
                  onChange={(e) => handleDateOrHeureChange(index, "heureDepartPrevue", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-success" onClick={envoyer}>
        ✅ Confirmer l'affectation
      </button>
    </div>
  );
};

export default AffecterVehiculePage;
