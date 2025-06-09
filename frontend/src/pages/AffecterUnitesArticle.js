// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AffecterUnitesArticle() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleSelectionne, setArticleSelectionne] = useState("");
//   const [lignes, setLignes] = useState([]);

//   // Charger les articles et unités au chargement
//   useEffect(() => {
//     axios.get("/api/articles").then((res) => setArticles(res.data));
//     axios.get("/api/unites").then((res) => setUnites(res.data));
//   }, []);

//   const ajouterLigne = () => {
//     setLignes([...lignes, { uniteId: "", niveau: "", quantite: "", facteur: "", estUniteDeBase: false }]);
//   };

//   const modifierLigne = (index, champ, valeur) => {
//     const lignesModifiees = [...lignes];
//     lignesModifiees[index][champ] = champ === "estUniteDeBase" ? valeur.target.checked : valeur;
//     setLignes(lignesModifiees);
//   };

//   const envoyer = async () => {
//     try {
//       const payload = {
//         articleCode: articleSelectionne,
//         unites: lignes,
//       };
//       await axios.post("/api/article-unites", payload);
//       alert("Unités affectées avec succès !");
//     } catch (err) {
//       alert("Erreur lors de l'envoi.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Associer des unités à un article</h2>

//       <label>Article :</label>
//       <select
//         value={articleSelectionne}
//         onChange={(e) => setArticleSelectionne(e.target.value)}
//         className="border px-2 py-1 w-full mb-4"
//       >
//         <option value="">-- Sélectionner un article --</option>
//         {articles.map((a) => (
//           <option key={a.codeArticle} value={a.codeArticle}>
//             {a.designation}
//           </option>
//         ))}
//       </select>

//       {lignes.map((ligne, index) => (
//         <div key={index} className="grid grid-cols-5 gap-2 mb-2">
//           <select
//             value={ligne.uniteId}
//             onChange={(e) => modifierLigne(index, "uniteId", e.target.value)}
//             className="border px-2 py-1"
//           >
//             <option value="">Unité</option>
//             {unites.map((u) => (
//               <option key={u.id} value={u.id}>
//                 {u.nom}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             placeholder="Niveau"
//             value={ligne.niveau}
//             onChange={(e) => modifierLigne(index, "niveau", e.target.value)}
//             className="border px-2 py-1"
//           />

//           <input
//             type="number"
//             placeholder="Quantité"
//             value={ligne.quantite}
//             onChange={(e) => modifierLigne(index, "quantite", e.target.value)}
//             className="border px-2 py-1"
//           />

//           <input
//             type="number"
//             placeholder="Facteur"
//             value={ligne.facteur}
//             onChange={(e) => modifierLigne(index, "facteur", e.target.value)}
//             className="border px-2 py-1"
//           />

//           <label className="flex items-center gap-1">
//             <input
//               type="checkbox"
//               checked={ligne.estUniteDeBase}
//               onChange={(e) => modifierLigne(index, "estUniteDeBase", e)}
//             />
//             Base
//           </label>
//         </div>
//       ))}

//       <div className="mt-4">
//         <button
//           onClick={ajouterLigne}
//           className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
//         >
//           + Ajouter une ligne
//         </button>
//         <button
//           onClick={envoyer}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Enregistrer
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AffecterUnitesArticle;














// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [associations, setAssociations] = useState([
//     { uniteId: "", niveau: "", facteur: 1, typeConversion: "multiplication", estUniteDeBase: false },
//   ]);
//   const [loading, setLoading] = useState(false);

//   // Charger articles et unités au chargement
//   useEffect(() => {
//     fetchArticles();
//     fetchUnites();
//   }, []);

//   async function fetchArticles() {
//     try {
//       const res = await fetch("http://localhost:5000/api/articles");
//       if (!res.ok) throw new Error("Erreur chargement articles");
//       const data = await res.json();
//       setArticles(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function fetchUnites() {
//     try {
//       const res = await fetch("http://localhost:5000/api/unites");
//       if (!res.ok) throw new Error("Erreur chargement unités");
//       const data = await res.json();
//       setUnites(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   // Gérer changement dans chaque association
//   function handleAssocChange(index, field, value) {
//     const newAssoc = [...associations];
//     if (field === "estUniteDeBase") {
//       newAssoc.forEach((a, i) => { a.estUniteDeBase = (i === index); }); // une seule unité de base
//     } else {
//       newAssoc[index][field] = value;
//     }
//     setAssociations(newAssoc);
//   }

//   // Ajouter une nouvelle ligne d'association
//   function addAssocLine() {
//     setAssociations([
//       ...associations,
//       { uniteId: "", niveau: "", facteur: 1, typeConversion: "multiplication", estUniteDeBase: false },
//     ]);
//   }

//   // Supprimer une ligne
//   function removeAssocLine(index) {
//     const newAssoc = [...associations];
//     newAssoc.splice(index, 1);
//     setAssociations(newAssoc);
//   }

//   // Envoyer au backend
//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!articleCode) {
//       alert("Sélectionnez un article");
//       return;
//     }
//     // Validation basique
//     for (const assoc of associations) {
//       if (!assoc.uniteId || !assoc.niveau || !assoc.facteur) {
//         alert("Remplissez tous les champs dans chaque unité");
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/article-unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleCode, unites: associations }),
//       });
//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
//       alert("Unités associées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ maxWidth: 800, margin: "auto" }}>
//       <h2>Associer des unités de mesure à un article</h2>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 20 }}>
//           <label>
//             Article :{" "}
//             <select
//               value={articleCode}
//               onChange={(e) => setArticleCode(e.target.value)}
//               required
//             >
//               <option value="">-- Sélectionnez un article --</option>
//               {articles.map((art) => (
//                 <option key={art.codeArticle} value={art.codeArticle}>
//                   {art.designation} ({art.codeArticle})
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {associations.map((assoc, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: 10,
//               marginBottom: 10,
//               borderRadius: 5,
//               position: "relative",
//             }}
//           >
//             {associations.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeAssocLine(index)}
//                 style={{ position: "absolute", right: 10, top: 10, color: "red" }}
//                 title="Supprimer cette unité"
//               >
//                 X
//               </button>
//             )}

//             <label>
//               Unité :
//               <select
//                 value={assoc.uniteId}
//                 onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
//                 required
//               >
//                 <option value="">-- choisir unité --</option>
//                 {unites.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.nom} ({u.type})
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Niveau :
//               <input
//                 type="text"
//                 value={assoc.niveau}
//                 onChange={(e) => handleAssocChange(index, "niveau", e.target.value)}
//                 required
//                 placeholder="ex: paquet, boîte"
//               />
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Facteur :
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0.01"
//                 value={assoc.facteur}
//                 onChange={(e) => handleAssocChange(index, "facteur", parseFloat(e.target.value))}
//                 required
//               />
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Type conversion :
//               <select
//                 value={assoc.typeConversion}
//                 onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
//                 required
//               >
//                 <option value="multiplication">Multiplication</option>
//                 <option value="division">Division</option>
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Unité de base :
//               <input
//                 type="checkbox"
//                 checked={assoc.estUniteDeBase}
//                 onChange={() => handleAssocChange(index, "estUniteDeBase", !assoc.estUniteDeBase)}
//               />
//             </label>
//           </div>
//         ))}

//         <button type="button" onClick={addAssocLine}>
//           + Ajouter une unité
//         </button>

//         <br />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Enregistrement..." : "Enregistrer"}
//         </button>
//       </form>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [coefficient, setCoefficient] = useState(0);
//   const [associations, setAssociations] = useState([
//     { uniteId: "", facteur: 1, typeConversion: "multiplication", estUniteDeBase: false },
//   ]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchArticles();
//     fetchUnites();
//   }, []);

//   async function fetchArticles() {
//     try {
//       const res = await fetch("http://localhost:5000/api/articles");
//       if (!res.ok) throw new Error("Erreur chargement articles");
//       const data = await res.json();
//       setArticles(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function fetchUnites() {
//     try {
//       const res = await fetch("http://localhost:5000/api/unites");
//       if (!res.ok) throw new Error("Erreur chargement unités");
//       const data = await res.json();
//       setUnites(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   function handleAssocChange(index, field, value) {
//     const newAssoc = [...associations];
//     if (field === "estUniteDeBase") {
//       newAssoc.forEach((a, i) => {
//         a.estUniteDeBase = i === index;
//       });
//     } else {
//       newAssoc[index][field] = value;
//     }
//     setAssociations(newAssoc);
//   }

//   function addAssocLine() {
//     setAssociations([
//       ...associations,
//       { uniteId: "", facteur: 1, typeConversion: "multiplication", estUniteDeBase: false },
//     ]);
//   }

//   function removeAssocLine(index) {
//     const newAssoc = [...associations];
//     newAssoc.splice(index, 1);
//     setAssociations(newAssoc);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!articleCode) {
//       alert("Sélectionnez un article");
//       return;
//     }
//     for (const assoc of associations) {
//       if (!assoc.uniteId || !assoc.facteur) {
//         alert("Remplissez tous les champs dans chaque unité");
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/article-unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleCode, unites: associations }),
//       });
//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
//       alert("Unités associées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ maxWidth: 800, margin: "auto" }}>
//       <h2>Associer des unités de mesure à un article</h2>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 20 }}>
//           <label>
//             Article :{" "}
//             <select
//               value={articleCode}
//               onChange={(e) => setArticleCode(e.target.value)}
//               required
//             >
//               <option value="">-- Sélectionnez un article --</option>
//               {articles.map((art) => (
//                 <option key={art.codeArticle} value={art.codeArticle}>
//                   {art.designation} ({art.codeArticle})
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {associations.map((assoc, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: 10,
//               marginBottom: 10,
//               borderRadius: 5,
//               position: "relative",
//             }}
//           >
//             {associations.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeAssocLine(index)}
//                 style={{ position: "absolute", right: 10, top: 10, color: "red" }}
//                 title="Supprimer cette unité"
//               >
//                 X
//               </button>
//             )}

//             <label>
//               Unité :
//               <select
//                 value={assoc.uniteId}
//                 onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
//                 required
//               >
//                 <option value="">-- choisir unité --</option>
//                 {unites.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.nom} ({u.type})
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Facteur :
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0.01"
//                 value={assoc.facteur}
//                 onChange={(e) =>
//                   handleAssocChange(index, "facteur", parseFloat(e.target.value))
//                 }
//                 required
//               />
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Type conversion :
//               <select
//                 value={assoc.typeConversion}
//                 onChange={(e) =>
//                   handleAssocChange(index, "typeConversion", e.target.value)
//                 }
//                 required
//               >
//                 <option value="multiplication">Multiplication</option>
//                 <option value="division">Division</option>
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Unité de base :
//               <input
//                 type="checkbox"
//                 checked={assoc.estUniteDeBase}
//                 onChange={() => handleAssocChange(index, "estUniteDeBase", !assoc.estUniteDeBase)}
//               />
//             </label>
//           </div>
//         ))}

//         <button type="button" onClick={addAssocLine}>
//           + Ajouter une unité
//         </button>

//         <br />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Enregistrement..." : "Enregistrer"}
//         </button>
//       </form>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [associations, setAssociations] = useState([
//     {
//       uniteId: "",
//       facteur: 1,
//       typeConversion: "multiplication",
//       estUniteDeBase: false,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchArticles();
//     fetchUnites();
//   }, []);

//   async function fetchArticles() {
//     try {
//       const res = await fetch("http://localhost:5000/api/articles");
//       if (!res.ok) throw new Error("Erreur chargement articles");
//       const data = await res.json();
//       setArticles(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function fetchUnites() {
//     try {
//       const res = await fetch("http://localhost:5000/api/unites");
//       if (!res.ok) throw new Error("Erreur chargement unités");
//       const data = await res.json();
//       setUnites(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }



//   // ✅ Fonction pour calculer l'interprétation dynamique
//   const calculerInterpretation = (index) => {
//     let total = 1;
//     let detail = "1";

//     for (let i = index; i >= 0; i--) {
//       const a = associations[i];
//       const facteur = parseFloat(a.facteur);
//       if (isNaN(facteur) || facteur <= 0) return "";
//       detail += ` × ${facteur}`;
//       total *= facteur;
//     }

//     return `= ${detail} = ${total} unité(s) de base`;
//   };


//   function handleAssocChange(index, field, value) {
//     const newAssoc = [...associations];
//     if (field === "estUniteDeBase") {
//       // Un seul peut être unité de base
//       newAssoc.forEach((a, i) => {
//         a.estUniteDeBase = i === index;
//       });
//     } else {
//       newAssoc[index][field] = value;
//     }
//     setAssociations(newAssoc);
//   }

//   function addAssocLine() {
//     setAssociations([
//       ...associations,
//       {
//         uniteId: "",
//         facteur: 1,
//         typeConversion: "multiplication",
//         estUniteDeBase: false,
//       },
//     ]);
//   }

//   function removeAssocLine(index) {
//     const newAssoc = [...associations];
//     newAssoc.splice(index, 1);
//     setAssociations(newAssoc);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!articleCode) {
//       alert("Sélectionnez un article");
//       return;
//     }
//     for (const assoc of associations) {
//       if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//         alert("Remplissez tous les champs correctement");
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleCode, unites: associations }),
//       });
//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
//       alert("Unités associées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ maxWidth: 800, margin: "auto" }}>
//       <h2>Associer des unités de mesure à un article</h2>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 20 }}>
//           <label>
//             Article :{" "}
//             <select
//               value={articleCode}
//               onChange={(e) => setArticleCode(e.target.value)}
//               required
//             >
//               <option value="">-- Sélectionnez un article --</option>
//               {articles.map((art) => (
//                 <option key={art.codeArticle} value={art.codeArticle}>
//                   {art.designation} ({art.codeArticle})
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {associations.map((assoc, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: 10,
//               marginBottom: 10,
//               borderRadius: 5,
//               position: "relative",
//             }}
//           >
//             {associations.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeAssocLine(index)}
//                 style={{
//                   position: "absolute",
//                   right: 10,
//                   top: 10,
//                   color: "red",
//                   border: "none",
//                   background: "transparent",
//                   fontWeight: "bold",
//                 }}
//                 title="Supprimer cette unité"
//               >
//                 ×
//               </button>
//             )}

//             <label>
//               Unité :
//               <select
//                 value={assoc.uniteId}
//                 onChange={(e) =>
//                   handleAssocChange(index, "uniteId", e.target.value)
//                 }
//                 required
//               >
//                 <option value="">-- Choisir unité --</option>
//                 {unites.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.nom} ({u.type})
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Facteur :
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0.01"
//                 value={assoc.facteur}
//                 onChange={(e) =>
//                   handleAssocChange(
//                     index,
//                     "facteur",
//                     parseFloat(e.target.value) || 0
//                   )
//                 }
//                 required
//               />
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Type conversion :
//               <select
//                 value={assoc.typeConversion}
//                 onChange={(e) =>
//                   handleAssocChange(index, "typeConversion", e.target.value)
//                 }
//                 required
//               >
//                 <option value="multiplication">Multiplication</option>
//                 <option value="division">Division</option>
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Unité de base :
//               <input
//                 type="checkbox"
//                 checked={assoc.estUniteDeBase}
//                 onChange={() =>
//                   handleAssocChange(index, "estUniteDeBase", true)
//                 }
//               />
//             </label>
//           </div>
//         ))}

//         <button type="button" onClick={addAssocLine}>
//           + Ajouter une unité
//         </button>

//         <br />
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Enregistrement..." : "Associer"}
//         </button>
//       </form>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [associations, setAssociations] = useState([
//     {
//       uniteId: "",
//       facteur: 1,
//       typeConversion: "multiplication",
//       estUniteDeBase: false,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchArticles();
//     fetchUnites();
//   }, []);

//   async function fetchArticles() {
//     try {
//       const res = await fetch("http://localhost:5000/api/articles");
//       if (!res.ok) throw new Error("Erreur chargement articles");
//       const data = await res.json();
//       setArticles(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function fetchUnites() {
//     try {
//       const res = await fetch("http://localhost:5000/api/unites");
//       if (!res.ok) throw new Error("Erreur chargement unités");
//       const data = await res.json();
//       setUnites(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   // ✅ Fonction mise à jour : prend en compte typeConversion à chaque niveau
//   const calculerInterpretation = (index) => {
//     let total = 1;
//     let detail = "1";

//     for (let i = 0; i <= index; i++) {
//       const a = associations[i];
//       const facteur = parseFloat(a.facteur);
//       if (isNaN(facteur) || facteur <= 0) return "";
//       if (a.typeConversion === "multiplication") {
//         total *= facteur;
//         detail += ` × ${facteur}`;
//       } else if (a.typeConversion === "division") {
//         total /= facteur;
//         detail += ` ÷ ${facteur}`;
//       }
//     }

//     return `= ${detail} = ${total.toFixed(4)} unité(s) de base`;
//   };

//   function handleAssocChange(index, field, value) {
//     const newAssoc = [...associations];
//     if (field === "estUniteDeBase") {
//       newAssoc.forEach((a, i) => {
//         a.estUniteDeBase = i === index;
//       });
//     } else {
//       newAssoc[index][field] = value;
//     }
//     setAssociations(newAssoc);
//   }

//   function addAssocLine() {
//     setAssociations([
//       ...associations,
//       {
//         uniteId: "",
//         facteur: 1,
//         typeConversion: "multiplication",
//         estUniteDeBase: false,
//       },
//     ]);
//   }

//   function removeAssocLine(index) {
//     const newAssoc = [...associations];
//     newAssoc.splice(index, 1);
//     setAssociations(newAssoc);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!articleCode) {
//       alert("Sélectionnez un article");
//       return;
//     }
//     for (const assoc of associations) {
//       if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//         alert("Remplissez tous les champs correctement");
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         "http://localhost:5000/api/articleUnites/article-unites",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ articleCode, unites: associations }),
//         }
//       );
//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
//       alert("Unités associées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ maxWidth: 800, margin: "auto" }}>
//       <h2>Associer des unités de mesure à un article</h2>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 20 }}>
//           <label>
//             Article :{" "}
//             <select
//               value={articleCode}
//               onChange={(e) => setArticleCode(e.target.value)}
//               required
//             >
//               <option value="">-- Sélectionnez un article --</option>
//               {articles.map((art) => (
//                 <option key={art.codeArticle} value={art.codeArticle}>
//                   {art.designation} ({art.codeArticle})
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {associations.map((assoc, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: 10,
//               marginBottom: 10,
//               borderRadius: 5,
//               position: "relative",
//             }}
//           >
//             {associations.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeAssocLine(index)}
//                 style={{
//                   position: "absolute",
//                   right: 10,
//                   top: 10,
//                   color: "red",
//                   border: "none",
//                   background: "transparent",
//                   fontWeight: "bold",
//                 }}
//                 title="Supprimer cette unité"
//               >
//                 ×
//               </button>
//             )}

//             <label>
//               Unité :
//               <select
//                 value={assoc.uniteId}
//                 onChange={(e) =>
//                   handleAssocChange(index, "uniteId", e.target.value)
//                 }
//                 required
//               >
//                 <option value="">-- Choisir unité --</option>
//                 {unites.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.nom} ({u.type})
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Facteur :
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0.01"
//                 value={assoc.facteur}
//                 onChange={(e) =>
//                   handleAssocChange(
//                     index,
//                     "facteur",
//                     parseFloat(e.target.value) || 0
//                   )
//                 }
//                 required
//               />
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Type conversion :
//               <select
//                 value={assoc.typeConversion}
//                 onChange={(e) =>
//                   handleAssocChange(index, "typeConversion", e.target.value)
//                 }
//                 required
//               >
//                 <option value="multiplication">Multiplication</option>
//                 <option value="division">Division</option>
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Unité de base :
//               <input
//                 type="checkbox"
//                 checked={assoc.estUniteDeBase}
//                 onChange={() =>
//                   handleAssocChange(index, "estUniteDeBase", true)
//                 }
//               />
//             </label>

//             {/* ✅ Interprétation dynamique ici */}
//             <div style={{ marginTop: 10, fontStyle: "italic", color: "#555" }}>
//               Interprétation : {calculerInterpretation(index)}
//             </div>
//           </div>
//         ))}

//         <button type="button" onClick={addAssocLine}>
//           + Ajouter une unité
//         </button>

//         <br />
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Enregistrement..." : "Associer"}
//         </button>
//       </form>
//     </div>
//   );
// }












// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//     const [articles, setArticles] = useState([]);
//     const [unites, setUnites] = useState([]);
//     const [articleCode, setArticleCode] = useState("");
//     const [associations, setAssociations] = useState([
//         {
//             uniteId: "",
//             facteur: 1,
//             typeConversion: "multiplication",
//             estUniteDeBase: false,
//         },
//     ]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchArticles();
//         fetchUnites();
//     }, []);

//     async function fetchArticles() {
//         try {
//             const res = await fetch("http://localhost:5000/api/articles");
//             if (!res.ok) throw new Error("Erreur chargement articles");
//             const data = await res.json();
//             setArticles(data);
//         } catch (err) {
//             alert(err.message);
//         }
//     }

//     async function fetchUnites() {
//         try {
//             const res = await fetch("http://localhost:5000/api/unites");
//             if (!res.ok) throw new Error("Erreur chargement unités");
//             const data = await res.json();
//             setUnites(data);
//         } catch (err) {
//             alert(err.message);
//         }
//     }


// const calculerInterpretationComplete = (index) => {
//     let total = 1;
//     let detailConversion = [];

//     // Trouver l'unité de base (celle cochée comme estUniteDeBase)
//     const uniteDeBase = associations.find(a => a.estUniteDeBase);
//     const nomUniteDeBase = uniteDeBase 
//         ? unites.find(u => u.id === uniteDeBase.uniteId)?.nom 
//         : 'unité de base';

//     for (let i = 0; i <= index; i++) {
//         const a = associations[i];
//         const unite = unites.find((u) => u.id === a.uniteId);
//         const nomUnite = unite ? unite.nom : `unité ${i + 1}`;
//         const facteur = parseFloat(a.facteur);

//         if (isNaN(facteur) || facteur <= 0) return "";

//         // Calcul du total
//         const type = a.typeConversion;
//         const valeurPrecedente = total;
//         if (type === "multiplication") {
//             total *= facteur;
//         } else {
//             total /= facteur;
//         }

//         // Construction de la ligne de détail
//         let ligne;
//         if (i === 0) {
//             if (a.estUniteDeBase) {
//                 ligne = `1 ${nomUnite} = 1 ${nomUnite}`;
//             } else {
//                 ligne = `1 ${nomUnite} = ${facteur} ${nomUniteDeBase}`;
//             }
//         } else {
//             const prevUnite = unites.find(u => u.id === associations[i-1].uniteId);
//             const nomPrevUnite = prevUnite ? prevUnite.nom : `unité ${i}`;
            
//             if (a.estUniteDeBase) {
//                 ligne = `1 ${nomUnite} = ${(1/valeurPrecedente).toFixed(4)} ${nomPrevUnite}`;
//             } else {
//                 ligne = `1 ${nomUnite} = ${facteur} × 1 ${nomPrevUnite} = ${total} ${nomUniteDeBase}`;
//             }
//         }

//         detailConversion.push(ligne);
//     }

//     return detailConversion.join("\n");
// };


//     function handleAssocChange(index, field, value) {
//         const newAssoc = [...associations];
//         if (field === "estUniteDeBase") {
//             newAssoc.forEach((a, i) => {
//                 a.estUniteDeBase = i === index;
//             });
//         } else {
//             newAssoc[index][field] = value;
//         }
//         setAssociations(newAssoc);
//     }

//     function addAssocLine() {
//         setAssociations([
//             ...associations,
//             {
//                 uniteId: "",
//                 facteur: 1,
//                 typeConversion: "multiplication",
//                 estUniteDeBase: false,
//             },
//         ]);
//     }

//     function removeAssocLine(index) {
//         const newAssoc = [...associations];
//         newAssoc.splice(index, 1);
//         setAssociations(newAssoc);
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (!articleCode) {
//             alert("Sélectionnez un article");
//             return;
//         }
//         for (const assoc of associations) {
//             if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//                 alert("Remplissez tous les champs correctement");
//                 return;
//             }
//         }

//         setLoading(true);
//         try {
//             const res = await fetch(
//                 "http://localhost:5000/api/articleUnites/article-unites",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ articleCode, unites: associations }),
//                 }
//             );
//             if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
//             alert("Unités associées avec succès !");
//         } catch (err) {
//             alert(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div style={{ maxWidth: 800, margin: "auto" }}>
//             <h2>Associer des unités de mesure à un article</h2>

//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: 20 }}>
//                     <label>
//                         Article :{" "}
//                         <select
//                             value={articleCode}
//                             onChange={(e) => setArticleCode(e.target.value)}
//                             required
//                         >
//                             <option value="">-- Sélectionnez un article --</option>
//                             {articles.map((art) => (
//                                 <option key={art.codeArticle} value={art.codeArticle}>
//                                     {art.designation} ({art.codeArticle})
//                                 </option>
//                             ))}
//                         </select>
//                     </label>
//                 </div>

//                 {associations.map((assoc, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             border: "1px solid #ccc",
//                             padding: 10,
//                             marginBottom: 10,
//                             borderRadius: 5,
//                             position: "relative",
//                         }}
//                     >
//                         {associations.length > 1 && (
//                             <button
//                                 type="button"
//                                 onClick={() => removeAssocLine(index)}
//                                 style={{
//                                     position: "absolute",
//                                     right: 10,
//                                     top: 10,
//                                     color: "red",
//                                     border: "none",
//                                     background: "transparent",
//                                     fontWeight: "bold",
//                                 }}
//                                 title="Supprimer cette unité"
//                             >
//                                 ×
//                             </button>
//                         )}

//                         <label>
//                             Unité :
//                             <select
//                                 value={assoc.uniteId}
//                                 onChange={(e) =>
//                                     handleAssocChange(index, "uniteId", e.target.value)
//                                 }
//                                 required
//                             >
//                                 <option value="">-- Choisir unité --</option>
//                                 {unites.map((u) => (
//                                     <option key={u.id} value={u.id}>
//                                         {u.nom} ({u.type})
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Facteur :
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 min="0.01"
//                                 value={assoc.facteur}
//                                 onChange={(e) =>
//                                     handleAssocChange(
//                                         index,
//                                         "facteur",
//                                         parseFloat(e.target.value) || 0
//                                     )
//                                 }
//                                 required
//                             />
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Type conversion :
//                             <select
//                                 value={assoc.typeConversion}
//                                 onChange={(e) =>
//                                     handleAssocChange(index, "typeConversion", e.target.value)
//                                 }
//                                 required
//                             >
//                                 <option value="multiplication">Multiplication</option>
//                                 <option value="division">Division</option>
//                             </select>
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Unité de base :
//                             <input
//                                 type="checkbox"
//                                 checked={assoc.estUniteDeBase}
//                                 onChange={() =>
//                                     handleAssocChange(index, "estUniteDeBase", true)
//                                 }
//                             />
//                         </label>

//                         {/* ✅ Interprétation dynamique ici */}
//                         <div style={{ marginTop: 10, fontStyle: "italic", color: "#555", whiteSpace: "pre-line" }}>
//                             {calculerInterpretationComplete(index)}
//                         </div>
//                     </div>
//                 ))}

//                 <button type="button" onClick={addAssocLine}>
//                     + Ajouter une unité
//                 </button>

//                 <br />
//                 <br />
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Enregistrement..." : "Associer"}
//                 </button>
//             </form>
//         </div>
//     );
// }























































































// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//     const [articles, setArticles] = useState([]);
//     const [unites, setUnites] = useState([]);
//     const [articleCode, setArticleCode] = useState("");
//     const [associations, setAssociations] = useState([
//         {
//             uniteId: "",
//             facteur: 1,
//             typeConversion: "multiplication",
//             estUniteDeBase: false,
//         },
//     ]);
//     const [loading, setLoading] = useState(false);

//     // Charger articles et unités une seule fois
//     useEffect(() => {
//         fetchData("articles", setArticles);
//         fetchData("unites", setUnites);
//     }, []);

//     const fetchData = async (endpoint, setState) => {
//         try {
//             const res = await fetch(`http://localhost:5000/api/${endpoint}`);
//             if (!res.ok) throw new Error(`Erreur chargement ${endpoint}`);
//             const data = await res.json();
//             setState(data);
//         } catch (err) {
//             alert(err.message);
//         }
//     };

//     // Gérer les changements dans le formulaire
//     const handleAssocChange = (index, field, value) => {
//         const newAssociations = [...associations];
//         if (field === "estUniteDeBase") {
//             // Une seule unité de base possible
//             newAssociations.forEach((a, i) => {
//                 a.estUniteDeBase = i === index;
//             });
//         } else {
//             newAssociations[index][field] = value;
//         }
//         setAssociations(newAssociations);
//     };

//     const addAssocLine = () => {
//         setAssociations([
//             ...associations,
//             {
//                 uniteId: "",
//                 facteur: 1,
//                 typeConversion: "multiplication",
//                 estUniteDeBase: false,
//             },
//         ]);
//     };

//     const removeAssocLine = (index) => {
//         const updated = [...associations];
//         updated.splice(index, 1);
//         setAssociations(updated);
//     };

//     // Soumettre le formulaire
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!articleCode) {
//             alert("Veuillez sélectionner un article.");
//             return;
//         }

//         for (const assoc of associations) {
//             if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//                 alert("Vérifiez que tous les champs sont bien remplis.");
//                 return;
//             }
//         }

//         setLoading(true);
//         try {
//             const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ articleCode, unites: associations }),
//             });

//             if (!res.ok) throw new Error("Erreur lors de l'enregistrement.");
//             alert("Associations enregistrées avec succès !");
//         } catch (err) {
//             alert(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Afficher l'interprétation dynamique
//     // const getInterpretation = (index) => {
//     //     const base = associations.find((a) => a.estUniteDeBase);
//     //     const baseUniteNom = base ? unites.find(u => u.id === base.uniteId)?.nom : "unité de base";
//     //     let total = 1;
//     //     let lines = [];

//     //     for (let i = 0; i <= index; i++) {
//     //         const { uniteId, facteur, typeConversion } = associations[i];
//     //         const unite = unites.find(u => u.id === uniteId);
//     //         const nomUnite = unite ? unite.nom : `Unité ${i + 1}`;

//     //         if (!facteur || facteur <= 0) return "";

//     //         const valeurAvant = total;
//     //         total = typeConversion === "multiplication" ? total * facteur : total / facteur;

//     //         let ligne;
//     //         if (i === 0) {
//     //             ligne = `1 ${nomUnite} = ${base?.uniteId === uniteId ? "1" : facteur} ${baseUniteNom}`;
//     //         } else {
//     //             const prevUnite = unites.find(u => u.id === associations[i - 1].uniteId);
//     //             const nomPrev = prevUnite ? prevUnite.nom : `Unité ${i}`;
//     //             ligne = `1 ${nomUnite} = ${facteur} × 1 ${nomPrev} = ${total.toFixed(4)} ${baseUniteNom}`;
//     //         }

//     //         lines.push(ligne);
//     //     }

//     //     return lines.join("\n");
//     // };


//     function calculerInterpretationSimple(unites, associations) {
//     const base = associations.find(a => a.estUniteDeBase);
//     const baseUniteNom = base ? (unites.find(u => u.id === base.uniteId)?.nom || "unité de base") : "unité de base";
//     let total = 1;
//     const resultats = [];

//     for (let i = 0; i < associations.length; i++) {
//         const assoc = associations[i];
//         const unite = unites.find(u => u.id === assoc.uniteId);
//         if (!unite) continue;

//         if (assoc.estUniteDeBase) {
//             total = 1;
//             resultats.push(`1 ${unite.nom} = 1 ${unite.nom}`);
//         } else {
//             total *= assoc.facteur;
//             const prevUnite = unites.find(u => u.id === associations[i - 1].uniteId);
//             resultats.push(`1 ${unite.nom} = ${assoc.facteur} × 1 ${prevUnite.nom} = ${total.toFixed(4)} ${baseUniteNom}`);
//         }
//     }

//     return resultats.join("\n");
// }



// // function calculerInterpretationComplete(unites, associations) {
// //     const interpretations = [];
// //     let valeurPrecedente = 1;
// //     let nomUniteDeBase = "";

// //     for (let i = 0; i < associations.length; i++) {
// //         const a = associations[i];
// //         const unite = unites.find(u => u.id === a.uniteId);
// //         if (!unite) continue;

// //         const nomUnite = unite.nom;
// //         const facteur = a.facteur;
// //         let ligne = "";

// //         if (a.estUniteDeBase) {
// //             valeurPrecedente = 1;
// //             nomUniteDeBase = nomUnite;
// //             ligne = `1 ${nomUniteDeBase} = 1 ${nomUniteDeBase}`;
// //         } else {
// //             const total = facteur * valeurPrecedente;
// //             const prevUnite = unites.find(u => u.id === associations[i - 1].uniteId);
// //             const nomPrevUnite = prevUnite?.nom || "";
// //             ligne = `1 ${nomUnite} = ${facteur} × 1 ${nomPrevUnite} = ${total.toFixed(4)} ${nomUniteDeBase}`;
// //             valeurPrecedente = total;
// //         }

// //         interpretations.push(ligne);
// //     }

// //     return interpretations;
// // }

//     return (
//         <div style={{ maxWidth: 900, margin: "auto", padding: "20px" }}>
//             <h2>Associer des unités de mesure à un article</h2>

//             <form onSubmit={handleSubmit}>
//                 {/* Sélecteur d'article */}
//                 <div style={{ marginBottom: 20 }}>
//                     <label>
//                         Article :
//                         <select value={articleCode} onChange={(e) => setArticleCode(e.target.value)} required>
//                             <option value="">-- Sélectionnez un article --</option>
//                             {articles.map((art) => (
//                                 <option key={art.codeArticle} value={art.codeArticle}>
//                                     {art.designation} ({art.codeArticle})
//                                 </option>
//                             ))}
//                         </select>
//                     </label>
//                 </div>

//                 {/* Liste des unités associées */}
//                 {associations.map((assoc, index) => (
//                     <div key={index} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 5 }}>
//                         {associations.length > 1 && (
//                             <button
//                                 type="button"
//                                 onClick={() => removeAssocLine(index)}
//                                 style={{ float: "right", color: "red", fontWeight: "bold" }}
//                                 title="Supprimer cette unité"
//                             >
//                                 ×
//                             </button>
//                         )}

//                         <label>
//                             Unité :
//                             <select
//                                 value={assoc.uniteId}
//                                 onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
//                                 required
//                             >
//                                 <option value="">-- Choisir unité --</option>
//                                 {unites.map((u) => (
//                                     <option key={u.id} value={u.id}>
//                                         {u.nom} ({u.type})
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Facteur :
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 min="0.01"
//                                 value={assoc.facteur}
//                                 onChange={(e) =>
//                                     handleAssocChange(index, "facteur", parseFloat(e.target.value) || 0)
//                                 }
//                                 required
//                             />
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Type conversion :
//                             <select
//                                 value={assoc.typeConversion}
//                                 onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
//                             >
//                                 <option value="multiplication">Multiplication</option>
//                                 <option value="division">Division</option>
//                             </select>
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Unité de base :
//                             <input
//                                 type="checkbox"
//                                 checked={assoc.estUniteDeBase}
//                                 onChange={() => handleAssocChange(index, "estUniteDeBase", true)}
//                             />
//                         </label>

//                         {/* Interprétation affichée dynamiquement */}
//                         <pre style={{ marginTop: 10, color: "#555", fontStyle: "italic", whiteSpace: "pre-line" }}>
//                             {getInterpretation(index)}
//                         </pre>
//                     </div>
//                 ))}

//                 <button type="button" onClick={addAssocLine}>+ Ajouter une unité</button>

//                 <br /><br />
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Enregistrement..." : "Associer"}
//                 </button>
//             </form>
//         </div>
//     );
// }










// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [associations, setAssociations] = useState([
//     {
//       uniteId: "",
//       facteur: 1,
//       typeConversion: "multiplication",
//       estUniteDeBase: false,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData("articles", setArticles);
//     fetchData("unites", setUnites);
//   }, []);

//   const fetchData = async (endpoint, setState) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/${endpoint}`);
//       if (!res.ok) throw new Error(`Erreur chargement ${endpoint}`);
//       const data = await res.json();
//       setState(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAssocChange = (index, field, value) => {
//     const newAssociations = [...associations];
//     if (field === "estUniteDeBase") {
//       // une seule unité de base possible
//       newAssociations.forEach((a, i) => {
//         a.estUniteDeBase = i === index;
//       });
//     } else {
//       newAssociations[index][field] = value;
//     }
//     setAssociations(newAssociations);
//   };

//   const addAssocLine = () => {
//     setAssociations([
//       ...associations,
//       {
//         uniteId: "",
//         facteur: 1,
//         typeConversion: "multiplication",
//         estUniteDeBase: false,
//       },
//     ]);
//   };

//   const removeAssocLine = (index) => {
//     const updated = [...associations];
//     updated.splice(index, 1);
//     setAssociations(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!articleCode) {
//       alert("Veuillez sélectionner un article.");
//       return;
//     }

//     for (const assoc of associations) {
//       if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//         alert("Vérifiez que tous les champs sont bien remplis.");
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleCode, unites: associations }),
//       });

//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement.");
//       alert("Associations enregistrées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fonction d'interprétation corrigée et utilisée dans le rendu
//   const getInterpretation = (index) => {
//     const base = associations.find((a) => a.estUniteDeBase);
//     if (!base) return "Sélectionnez une unité de base.";

//     const baseUniteNom = unites.find((u) => u.id === base.uniteId)?.nom || "unité de base";

//     let total = 1;
//     let lines = [];

//     for (let i = 0; i <= index; i++) {
//       const { uniteId, facteur, typeConversion, estUniteDeBase } = associations[i];
//       const unite = unites.find((u) => u.id === uniteId);
//       const nomUnite = unite ? unite.nom : `Unité ${i + 1}`;

//       if (!facteur || facteur <= 0) return "";

//       if (estUniteDeBase) {
//         total = 1;
//         lines.push(`1 ${nomUnite} = 1 ${nomUnite}`);
//       } else {
//         total = typeConversion === "multiplication" ? total * facteur : total / facteur;
//         const prevUnite = unites.find((u) => u.id === associations[i - 1]?.uniteId);
//         const nomPrev = prevUnite ? prevUnite.nom : `Unité ${i}`;
//         lines.push(`1 ${nomUnite} = ${facteur} × 1 ${nomPrev} = ${total.toFixed(4)} ${baseUniteNom}`);
//       }
//     }

//     return lines.join("\n");
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "auto", padding: "20px" }}>
//       <h2>Associer des unités de mesure à un article</h2>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 20 }}>
//           <label>
//             Article :
//             <select value={articleCode} onChange={(e) => setArticleCode(e.target.value)} required>
//               <option value="">-- Sélectionnez un article --</option>
//               {articles.map((art) => (
//                 <option key={art.codeArticle} value={art.codeArticle}>
//                   {art.designation} ({art.codeArticle})
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {associations.map((assoc, index) => (
//           <div
//             key={index}
//             style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 5 }}
//           >
//             {associations.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeAssocLine(index)}
//                 style={{ float: "right", color: "red", fontWeight: "bold" }}
//                 title="Supprimer cette unité"
//               >
//                 ×
//               </button>
//             )}

//             <label>
//               Unité :
//               <select
//                 value={assoc.uniteId}
//                 onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
//                 required
//               >
//                 <option value="">-- Choisir unité --</option>
//                 {unites.map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.nom} ({u.type})
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Facteur :
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0.01"
//                 value={assoc.facteur}
//                 onChange={(e) =>
//                   handleAssocChange(index, "facteur", parseFloat(e.target.value) || 0)
//                 }
//                 required
//               />
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Type conversion :
//               <select
//                 value={assoc.typeConversion}
//                 onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
//               >
//                 <option value="multiplication">Multiplication</option>
//                 <option value="division">Division</option>
//               </select>
//             </label>

//             <label style={{ marginLeft: 10 }}>
//               Unité de base :
//               <input
//                 type="checkbox"
//                 checked={assoc.estUniteDeBase}
//                 onChange={() => handleAssocChange(index, "estUniteDeBase", true)}
//               />
//             </label>

//             <pre
//               style={{
//                 marginTop: 10,
//                 color: "#555",
//                 fontStyle: "italic",
//                 whiteSpace: "pre-line",
//               }}
//             >
//               {getInterpretation(index)}
//             </pre>
//           </div>
//         ))}

//         <button type="button" onClick={addAssocLine}>
//           + Ajouter une unité
//         </button>

//         <br />
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Enregistrement..." : "Associer"}
//         </button>
//       </form>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [associations, setAssociations] = useState([
//     {
//       uniteId: "",
//       facteur: 1,
//       typeConversion: "multiplication",
//       estUniteDeBase: false,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData("articles", setArticles);
//     fetchData("unites", setUnites);
//   }, []);

//   const fetchData = async (endpoint, setState) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/${endpoint}`);
//       if (!res.ok) throw new Error(`Erreur chargement ${endpoint}`);
//       const data = await res.json();
//       setState(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAssocChange = (index, field, value) => {
//     const newAssociations = [...associations];
//     if (field === "estUniteDeBase") {
//       newAssociations.forEach((a, i) => {
//         a.estUniteDeBase = i === index;
//       });
//     } else {
//       newAssociations[index][field] = value;
//     }
//     setAssociations(newAssociations);
//   };

//   const addAssocLine = () => {
//     setAssociations([
//       ...associations,
//       {
//         uniteId: "",
//         facteur: 1,
//         typeConversion: "multiplication",
//         estUniteDeBase: false,
//       },
//     ]);
//   };

//   const removeAssocLine = (index) => {
//     const updated = [...associations];
//     updated.splice(index, 1);
//     setAssociations(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!articleCode) {
//       alert("Veuillez sélectionner un article.");
//       return;
//     }
//     for (const assoc of associations) {
//       if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//         alert("Vérifiez que tous les champs sont bien remplis.");
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleCode, unites: associations }),
//       });
//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement.");
//       alert("Associations enregistrées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getInterpretation = (index) => {
//     const base = associations.find((a) => a.estUniteDeBase);
//     if (!base) return "Sélectionnez une unité de base.";
//     const baseUniteNom = unites.find((u) => u.id === base.uniteId)?.nom || "unité de base";
//     let total = 1;
//     let lines = [];
//     for (let i = 0; i <= index; i++) {
//       const { uniteId, facteur, typeConversion, estUniteDeBase } = associations[i];
//       const unite = unites.find((u) => u.id === uniteId);
//       const nomUnite = unite ? unite.nom : `Unité ${i + 1}`;
//       if (!facteur || facteur <= 0) return "";
//       if (estUniteDeBase) {
//         total = 1;
//         lines.push(`1 ${nomUnite} = 1 ${nomUnite}`);
//       } else {
//         total = typeConversion === "multiplication" ? total * facteur : total / facteur;
//         const prevUnite = unites.find((u) => u.id === associations[i - 1]?.uniteId);
//         const nomPrev = prevUnite ? prevUnite.nom : `Unité ${i}`;
//         lines.push(`1 ${nomUnite} = ${facteur} × 1 ${nomPrev} = ${total.toFixed(4)} ${baseUniteNom}`);
//       }
//     }
//     return lines.join("\n");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Associer des unités de mesure à un article</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Article :</label>
//           <select
//             value={articleCode}
//             onChange={(e) => setArticleCode(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             <option value="">-- Sélectionnez un article --</option>
//             {articles.map((art) => (
//               <option key={art.codeArticle} value={art.codeArticle}>
//                 {art.designation} ({art.codeArticle})
//               </option>
//             ))}
//           </select>
//         </div>

//         {associations.map((assoc, index) => (
//           <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
//             {associations.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeAssocLine(index)}
//                 className="absolute top-2 right-2 text-red-500 font-bold text-xl"
//                 title="Supprimer cette unité"
//               >
//                 ×
//               </button>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Unité :</label>
//                 <select
//                   value={assoc.uniteId}
//                   onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
//                   required
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 >
//                   <option value="">-- Choisir unité --</option>
//                   {unites.map((u) => (
//                     <option key={u.id} value={u.id}>
//                       {u.nom} ({u.type})
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Facteur :</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   min="0.01"
//                   value={assoc.facteur}
//                   onChange={(e) => handleAssocChange(index, "facteur", parseFloat(e.target.value) || 0)}
//                   required
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Type conversion :</label>
//                 <select
//                   value={assoc.typeConversion}
//                   onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 >
//                   <option value="multiplication">Multiplication</option>
//                   <option value="division">Division</option>
//                 </select>
//               </div>
//               <div className="flex items-center space-x-2 mt-6">
//                 <input
//                   type="checkbox"
//                   checked={assoc.estUniteDeBase}
//                   onChange={() => handleAssocChange(index, "estUniteDeBase", true)}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="text-sm text-gray-700">Unité de base</label>
//               </div>
//             </div>

//             <pre className="mt-4 text-sm text-gray-600 font-mono whitespace-pre-line">
//               {getInterpretation(index)}
//             </pre>
//           </div>
//         ))}

//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={addAssocLine}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//           >
//             + Ajouter une unité
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Enregistrement..." : "Associer"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [associations, setAssociations] = useState([
//     {
//       uniteId: "",
//       facteur: 1,
//       typeConversion: "multiplication",
//       estUniteDeBase: true,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData("articles", setArticles);
//     fetchData("unites", setUnites);
//   }, []);

//   const fetchData = async (endpoint, setState) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/${endpoint}`);
//       if (!res.ok) throw new Error(`Erreur chargement ${endpoint}`);
//       const data = await res.json();
//       setState(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAssocChange = (index, field, value) => {
//     const newAssociations = [...associations];
//     if (field === "uniteId") {
//       newAssociations[index].uniteId = value;
//     } else if (field === "facteur") {
//       newAssociations[index].facteur = parseFloat(value) || 0;
//     } else {
//       newAssociations[index][field] = value;
//     }
//     setAssociations(newAssociations);
//   };

//   const addAssocLine = () => {
//     setAssociations([
//       ...associations,
//       {
//         uniteId: "",
//         facteur: 1,
//         typeConversion: "multiplication",
//         estUniteDeBase: false,
//       },
//     ]);
//   };

//   const removeAssocLine = (index) => {
//     if (index === 0) {
//       alert("Impossible de supprimer l’unité de base.");
//       return;
//     }
//     const updated = [...associations];
//     updated.splice(index, 1);
//     setAssociations(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!articleCode) {
//       alert("Veuillez sélectionner un article.");
//       return;
//     }
//     for (const assoc of associations) {
//       if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//         alert("Vérifiez que tous les champs sont bien remplis.");
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleCode, unites: associations }),
//       });
//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement.");
//       alert("Associations enregistrées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getInterpretation = (index) => {
//     const base = associations[0]; // la première est l’unité de base
//     if (!base || !base.uniteId) return "Sélectionnez une unité de base.";
//     const baseUniteNom = unites.find((u) => u.id === base.uniteId)?.nom || "unité de base";

//     const { uniteId, facteur, typeConversion } = associations[index];
//     const unite = unites.find((u) => u.id === uniteId);
//     const nomUnite = unite ? unite.nom : `Unité ${index + 1}`;

//     if (!facteur || facteur <= 0) return "";

//     if (index === 0) {
//       return `1 ${nomUnite} = 1 ${nomUnite}`;
//     } else {
//       const value =
//         typeConversion === "multiplication"
//           ? facteur
//           : (1 / facteur).toFixed(4);
//       return `1 ${nomUnite} = ${facteur} × 1 ${baseUniteNom} = ${value} ${baseUniteNom}`;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Associer des unités de mesure à un article</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Article :</label>
//           <select
//             value={articleCode}
//             onChange={(e) => setArticleCode(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             <option value="">-- Sélectionnez un article --</option>
//             {articles.map((art) => (
//               <option key={art.codeArticle} value={art.codeArticle}>
//                 {art.designation} ({art.codeArticle})
//               </option>
//             ))}
//           </select>
//         </div>

//         {associations.map((assoc, index) => (
//           <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
//             {index > 0 && (
//               <button
//                 type="button"
//                 onClick={() => removeAssocLine(index)}
//                 className="absolute top-2 right-2 text-red-500 font-bold text-xl"
//                 title="Supprimer cette unité"
//               >
//                 ×
//               </button>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {index === 0 ? "Unité de base :" : "Unité de conditionnement :"}
//                 </label>
//                 <select
//                   value={assoc.uniteId}
//                   onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
//                   required
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 >
//                   <option value="">-- Choisir unité --</option>
//                   {unites.map((u) => (
//                     <option key={u.id} value={u.id}>
//                       {u.nom} ({u.type})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {index > 0 && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Facteur :</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       min="0.01"
//                       value={assoc.facteur}
//                       onChange={(e) => handleAssocChange(index, "facteur", e.target.value)}
//                       required
//                       className="w-full border border-gray-300 rounded-lg p-2"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Type conversion :</label>
//                     <select
//                       value={assoc.typeConversion}
//                       onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg p-2"
//                     >
//                       <option value="multiplication">Multiplication</option>
//                       <option value="division">Division</option>
//                     </select>
//                   </div>
//                 </>
//               )}
//             </div>

//             <pre className="mt-4 text-sm text-gray-600 font-mono whitespace-pre-line">
//               {getInterpretation(index)}
//             </pre>
//           </div>
//         ))}

//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={addAssocLine}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//           >
//             + Ajouter une unité de conditionnement
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Enregistrement..." : "Associer"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
  






// import React, { useEffect, useState } from "react";

// export default function AssocierArticleUnites() {
//   const [articles, setArticles] = useState([]);
//   const [unites, setUnites] = useState([]);
//   const [articleCode, setArticleCode] = useState("");
//   const [associations, setAssociations] = useState([
//     {
//       uniteId: "",
//       facteur: 1,
//       typeConversion: "multiplication",
//       estUniteDeBase: true,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData("articles", setArticles);
//     fetchData("unites", setUnites);
//   }, []);

//   const fetchData = async (endpoint, setState) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/${endpoint}`);
//       if (!res.ok) throw new Error(`Erreur chargement ${endpoint}`);
//       const data = await res.json();
//       setState(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAssocChange = (index, field, value) => {
//     const newAssociations = [...associations];
//     if (field === "uniteId") {
//       newAssociations[index].uniteId = value;
//     } else if (field === "facteur") {
//       newAssociations[index].facteur = parseFloat(value) || 0;
//     } else {
//       newAssociations[index][field] = value;
//     }
//     setAssociations(newAssociations);
//   };

//   const addAssocLine = () => {
//     setAssociations([
//       ...associations,
//       {
//         uniteId: "",
//         facteur: 1,
//         typeConversion: "multiplication",
//         estUniteDeBase: false,
//       },
//     ]);
//   };

//   const removeAssocLine = (index) => {
//     if (index === 0) {
//       alert("Impossible de supprimer l’unité de base.");
//       return;
//     }
//     const updated = [...associations];
//     updated.splice(index, 1);
//     setAssociations(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!articleCode) {
//       alert("Veuillez sélectionner un article.");
//       return;
//     }
//     for (const assoc of associations) {
//       if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//         alert("Vérifiez que tous les champs sont bien remplis.");
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ articleCode, unites: associations }),
//       });
//       if (!res.ok) throw new Error("Erreur lors de l'enregistrement.");
//       alert("Associations enregistrées avec succès !");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getInterpretation = (index) => {
//     const base = associations[0]; // la première est l’unité de base
//     if (!base || !base.uniteId) return "Sélectionnez une unité de base.";
//     const baseUniteNom = unites.find((u) => u.id === base.uniteId)?.nom || "unité de base";

//     const { uniteId, facteur, typeConversion } = associations[index];
//     const unite = unites.find((u) => u.id === uniteId);
//     const nomUnite = unite ? unite.nom : `Unité ${index + 1}`;

//     if (!facteur || facteur <= 0) return "";

//     if (index === 0) {
//       return `1 ${nomUnite} = 1 ${nomUnite}`;
//     } else {
//       const value =
//         typeConversion === "multiplication"
//           ? facteur
//           : (1 / facteur).toFixed(4);
//       return `1 ${nomUnite} = ${facteur} × 1 ${baseUniteNom} = ${value} ${baseUniteNom}`;
//     }
//   };




//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Associer des unités de mesure à un article</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Article :</label>
//           <select
//             value={articleCode}
//             onChange={(e) => setArticleCode(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             <option value="">-- Sélectionnez un article --</option>
//             {articles.map((art) => (
//               <option key={art.codeArticle} value={art.codeArticle}>
//                 {art.designation} ({art.codeArticle})
//               </option>
//             ))}
//           </select>
//         </div>

//         {associations.map((assoc, index) => {
//           const isBase = index === 0;
//           const filteredUnites = unites.filter(
//             (u) => (isBase ? u.type === "base" : u.type === "conditionnement")
//           );

//           return (
//             <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
//               {index > 0 && (
//                 <button
//                   type="button"
//                   onClick={() => removeAssocLine(index)}
//                   className="absolute top-2 right-2 text-red-500 font-bold text-xl"
//                   title="Supprimer cette unité"
//                 >
//                   ×
//                 </button>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {isBase ? "Unité de base :" : "Unité de conditionnement :"}
//                   </label>
//                   <select
//                     value={assoc.uniteId}
//                     onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
//                     required
//                     className="w-full border border-gray-300 rounded-lg p-2"
//                   >
//                     <option value="">-- Choisir unité --</option>
//                     {filteredUnites.map((u) => (
//                       <option key={u.id} value={u.id}>
//                         {u.nom} ({u.abreviation}) - ({u.type})
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {!isBase && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Facteur :</label>
//                       <input
//                         type="number"
//                         step="0.01"
//                         min="0.01"
//                         value={assoc.facteur}
//                         onChange={(e) => handleAssocChange(index, "facteur", e.target.value)}
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-2"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Type conversion :</label>
//                       <select
//                         value={assoc.typeConversion}
//                         onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
//                         className="w-full border border-gray-300 rounded-lg p-2"
//                       >
//                         <option value="multiplication">Multiplication</option>
//                         <option value="division">Division</option>
//                       </select>
//                     </div>
//                   </>
//                 )}
//               </div>

//               <pre className="mt-4 text-sm text-gray-600 font-mono whitespace-pre-line">
//                 {getInterpretation(index)}
//               </pre>
//             </div>
//           );
//         })}

//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={addAssocLine}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//           >
//             + Ajouter une unité de conditionnement
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Enregistrement..." : "Associer"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";

export default function AssocierArticleUnites() {
  const [articles, setArticles] = useState([]);
  const [unites, setUnites] = useState([]);
  const [articleCode, setArticleCode] = useState("");
  const [associations, setAssociations] = useState([
    {
      uniteId: "",
      facteur: 1,
      typeConversion: "multiplication",
      estUniteDeBase: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData("articles", setArticles);
    fetchData("unites", setUnites);
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`);
      if (!res.ok) throw new Error(`Erreur chargement ${endpoint}`);
      const data = await res.json();
      setState(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAssocChange = (index, field, value) => {
    const newAssociations = [...associations];
    if (field === "uniteId") {
      newAssociations[index].uniteId = value;
    } else if (field === "facteur") {
      newAssociations[index].facteur = parseFloat(value) || 0;
    } else {
      newAssociations[index][field] = value;
    }
    setAssociations(newAssociations);
  };

  const addAssocLine = () => {
    setAssociations([
      ...associations,
      {
        uniteId: "",
        facteur: 1,
        typeConversion: "multiplication",
        estUniteDeBase: false,
      },
    ]);
  };

  const removeAssocLine = (index) => {
    if (index === 0) {
      alert("Impossible de supprimer l’unité de base.");
      return;
    }
    const updated = [...associations];
    updated.splice(index, 1);
    setAssociations(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articleCode) {
      alert("Veuillez sélectionner un article.");
      return;
    }
    for (const assoc of associations) {
      if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
        alert("Vérifiez que tous les champs sont bien remplis.");
        return;
      }
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleCode, unites: associations }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement.");
      alert("Associations enregistrées avec succès !");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInterpretation = (index) => {
    const base = associations[0];
    if (!base || !base.uniteId) return "Sélectionnez une unité de base.";
    const baseUniteNom = unites.find((u) => u.id === base.uniteId)?.nom || "unité de base";

    const { uniteId, facteur, typeConversion } = associations[index];
    const unite = unites.find((u) => u.id === uniteId);
    const nomUnite = unite ? unite.nom : `Unité ${index + 1}`;

    if (!facteur || facteur <= 0) return "";

    if (index === 0) {
      return `1 ${nomUnite} = 1 ${nomUnite}`;
    } else {
      const value =
        typeConversion === "multiplication"
          ? facteur
          : (1 / facteur).toFixed(4);
      return `1 ${nomUnite} = ${facteur} × 1 ${baseUniteNom} = ${value} ${baseUniteNom}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Associer des unités de mesure à un article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Article :</label>
          <select
            value={articleCode}
            onChange={(e) => setArticleCode(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">-- Sélectionnez un article --</option>
            {articles.map((art) => (
              <option key={art.codeArticle} value={art.codeArticle}>
                {art.designation} ({art.codeArticle})
              </option>
            ))}
          </select>
        </div>

        {associations.map((assoc, index) => {
          const isBase = index === 0;
          const filteredUnites = unites.filter(
            (u) => (isBase ? u.type === "base" : u.type === "conditionnement")
          );

          return (
            <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeAssocLine(index)}
                  className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                  title="Supprimer cette unité"
                >
                  ×
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isBase ? "Unité de base :" : "Unité de conditionnement :"}
                  </label>
                  <select
                    value={assoc.uniteId}
                    onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
                    required
                    disabled={!isBase && assoc.uniteId === associations[0].uniteId}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="">-- Choisir unité --</option>
                    {filteredUnites.map((u) => (
                      <option
                        key={u.id}
                        value={u.id}
                        disabled={!isBase && u.id === associations[0].uniteId}
                      >
                        {u.nom} ({u.abreviation}) - ({u.type})
                      </option>
                    ))}
                  </select>
                </div>

                {!isBase && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facteur :</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={assoc.facteur}
                        onChange={(e) => handleAssocChange(index, "facteur", e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type conversion :</label>
                      <select
                        value={assoc.typeConversion}
                        onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                      >
                        <option value="multiplication">Multiplication</option>
                        <option value="division">Division</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <pre className="mt-4 text-sm text-gray-600 font-mono whitespace-pre-line">
                {getInterpretation(index)}
              </pre>
            </div>
          );
        })}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addAssocLine}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            + Ajouter une unité de conditionnement
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Associer"}
          </button>
        </div>
      </form>
    </div>
  );
}
  












    // // ✅ Fonction mise à jour : prend en compte typeConversion à chaque niveau
    // const calculerInterpretationComplete = (index) => {
    //     let total = 1;
    //     let chemin = [];
    //     let detailConversion = [];

    //     for (let i = 0; i <= index; i++) {
    //         const a = associations[i];
    //         const unite = unites.find((u) => u.id === a.uniteId);
    //         const nomUnite = unite ? unite.nom : `unité ${i + 1}`;
    //         const facteur = parseFloat(a.facteur);

    //         if (isNaN(facteur) || facteur <= 0) return "";

    //         const type = a.typeConversion;
    //         if (type === "multiplication") {
    //             total *= facteur;
    //             chemin.push(`${facteur} ×`);
    //         } else {
    //             total /= facteur;
    //             chemin.push(`${facteur} ÷`);
    //         }

    //         const baseRef = i === 0 ? "" : `1 ${unites.find(u => u.id === associations[i - 1].uniteId)?.nom || 'unité'}`;
    //         const ligne =
    //             i === 0
    //                 ? `1 ${nomUnite} = ${facteur} g`
    //                 : `1 ${nomUnite} = ${facteur} × ${baseRef} = ${facteur} × ${total / facteur} g = ${total} g`;

    //         detailConversion.push(ligne);
    //     }

    //     return detailConversion.join(" \n ");
    // };





// const calculerInterpretationComplete = (index) => {
//     let total = 1;
//     let detailConversion = [];

//     // Trouver l'index de l'unité de base
//     const baseIndex = associations.findIndex(a => a.estUniteDeBase);
//     const hasBase = baseIndex !== -1;

//     for (let i = 0; i <= index; i++) {
//         const a = associations[i];
//         const unite = unites.find((u) => u.id === a.uniteId);
//         const nomUnite = unite ? unite.nom : `unité ${i + 1}`;
//         const facteur = parseFloat(a.facteur);

//         if (isNaN(facteur) || facteur <= 0) return "";

//         const type = a.typeConversion;
//         if (type === "multiplication") {
//             total *= facteur;
//         } else {
//             total /= facteur;
//         }

//         let ligne;
//         if (i === 0) {
//             if (hasBase && baseIndex === 0) {
//                 ligne = `1 ${nomUnite} = 1 ${nomUnite}`;
//             } else {
//                 const baseUnite = hasBase 
//                     ? unites.find(u => u.id === associations[baseIndex].uniteId)?.nom 
//                     : 'unité de base';
//                 ligne = `1 ${nomUnite} = ${facteur} ${baseUnite}`;
//             }
//         } else {
//             const prevUnite = unites.find(u => u.id === associations[i-1].uniteId);
//             const nomPrevUnite = prevUnite ? prevUnite.nom : `unité ${i}`;
            
//             const baseUnite = hasBase 
//                 ? unites.find(u => u.id === associations[baseIndex].uniteId)?.nom 
//                 : 'unité de base';

//             if (a.estUniteDeBase) {
//                 ligne = `1 ${nomUnite} = ${(1/total).toFixed(4)} ${nomPrevUnite}`;
//             } else {
//                 ligne = `1 ${nomUnite} = ${facteur} × 1 ${nomPrevUnite} = ${facteur} × ${(total/facteur).toFixed(4)} ${baseUnite} = ${total.toFixed(4)} ${baseUnite}`;
//             }
//         }

//         detailConversion.push(ligne);
//     }

//     return detailConversion.join(" \n ");
// };










  // const getInterpretation = (index) => {
  // if (!associations[0]?.uniteId) {
  //   return "Sélectionnez une unité de base.";
  // }

  // const base = associations[0];
  // const baseUnite = unites.find((u) => u.id === base.uniteId);
  // const baseNom = baseUnite ? baseUnite.nom : "unité de base";

  // const assoc = associations[index];
  // const unite = unites.find((u) => u.id === assoc.uniteId);
  // const nomUnite = unite ? unite.nom : `Unité ${index + 1}`;

  // if (!assoc.facteur || assoc.facteur <= 0) return "";

  // if (index === 0) {
  //   return `1 ${nomUnite} = 1 ${nomUnite}`;
  // } else {
  //   const value =
  //     assoc.typeConversion === "multiplication"
  //       ? assoc.facteur
  //       : (1 / assoc.facteur).toFixed(4);

  //   return `1 ${nomUnite} = ${assoc.facteur} × 1 ${baseNom} = ${value} ${baseNom}`;
  // }
  // };


  

//     const getInterpretation = (index) => {
//   let total = 1;
//   let detailConversion = [];

//   for (let i = 0; i <= index; i++) {
//     const a = associations[i];
//     const uniteActuelle = unites.find((u) => u.id === a.uniteId);
//     const nomUniteActuelle = uniteActuelle ? uniteActuelle.nom : `unité ${i + 1}`;

//     if (!a.facteur || isNaN(a.facteur) || a.facteur <= 0) return "";

//     const facteur = parseFloat(a.facteur);
//     const type = a.typeConversion;

//     if (type === "multiplication") {
//       total *= facteur;
//     } else {
//       total /= facteur;
//     }

//     // Nom de l’unité précédente (référence)
//     let nomUniteReference = "";
//     if (i === 0) {
//       nomUniteReference = nomUniteActuelle;
//     } else {
//       const uniteRef = unites.find((u) => u.id === associations[i - 1].uniteId);
//       nomUniteReference = uniteRef ? uniteRef.nom : `unité ${i}`;
//     }

//     let ligne = "";
//     if (i === 0) {
//       ligne = `1 ${nomUniteActuelle} = 1 ${nomUniteActuelle}`;
//     } else {
//       const affichageFacteur = type === "multiplication"
//         ? `${facteur} × 1 ${nomUniteReference}`
//         : `1 ÷ ${facteur} × 1 ${nomUniteReference}`;
//       ligne = `1 ${nomUniteActuelle} = ${affichageFacteur} = ${total.toFixed(4)} ${unites[0]?.nom || 'unité de base'}`;
//     }

//     detailConversion.push(ligne);
//   }

//   return detailConversion.join("\n");
// };









// import React, { useEffect, useState } from "react";


// export default function AssocierArticleUnites() {
//     const [articles, setArticles] = useState([]);
//     const [unites, setUnites] = useState([]);
//     const [articleCode, setArticleCode] = useState("");
//     const [associations, setAssociations] = useState([
//         {
//             uniteId: "",
//             facteur: 1,
//             typeConversion: "multiplication",
//             estUniteDeBase: false,
//         },
//     ]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchArticles();
//         fetchUnites();
//     }, []);

//     async function fetchArticles() {
//         try {
//             const res = await fetch("http://localhost:5000/api/articles");
//             if (!res.ok) throw new Error("Erreur chargement articles");
//             const data = await res.json();
//             setArticles(data);
//         } catch (err) {
//             alert(err.message);
//         }
//     }

//     async function fetchUnites() {
//         try {
//             const res = await fetch("http://localhost:5000/api/unites");
//             if (!res.ok) throw new Error("Erreur chargement unités");
//             const data = await res.json();
//             setUnites(data);
//         } catch (err) {
//             alert(err.message);
//         }
//     }




    

// //fonction calcule 



// const calculerInterpretationComplete = (index) => {
//     if (!associations.length || index >= associations.length) return "";

//     let total = 1;
//     let lignes = [];

//     for (let i = 0; i <= index; i++) {
//         const a = associations[i];
//         const unite = unites.find(u => u.id === a.uniteId);
//         const nomUnite = unite ? unite.nom : `unité ${i + 1}`;
//         const facteur = parseFloat(a.facteur);
//         const type = a.typeConversion;

//         if (isNaN(facteur) || facteur <= 0) return "";

//         // Déterminer l'unité précédente pour la phrase
//         const unitePrecedente = i === 0
//             ? "unité de base"
//             : unites.find(u => u.id === associations[i - 1].uniteId)?.nom || "unité";

//         // Calcul du total
//         if (type === "multiplication") {
//             total *= facteur;
//         } else {
//             total /= facteur;
//         }

//         // Création de la ligne descriptive
//         const ligne = i === 0
//             ? `1 ${nomUnite} = ${facteur} ${unitePrecedente}`
//             : `1 ${nomUnite} = ${facteur} ${unitePrecedente} = ${total} ${associations[0].uniteId === unite?.id ? nomUnite : unites.find(u => u.id === associations[0].uniteId)?.nom || "?"}`;

//         lignes.push(ligne);
//     }

//     return lignes.join("\n");
// };





//     function handleAssocChange(index, field, value) {
//         const newAssoc = [...associations];
//         if (field === "estUniteDeBase") {
//             newAssoc.forEach((a, i) => {
//                 a.estUniteDeBase = i === index;
//             });
//         } else {
//             newAssoc[index][field] = value;
//         }
//         setAssociations(newAssoc);
//     }

//     function addAssocLine() {
//         setAssociations([
//             ...associations,
//             {
//                 uniteId: "",
//                 facteur: 1,
//                 typeConversion: "multiplication",
//                 estUniteDeBase: false,
//             },
//         ]);
//     }

//     function removeAssocLine(index) {
//         const newAssoc = [...associations];
//         newAssoc.splice(index, 1);
//         setAssociations(newAssoc);
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (!articleCode) {
//             alert("Sélectionnez un article");
//             return;
//         }
//         for (const assoc of associations) {
//             if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
//                 alert("Remplissez tous les champs correctement");
//                 return;
//             }
//         }

//         setLoading(true);
//         try {
//             const res = await fetch(
//                 "http://localhost:5000/api/articleUnites/article-unites",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ articleCode, unites: associations }),
//                 }
//             );
//             if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
//             alert("Unités associées avec succès !");
//         } catch (err) {
//             alert(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div style={{ maxWidth: 800, margin: "auto" }}>
//             <h2>Associer des unités de mesure à un article</h2>

//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: 20 }}>
//                     <label>
//                         Article :{" "}
//                         <select
//                             value={articleCode}
//                             onChange={(e) => setArticleCode(e.target.value)}
//                             required
//                         >
//                             <option value="">-- Sélectionnez un article --</option>
//                             {articles.map((art) => (
//                                 <option key={art.codeArticle} value={art.codeArticle}>
//                                     {art.designation} ({art.codeArticle})
//                                 </option>
//                             ))}
//                         </select>
//                     </label>
//                 </div>

//                 {associations.map((assoc, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             border: "1px solid #ccc",
//                             padding: 10,
//                             marginBottom: 10,
//                             borderRadius: 5,
//                             position: "relative",
//                         }}
//                     >
//                         {associations.length > 1 && (
//                             <button
//                                 type="button"
//                                 onClick={() => removeAssocLine(index)}
//                                 style={{
//                                     position: "absolute",
//                                     right: 10,
//                                     top: 10,
//                                     color: "red",
//                                     border: "none",
//                                     background: "transparent",
//                                     fontWeight: "bold",
//                                 }}
//                                 title="Supprimer cette unité"
//                             >
//                                 ×
//                             </button>
//                         )}

//                         <label>
//                             Unité :
//                             <select
//                                 value={assoc.uniteId}
//                                 onChange={(e) =>
//                                     handleAssocChange(index, "uniteId", e.target.value)
//                                 }
//                                 required
//                             >
//                                 <option value="">-- Choisir unité --</option>
//                                 {unites.map((u) => (
//                                     <option key={u.id} value={u.id}>
//                                         {u.nom} ({u.type})
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Facteur :
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 min="0.01"
//                                 value={assoc.facteur}
//                                 onChange={(e) =>
//                                     handleAssocChange(
//                                         index,
//                                         "facteur",
//                                         parseFloat(e.target.value) || 0
//                                     )
//                                 }
//                                 required
//                             />
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Type conversion :
//                             <select
//                                 value={assoc.typeConversion}
//                                 onChange={(e) =>
//                                     handleAssocChange(index, "typeConversion", e.target.value)
//                                 }
//                                 required
//                             >
//                                 <option value="multiplication">Multiplication</option>
//                                 <option value="division">Division</option>
//                             </select>
//                         </label>

//                         <label style={{ marginLeft: 10 }}>
//                             Unité de base :
//                             <input
//                                 type="checkbox"
//                                 checked={assoc.estUniteDeBase}
//                                 onChange={() =>
//                                     handleAssocChange(index, "estUniteDeBase", true)
//                                 }
//                             />
//                         </label>

//                         {/* ✅ Interprétation dynamique ici */}
//                         <div style={{ marginTop: 10, fontStyle: "italic", color: "#555", whiteSpace: "pre-line" }}>
//                             {calculerInterpretationComplete(index)}
//                         </div>
//                     </div>
//                 ))}

//                 <button type="button" onClick={addAssocLine}>
//                     + Ajouter une unité
//                 </button>

//                 <br />
//                 <br />
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Enregistrement..." : "Associer"}
//                 </button>
//             </form>
//         </div>
//     );
// }














// const calculerInterpretationComplete = (index) => {
//     let total = 1;
//     let chemin = [];
//     let detailConversion = [];

//     if (!associations.length || index >= associations.length) return "";

//     // 🔹 Récupère l'unité de base (la toute première)
//     const uniteBase = unites.find(u => u.id === associations[0].uniteId);
//     const nomUniteBase = uniteBase ? uniteBase.nom : "unité de base";

//     for (let i = 0; i <= index; i++) {
//         const a = associations[i];
//         const unite = unites.find((u) => u.id === a.uniteId);
//         const nomUnite = unite ? unite.nom : `unité ${i + 1}`;
//         const facteur = parseFloat(a.facteur);

//         if (isNaN(facteur) || facteur <= 0) return "";

//         const type = a.typeConversion;
//         if (type === "multiplication") {
//             total *= facteur;
//             chemin.push(`${facteur} ×`);
//         } else {
//             total /= facteur;
//             chemin.push(`${facteur} ÷`);
//         }

//         const unitePrecedente = i === 0
//             ? nomUniteBase
//             : unites.find(u => u.id === associations[i - 1].uniteId)?.nom || 'unité';

//         const ligne =
//             i === 0
//                 ? `1 ${nomUnite} = ${facteur} ${nomUniteBase}`
//                 : `1 ${nomUnite} = ${facteur} × 1 ${unitePrecedente} = ${facteur} × ${total / facteur} ${nomUniteBase} = ${total} ${nomUniteBase}`;

//         detailConversion.push(ligne);
//     }

//     return detailConversion.join(" \n ");
// };

























































































