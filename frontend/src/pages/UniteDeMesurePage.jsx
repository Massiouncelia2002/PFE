// import React, { useState, useEffect } from "react";

// export default function UniteDeMesurePage() {
//   const [unites, setUnites] = useState([]);
//   const [nom, setNom] = useState("");
//   const [type, setType] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUnites();
//   }, []);

//   async function fetchUnites() {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/unites");  
//       if (!res.ok) throw new Error("Erreur lors du chargement");
//       const data = await res.json();
//       setUnites(data);
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleAddUnite(e) {
//     e.preventDefault();
//     if (!nom.trim() || !type.trim()) {
//       alert("Remplis tous les champs");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5000/api/unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nom, type }),
//       });
//       if (!res.ok) throw new Error("Erreur ajout unité");
//       setNom("");
//       setType("");
//       fetchUnites();
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   async function handleDeleteUnite(id) {
//     if (!window.confirm("Confirmer la suppression ?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/unites/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Erreur suppression unité");
//       fetchUnites();
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <div style={{ maxWidth: 500, margin: "auto" }}>
//       <h1>Gestion des unités de mesure</h1>

//       <form onSubmit={handleAddUnite} style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Nom (ex: kg, boîte)"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//           required
//           style={{ marginRight: 10 }}
//         />
//         <input
//           type="text"
//           placeholder="Type (ex: base,conditionnement)"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           required
//           style={{ marginRight: 10 }}
//         />
//         <button type="submit">Ajouter</button>
//       </form>

//       {loading ? (
//         <p>Chargement...</p>
//       ) : unites.length === 0 ? (
//         <p>Aucune unité enregistrée.</p>
//       ) : (
//         <ul style={{ listStyle: "none", paddingLeft: 0 }}>
//           {unites.map((u) => (
//             <li key={u.id} style={{ marginBottom: 8 }}>
//               <b>{u.nom}</b> ({u.type}){" "}
//               <button
//                 onClick={() => handleDeleteUnite(u.id)}
//                 style={{ marginLeft: 10, color: "red" }}
//               >
//                 Supprimer
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }








// import React, { useState, useEffect } from "react";

// export default function UniteDeMesurePage() {
//   const [unites, setUnites] = useState([]);
//   const [nom, setNom] = useState("");
//   const [type, setType] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUnites();
//   }, []);

//   async function fetchUnites() {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/unites");
//       if (!res.ok) throw new Error("Erreur lors du chargement");
//       const data = await res.json();
//       setUnites(data);
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleAddUnite(e) {
//     e.preventDefault();
//     if (!nom.trim() || !type.trim()) {
//       alert("Remplis tous les champs");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5000/api/unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nom, type }),
//       });
//       if (!res.ok) throw new Error("Erreur ajout unité");
//       setNom("");
//       setType("");
//       fetchUnites();
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   async function handleDeleteUnite(id) {
//     if (!window.confirm("Confirmer la suppression ?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/unites/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Erreur suppression unité");
//       fetchUnites();
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Gestion des unités de mesure
//       </h1>

//       <form onSubmit={handleAddUnite} className="mb-6 flex flex-col md:flex-row gap-3">
//         <input
//           type="text"
//           placeholder="Nom (ex: kg, boîte)"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//           required
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//         />
//         <input
//           type="text"
//           placeholder="Type (ex: base, conditionnement)"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           required
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Ajouter
//         </button>
//       </form>

//       {loading ? (
//         <p className="text-center text-gray-500">Chargement...</p>
//       ) : unites.length === 0 ? (
//         <p className="text-center text-gray-500">Aucune unité enregistrée.</p>
//       ) : (
//         <ul className="space-y-3">
//           {unites.map((u) => (
//             <li
//               key={u.id}
//               className="flex justify-between items-center p-3 border border-gray-200 rounded-lg shadow-sm"
//             >
//               <span>
//                 <b>{u.nom}</b> ({u.type})
//               </span>
//               <button
//                 onClick={() => handleDeleteUnite(u.id)}
//                 className="text-red-600 hover:underline"
//               >
//                 Supprimer
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";

export default function UniteDeMesurePage() {
  const [unites, setUnites] = useState([]);
  const [nom, setNom] = useState("");
  const [abreviation, setAbreviation] = useState("");
  const [type, setType] = useState("base");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUnites();
  }, []);

  async function fetchUnites() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/unites");
      if (!res.ok) throw new Error("Erreur lors du chargement");
      const data = await res.json();
      setUnites(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUnite(e) {
    e.preventDefault();
    if (!nom.trim() || !abreviation.trim() || !type) {
      alert("Tous les champs sont requis");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/unites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, abreviation, type }),
      });
      if (!res.ok) throw new Error("Erreur ajout unité");
      setNom("");
      setAbreviation("");
      setType("");
      fetchUnites();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDeleteUnite(id) {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/unites/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur suppression unité");
      fetchUnites();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestion des unités de mesure
      </h1>

      <form
        onSubmit={handleAddUnite}
        className="mb-6 flex flex-col md:grid md:grid-cols-4 gap-3"
      >
        <input
          type="text"
          placeholder="Nom (ex: Kilogramme)"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Abréviation (ex: kg)"
          value={abreviation}
          onChange={(e) => setAbreviation(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="base">Base</option>
          <option value="conditionnement">Conditionnement</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : unites.length === 0 ? (
        <p className="text-center text-gray-500">Aucune unité enregistrée.</p>
      ) : (
        <ul className="space-y-3">
          {unites.map((u) => (
            <li
              key={u.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-lg shadow-sm"
            >
              <span>
                <b>{u.nom}</b> ({u.abreviation}) - ({u.type})
              </span>
              <button
                onClick={() => handleDeleteUnite(u.id)}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
