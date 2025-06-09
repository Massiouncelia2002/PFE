// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom"; 

// const AjouterUtilisateurForm = ({ onSubmit }) => {
//   const navigate = useNavigate();  

//   const [formData, setFormData] = useState({
//     codeUtilisateur: "",
//     nom: "",
//     prenom: "",
//     email: "",
//     posteTravail: "",
//     brancheFonction: "",
//     dateFin: "",
//     statut: true,
//     role: "",
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     }
//   }, [formData.dateFin]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     });
//     setMessage("Utilisateur ajouté avec succès !");
//     setFormData({
//       codeUtilisateur: "",
//       nom: "",
//       prenom: "",
//       email: "",
//       posteTravail: "",
//       brancheFonction: "",
//       dateFin: "",
//       statut: true,
//       role: "",
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           codeUtilisateur: row.codeUtilisateur || "",
//           nom: row.nom || "",
//           prenom: row.prenom || "",
//           email: row.email || "",
//           posteTravail: row.posteTravail || "",
//           brancheFonction: row.brancheFonction || "",
//           dateFin: row.dateFin || null,
//           statut: row.dateFin ? false : true,
//           role: row.role || "",
//         });
//       });

//       setMessage(`${jsonData.length} utilisateurs importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="codeUtilisateur" placeholder="Code" value={formData.codeUtilisateur} onChange={handleChange} />
//           <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
//           <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
//           <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <Input name="posteTravail" placeholder="Poste de travail" value={formData.posteTravail} onChange={handleChange} />
//           <Input name="brancheFonction" placeholder="Branche fonction" value={formData.brancheFonction} onChange={handleChange} />
//           <Input type="date" name="dateFin" value={formData.dateFin || ""} onChange={handleChange} />
         
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             required
//           >
//             <option value="">-- Sélectionner un rôle --</option>
//             <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//             <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//             <option value="Admin Dépôt">Admin Dépôt</option>
//           </select>
          
//           <div className="flex items-center space-x-2 col-span-2">
//             <input
//               type="checkbox"
//               name="statut"
//               checked={formData.statut}
//               onChange={handleChange}
//               disabled={!!formData.dateFin}
//             />
//             <label className="text-sm">Statut actif</label>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>


//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//             Afficher les utilisateurs
//           </Button>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterUtilisateurForm;









































// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom"; 

// const AjouterUtilisateurForm = ({ onSubmit }) => {
//   const navigate = useNavigate();  

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     posteTravail: "",
//     brancheFonction: "",
//     dateFin: "",
//     statut: true,
//     role: "",
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     }
//   }, [formData.dateFin]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     });
//     setMessage("Utilisateur ajouté avec succès !");
//     setFormData({
//       nom: "",
//       prenom: "",
//       email: "",
//       posteTravail: "",
//       brancheFonction: "",
//       dateFin: "",
//       statut: true,
//       role: "",
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           nom: row.nom || "",
//           prenom: row.prenom || "",
//           email: row.email || "",
//           posteTravail: row.posteTravail || "",
//           brancheFonction: row.brancheFonction || "",
//           dateFin: row.dateFin || null,
//           statut: row.dateFin ? false : true,
//           role: row.role || "",
//         });
//       });

//       setMessage(`${jsonData.length} utilisateurs importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
//           <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
//           <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <Input name="posteTravail" placeholder="Poste de travail" value={formData.posteTravail} onChange={handleChange} />
//           <Input name="brancheFonction" placeholder="Branche fonction" value={formData.brancheFonction} onChange={handleChange} />
//           <Input type="date" name="dateFin" value={formData.dateFin || ""} onChange={handleChange} />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//             required
//           >
//             <option value="">-- Sélectionner un rôle --</option>
//             <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//             <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//             <option value="Admin Dépôt">Admin Dépôt</option>
//           </select>

//           <div className="flex items-center space-x-2 col-span-2">
//             <input
//               type="checkbox"
//               name="statut"
//               checked={formData.statut}
//               onChange={handleChange}
//               disabled={!!formData.dateFin}
//             />
//             <label className="text-sm">Statut actif</label>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//             Afficher les utilisateurs
//           </Button>
//         </div>
//         {message && <p className="text-green-600">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterUtilisateurForm;





// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom"; 

// const AjouterUtilisateurForm = ({ onSubmit }) => {
//   const navigate = useNavigate();  

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     posteTravail: "", 
//     brancheFonction: "",
//     dateFin: "",
//     statut: true,
//     role: "",
//   });

//   const [message, setMessage] = useState("");
//   const [erreurs, setErreurs] = useState({});
//   const [formValid, setFormValid] = useState(true);  // Variable d'état pour valider le formulaire

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     }
//   }, [formData.dateFin]);

//   // Fonction de validation du formulaire
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.nom) errors.nom = "Le nom est obligatoire.";
//     if (!formData.prenom) errors.prenom = "Le prénom est obligatoire.";
//     if (!formData.email) errors.email = "L'email est obligatoire.";
//     if (!formData.role) errors.role = "Le rôle est obligatoire.";
    
    
//     setErreurs(errors);
//     return Object.keys(errors).length === 0;  // Si aucune erreur, formulaire valide
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

  


// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (validateForm()) {
//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     })
//       .then(response => {
//         setMessage("Utilisateur ajouté avec succès !");
//         setErreurs({});
//         setFormData({
//           nom: "",
//           prenom: "",
//           email: "",
//           posteTravail: "",
//           brancheFonction: "",
//           dateFin: "",
//           statut: true,
//           role: "",
//         });
//       })
//       .catch(error => {
//         setMessage("");
//         if (error.response && error.response.data) {
//           const { message, erreurs } = error.response.data;

//           // Vérification spécifique pour l'erreur d'email existant
//           if (erreurs && erreurs.email) {
//             setErreurs({ email: erreurs.email }); // Affichage de l'erreur pour l'email
//             console.log("Erreur d'email : ", erreurs.email);
//           } else {
//             setMessage(message || "Une erreur est survenue.");
//             setErreurs(erreurs || {});
//           }
//         } else {
//           setMessage("Une erreur réseau est survenue.");
//         }
//       });
//   } else {
//     setFormValid(false);  // Formulaire invalide si des erreurs existent
//   }
// };


//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       onSubmit({
//         utilisateurs: jsonData.map((row) => ({
//           nom: row.nom || "",
//           prenom: row.prenom || "",
//           email: row.email || "",
//           posteTravail: row.posteTravail || "",
//           brancheFonction: row.brancheFonction || "",
//           dateFin: row.dateFin || null,
//           statut: row.dateFin ? false : true,
//           role: row.role || "",
//         })),
//       })
//         .then(response => {
//           setMessage(`${jsonData.length} utilisateurs importés avec succès.`);
//           setErreurs({});
//         })
//         .catch(error => {
//           setMessage("");
//           if (error.response && error.response.data.erreurs) {
//             setErreurs(error.response.data.erreurs); // Erreurs du backend
//           }
//         });
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input 
//             name="nom" 
//             placeholder="Nom" 
//             value={formData.nom} 
//             onChange={handleChange} 
//             className={erreurs.nom ? "border-red-500" : ""}
//           />
//           {erreurs.nom && <p className="text-red-500 text-xs">{erreurs.nom}</p>}

//           <Input 
//             name="prenom" 
//             placeholder="Prénom" 
//             value={formData.prenom} 
//             onChange={handleChange} 
//             className={erreurs.prenom ? "border-red-500" : ""}
//           />
//           {erreurs.prenom && <p className="text-red-500 text-xs">{erreurs.prenom}</p>}

//           <Input 
//             type="email" 
//             name="email" 
//             placeholder="Email" 
//             value={formData.email} 
//             onChange={handleChange} 
//             className={erreurs.email ? "border-red-500" : ""}
//           />
//           {erreurs.email && <p className="text-red-500 text-xs">{erreurs.email}</p>}


          
//           <Input 
//             name="posteTravail" 
//             placeholder="Poste de travail" 
//             value={formData.posteTravail} 
//             onChange={handleChange} 
//           />

//           <Input 
//             name="brancheFonction" 
//             placeholder="Branche fonction" 
//             value={formData.brancheFonction} 
//             onChange={handleChange} 
//             className={erreurs.brancheFonction ? "border-red-500" : ""}
//           />
//           {erreurs.brancheFonction && <p className="text-red-500 text-xs">{erreurs.brancheFonction}</p>}

//           <Input 
//             type="date" 
//             name="dateFin" 
//             value={formData.dateFin || ""} 
//             onChange={handleChange} 
//           />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className={erreurs.role ? "border-red-500" : ""}
//             required
//           >
//             <option value="">-- Sélectionner un rôle --</option>
//             <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//             <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//             <option value="Admin Dépôt">Admin Dépôt</option>
//           </select>
//           {erreurs.role && <p className="text-red-500 text-xs">{erreurs.role}</p>}

//           <div className="flex items-center space-x-2 col-span-2">
//             <input
//               type="checkbox"
//               name="statut"
//               checked={formData.statut}
//               onChange={handleChange}
//               disabled={!!formData.dateFin}
//             />
//             <label className="text-sm">Statut actif</label>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//             Afficher les utilisateurs
//           </Button>
//         </div>

//         {message && <p className="text-green-600">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterUtilisateurForm;





















































// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterUtilisateurForm = ({ onSubmit }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     posteTravail: "",
//     brancheFonction: "",
//     dateFin: "",
//     statut: true,
//     role: "",
//   });

//   // const [message, setMessage] = useState("");
//   // const [erreurs, setErreurs] = useState({});
//   // const [formValid, setFormValid] = useState(true);

//   const [message, setMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     }
//   }, [formData.dateFin]);

//   // Fonction de validation du formulaire
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.nom) errors.nom = "Le nom est obligatoire.";
//     if (!formData.prenom) errors.prenom = "Le prénom est obligatoire.";
//     if (!formData.email) errors.email = "L'email est obligatoire.";
//     if (!formData.role) errors.role = "Le rôle est obligatoire.";
    
//     setErreurs(errors);
//     return Object.keys(errors).length === 0; // Si aucune erreur, formulaire valide
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       onSubmit({
//         ...formData,
//         dateFin: formData.dateFin || null,
//       })
//         .then(response => {
//           setMessage("Utilisateur ajouté avec succès !");
//           setErreurs({});
//           setFormData({
//             nom: "",
//             prenom: "",
//             email: "",
//             posteTravail: "",
//             brancheFonction: "",
//             dateFin: "",
//             statut: true,
//             role: "",
//           });
//         })
//         // .catch(error => {
//         //   setMessage("");
//         //   if (error.response && error.response.data) {
//         //     const { message, erreurs } = error.response.data;

//         //     if (erreurs && erreurs.email) {
//         //       setErreurs({ email: erreurs.email });
//         //       console.log("Erreur d'email : ", erreurs.email);
//         //     } else {
//         //       setMessage(message || "Une erreur est survenue.");
//         //       setErreurs(erreurs || {});
//         //     }
//         //   } else {
//         //     setMessage("Une erreur réseau est survenue.");
//         //   }
//         // });

//         .catch(error => {
//           setMessage("");
//           setErrorMessage(""); // Réinitialiser le message d'erreur
        
//           if (error.response && error.response.data) {
//             const { message, erreurs } = error.response.data;
        
//             if (erreurs && erreurs.email) {
//               setErreurs({ email: erreurs.email });
//             } else {
//               setErrorMessage(message || "Une erreur est survenue.");
//               setErreurs(erreurs || {});
//             }
//           } else {
//             setErrorMessage("Une erreur réseau est survenue.");
//           }
//         });
//     } else {
//       setFormValid(false);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       onSubmit({
//         utilisateurs: jsonData.map((row) => ({
//           nom: row.nom || "",
//           prenom: row.prenom || "",
//           email: row.email || "",
//           posteTravail: row.posteTravail || "",
//           brancheFonction: row.brancheFonction || "",
//           dateFin: row.dateFin || null,
//           statut: row.dateFin ? false : true,
//           role: row.role || "",
//         })),
//       })

      
//         .then(response => {
//           setMessage(`${jsonData.length} utilisateurs importés avec succès.`);
//           setErreurs({});
//         })
//         .catch(error => {
//           setMessage("");
//           if (error.response && error.response.data.erreurs) {
//             setErreurs(error.response.data.erreurs);
//           }
//         });
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input 
//             name="nom" 
//             placeholder="Nom" 
//             value={formData.nom} 
//             onChange={handleChange} 
//             className={erreurs.nom ? "border-red-500" : ""}
//           />
//           {erreurs.nom && <p className="text-red-500 text-xs">{erreurs.nom}</p>}

//           <Input 
//             name="prenom" 
//             placeholder="Prénom" 
//             value={formData.prenom} 
//             onChange={handleChange} 
//             className={erreurs.prenom ? "border-red-500" : ""}
//           />
//           {erreurs.prenom && <p className="text-red-500 text-xs">{erreurs.prenom}</p>}

//           <Input 
//             type="email" 
//             name="email" 
//             placeholder="Email" 
//             value={formData.email} 
//             onChange={handleChange} 
//             className={erreurs.email ? "border-red-500" : ""}
//           />
//           {erreurs.email && <p className="text-red-500 text-xs">{erreurs.email}</p>}

//           <Input 
//             name="posteTravail" 
//             placeholder="Poste de travail" 
//             value={formData.posteTravail} 
//             onChange={handleChange} 
//           />

//           <Input 
//             name="brancheFonction" 
//             placeholder="Branche fonction" 
//             value={formData.brancheFonction} 
//             onChange={handleChange} 
//             className={erreurs.brancheFonction ? "border-red-500" : ""}
//           />
//           {erreurs.brancheFonction && <p className="text-red-500 text-xs">{erreurs.brancheFonction}</p>}

//           <Input 
//             type="date" 
//             name="dateFin" 
//             value={formData.dateFin || ""} 
//             onChange={handleChange} 
//           />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className={erreurs.role ? "border-red-500" : ""}
//             required
//           >
//             <option value="">-- Sélectionner un rôle --</option>
//             <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//             <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//             <option value="Admin Dépôt">Admin Dépôt</option>
//           </select>
//           {erreurs.role && <p className="text-red-500 text-xs">{erreurs.role}</p>}

//           <div className="flex items-center space-x-2 col-span-2">
//             <input
//               type="checkbox"
//               name="statut"
//               checked={formData.statut}
//               onChange={handleChange}
//               disabled={!!formData.dateFin}
//             />
//             <label className="text-sm">Statut actif</label>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//             Afficher les utilisateurs
//           </Button>
//         </div>

//         {message && <p className="text-green-600">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterUtilisateurForm;























import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

const AjouterUtilisateurForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    posteTravail: "",
    brancheFonction: "",
    dateFin: "",
    statut: true,
    role: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (formData.dateFin) {
      setFormData((prev) => ({ ...prev, statut: false }));
    }
  }, [formData.dateFin]);

  const validateForm = () => {
    const errors = {};
    if (!formData.nom) errors.nom = "Le nom est obligatoire.";
    if (!formData.prenom) errors.prenom = "Le prénom est obligatoire.";
    if (!formData.email) errors.email = "L'email est obligatoire.";
    if (!formData.role) errors.role = "Le rôle est obligatoire.";
    setErreurs(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submission triggered");
    setErrorMessage("");
    setMessage("");

    if (validateForm()) {
      onSubmit({
        ...formData,
        dateFin: formData.dateFin || null,
      })
        .then(() => {
          
          setErreurs({});
          setFormData({
            nom: "",
            prenom: "",
            email: "",
            posteTravail: "",
            brancheFonction: "",
            dateFin: "",
            statut: true,
            role: "",
          });
        })
        // .catch((error) => {
        //   setErrorMessage("");
        //   if (error.response && error.response.data) {
        //     const { message, erreurs } = error.response.data;
        //     if (erreurs && erreurs.email) {
        //       setErreurs({ email: erreurs.email });
        //     } else {
        //       setErrorMessage(message || "Une erreur est survenue.");
        //       setErreurs(erreurs || {});
        //     }
        //   } else {
        //     setErrorMessage("Une erreur réseau est survenue.");
        //   }
        // });








        // .catch((error) => {
          
        //   setErrorMessage("");
        //   const newErreurs = {};
        
        //   if (error.response && error.response.data) {
        //     const { message, erreurs } = error.response.data;
        
        //     // Si le backend renvoie une erreur liée à un champ spécifique
        //     if (erreurs) {
        //       setErreurs(erreurs);
        //     } else if (message && message.toLowerCase().includes("email")) {
        //       // Si le message parle de l'email, on l'affiche dans le champ email
        //       newErreurs.email = message;
        //       setErreurs(newErreurs);
        //     } else {
        //       // Sinon, message générique
        //       setErrorMessage(message || "Une erreur est survenue.");
        //     }
        //   } else {
        //     setErrorMessage("Une erreur réseau est survenue.");
        //   }
        // });




        .catch((error) => {
          console.log("Erreur frontend:", error.response?.data); // 👈 AJOUTE ÇA
        
          if (error.response && error.response.data) {
            const { message, erreurs } = error.response.data;
        
            // if (erreurs && erreurs.email) {
            //   setErreurs((prev) => ({ ...prev, email: erreurs.email }));
           
            // } else if (message && message.toLowerCase().includes("email")) {
            //   setErreurs((prev) => ({ ...prev, email: message }));
            // } else {
            //   setErrorMessage(message || "Une erreur est survenue.");
            //   setErreurs(erreurs || {});
            // }
            if (error.response && error.response.data) {
              const { message, erreurs } = error.response.data;
              if (erreurs && erreurs.email) {
                setErreurs({ email: erreurs.email });  // Cette ligne doit mettre à jour le message d'erreur
              } else {
                setErrorMessage(message || "Une erreur est survenue.");
                setErreurs(erreurs || {});
                 console.log(erreurs);
              }
            }
          } else {
            setErrorMessage("Une erreur réseau est survenue.");
          }
        });
        
    } else {
      setFormValid(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      onSubmit({
        utilisateurs: jsonData.map((row) => ({
          nom: row.nom || "",
          prenom: row.prenom || "",
          email: row.email || "",
          posteTravail: row.posteTravail || "",
          brancheFonction: row.brancheFonction || "",
          dateFin: row.dateFin || null,
          statut: row.dateFin ? false : true,
          role: row.role || "",
        })),
      })
        .then(() => {
          setMessage(`${jsonData.length} utilisateurs importés avec succès.`);
          setErreurs({});
        })
        .catch((error) => {
          setMessage("");
          if (error.response && error.response.data.erreurs) {
            setErreurs(error.response.data.erreurs);
          } else {
            setErrorMessage("Erreur lors de l'importation.");
          }
        });
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <Input
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            className={erreurs.nom ? "border-red-500" : ""}
          />
          {erreurs.nom && <p className="text-red-500 text-xs">{erreurs.nom}</p>}

          <Input
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            className={erreurs.prenom ? "border-red-500" : ""}
          />
          {erreurs.prenom && <p className="text-red-500 text-xs">{erreurs.prenom}</p>}

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={erreurs.email ? "border-red-500" : ""}
          />
          {/* {erreurs.email && <p className="text-red-500 text-xs">{erreurs.email}</p>} */}
          {erreurs.email && <span className="text-red-500 text-sm">{erreurs.email}</span>}

          <Input
            name="posteTravail"
            placeholder="Poste de travail"
            value={formData.posteTravail}
            onChange={handleChange}
          />

          <Input
            name="brancheFonction"
            placeholder="Branche fonction"
            value={formData.brancheFonction}
            onChange={handleChange}
          />

          <Input
            type="date"
            name="dateFin"
            value={formData.dateFin || ""}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`p-2 rounded border ${erreurs.role ? "border-red-500" : "border-gray-300"}`}
            required
          >
            <option value="">-- Sélectionner un rôle --</option>
            <option value="Admin Fonctionnel">Admin Fonctionnel</option>
            <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
            <option value="Admin Dépôt">Admin Dépôt</option>
          </select>
          {erreurs.role && <p className="text-red-500 text-xs">{erreurs.role}</p>}

          <div className="flex items-center space-x-2 col-span-2">
            <input
              type="checkbox"
              name="statut"
              checked={formData.statut}
              onChange={handleChange}
              disabled={!!formData.dateFin}
            />
            <label className="text-sm">Statut actif</label>
          </div>

          <div className="col-span-2">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>

        <div className="flex items-center space-x-4 mt-4">
          <Button onClick={() => document.getElementById("excelInput").click()}>
            Importer depuis Excel
          </Button>
          <input
            type="file"
            id="excelInput"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
            Afficher les utilisateurs
          </Button>
        </div>

        {message && <p className="text-green-600">{message}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </AdminLayout>
  );
};

export default AjouterUtilisateurForm;



































// const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     onSubmit({
  //       ...formData,
  //       dateFin: formData.dateFin || null,
  //     })
  //       .then(response => {
  //         setMessage("Utilisateur ajouté avec succès !");
  //         setErreurs({});
  //         setFormData({
  //           nom: "",
  //           prenom: "",
  //           email: "",
  //           posteTravail: "",
  //           brancheFonction: "",
  //           dateFin: "",
  //           statut: true,
  //           role: "",
  //         });
  //       })
  //       .catch(error => {
  //         setMessage("");
  //         if (error.response && error.response.data.erreurs) {
  //           setErreurs(error.response.data.erreurs); // Erreurs provenant du backend
  //         }
  //       });
  //   } else {
  //     setFormValid(false);  // Formulaire invalide si des erreurs existent
  //   }
  // };





//   const handleSubmit = (e) => {
//   e.preventDefault();
//   if (validateForm()) {
//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     })
//       .then(response => {
//         setMessage("Utilisateur ajouté avec succès !");
//         setErreurs({});
//         setFormData({
//           nom: "",
//           prenom: "",
//           email: "",
//           posteTravail: "",
//           brancheFonction: "",
//           dateFin: "",
//           statut: true,
//           role: "",
//         });
//       })
//       .catch(error => {
//         setMessage("");
//         console.log(error.response); // Débogage pour voir ce que contient la réponse
//         if (error.response && error.response.data) {
//           const { message, erreurs } = error.response.data;
//           if (erreurs && erreurs.email) {
//             setErreurs({ email: "L'email existe déjà." });
//             console.log("Erreur d'email : ", erreurs.email); // Débogage pour vérifier l'erreur d'email
//           } else {
//             setMessage(message || "Une erreur est survenue.");
//             setErreurs(erreurs || {});
//           }
//         } else {
//           setMessage("Une erreur réseau est survenue.");
//         }
//       });
//   } else {
//     setFormValid(false);  // Formulaire invalide si des erreurs existent
//   }
// };
  


// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (validateForm()) {
//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     })
//       .then(response => {
//         setMessage("Utilisateur ajouté avec succès !");
//         setErreurs({});
//         setFormData({
//           nom: "",
//           prenom: "",
//           email: "",
//           posteTravail: "",
//           brancheFonction: "",
//           dateFin: "",
//           statut: true,
//           role: "",
//         });
//       })
//       .catch(error => {
//         setMessage("");
//         console.log(error.response); // Débogage pour voir ce que contient la réponse
//         if (error.response && error.response.data) {
//           const { message, erreurs } = error.response.data;
//           if (erreurs && erreurs.email) {
//             setErreurs({ email: "L'email existe déjà." });
//             console.log("Erreur d'email : ", erreurs.email); // Débogage pour vérifier l'erreur d'email
//           } else {
//             setMessage(message || "Une erreur est survenue.");
//             setErreurs(erreurs || {});
//           }
//         } else {
//           setMessage("Une erreur réseau est survenue.");
//         }
//       });
//   } else {
//     setFormValid(false);  // Formulaire invalide si des erreurs existent
//   }
// };


// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (validateForm()) {
//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     })
//       .then(response => {
//         setMessage("Utilisateur ajouté avec succès !");
//         setErreurs({});
//         setFormData({
//           nom: "",
//           prenom: "",
//           email: "",
//           posteTravail: "",
//           brancheFonction: "",
//           dateFin: "",
//           statut: true,
//           role: "",
//         });
//       })
//       .catch(error => {
//         setMessage("");
//         if (error.response && error.response.data) {
//           const { message, erreurs } = error.response.data;
//           if (erreurs && erreurs.email) {
//             setErreurs({ email: "L'email existe déjà." });  // Gestion spécifique de l'email existant
//             console.log("Erreur d'email : ", erreurs.email);
//           } else {
//             setMessage(message || "Une erreur est survenue.");
//             setErreurs(erreurs || {});
//           }
//         } else {
//           setMessage("Une erreur réseau est survenue.");
//         }
//       });
//   } else {
//     setFormValid(false);  // Formulaire invalide si des erreurs existent
//   }
// };












































































































































































































// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterUtilisateurForm = ({ onSubmit }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     posteTravail: "",
//     brancheFonction: "",
//     dateFin: "",
//     statut: true,
//     role: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     }
//   }, [formData.dateFin]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
//     if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
//     if (!formData.email.trim()) newErrors.email = "L'email est requis";
//     if (!formData.posteTravail.trim()) newErrors.posteTravail = "Poste requis";
//     if (!formData.brancheFonction.trim()) newErrors.brancheFonction = "Branche requise";
//     if (!formData.role.trim()) newErrors.role = "Rôle requis";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     });

//     setMessage("✅ Utilisateur ajouté avec succès !");
//     setFormData({
//       nom: "",
//       prenom: "",
//       email: "",
//       posteTravail: "",
//       brancheFonction: "",
//       dateFin: "",
//       statut: true,
//       role: "",
//     });
//     setErrors({});
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           nom: row.nom || "",
//           prenom: row.prenom || "",
//           email: row.email || "",
//           posteTravail: row.posteTravail || "",
//           brancheFonction: row.brancheFonction || "",
//           dateFin: row.dateFin || null,
//           statut: row.dateFin ? false : true,
//           role: row.role || "",
//         });
//       });

//       setMessage(`${jsonData.length} utilisateurs importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
//           {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}

//           <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
//           {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}

//           <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//           <Input name="posteTravail" placeholder="Poste de travail" value={formData.posteTravail} onChange={handleChange} />
//           {errors.posteTravail && <p className="text-red-500 text-sm">{errors.posteTravail}</p>}

//           <Input name="brancheFonction" placeholder="Branche fonction" value={formData.brancheFonction} onChange={handleChange} />
//           {errors.brancheFonction && <p className="text-red-500 text-sm">{errors.brancheFonction}</p>}

//           <Input type="date" name="dateFin" value={formData.dateFin || ""} onChange={handleChange} />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//           >
//             <option value="">-- Sélectionner un rôle --</option>
//             <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//             <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//             <option value="Admin Dépôt">Admin Dépôt</option>
//           </select>
//           {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

//           <div className="flex items-center space-x-2 col-span-2">
//             <input
//               type="checkbox"
//               name="statut"
//               checked={formData.statut}
//               onChange={handleChange}
//               disabled={!!formData.dateFin}
//             />
//             <label className="text-sm">Statut actif</label>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//             Afficher les utilisateurs
//           </Button>
//         </div>
//         {message && <p className="text-green-600">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterUtilisateurForm;























// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterUtilisateurForm = ({ onSubmit }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     posteTravail: "",
//     brancheFonction: "",
//     dateFin: "",
//     statut: true,
//     role: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     }
//   }, [formData.dateFin]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
//     if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
//     if (!formData.email.trim()) newErrors.email = "L'email est requis";
//     if (!formData.posteTravail.trim()) newErrors.posteTravail = "Poste requis";
//     if (!formData.brancheFonction.trim()) newErrors.brancheFonction = "Branche requise";
//     if (!formData.role.trim()) newErrors.role = "Rôle requis";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     onSubmit({
//       ...formData,
//       dateFin: formData.dateFin || null,
//     });

//     setMessage("✅ Utilisateur ajouté avec succès !");
//     setFormData({
//       nom: "",
//       prenom: "",
//       email: "",
//       posteTravail: "",
//       brancheFonction: "",
//       dateFin: "",
//       statut: true,
//       role: "",
//     });
//     setErrors({});
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           nom: row.nom || "",
//           prenom: row.prenom || "",
//           email: row.email || "",
//           posteTravail: row.posteTravail || "",
//           brancheFonction: row.brancheFonction || "",
//           dateFin: row.dateFin || null,
//           statut: row.dateFin ? false : true,
//           role: row.role || "",
//         });
//       });

//       setMessage(`${jsonData.length} utilisateurs importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
//           {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}

//           <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
//           {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}

//           <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//           <Input name="posteTravail" placeholder="Poste de travail" value={formData.posteTravail} onChange={handleChange} />
//           {errors.posteTravail && <p className="text-red-500 text-sm">{errors.posteTravail}</p>}

//           <Input name="brancheFonction" placeholder="Branche fonction" value={formData.brancheFonction} onChange={handleChange} />
//           {errors.brancheFonction && <p className="text-red-500 text-sm">{errors.brancheFonction}</p>}

//           <Input type="date" name="dateFin" value={formData.dateFin || ""} onChange={handleChange} />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//           >
//             <option value="">-- Sélectionner un rôle --</option>
//             <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//             <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//             <option value="Admin Dépôt">Admin Dépôt</option>
//           </select>
//           {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

//           <div className="flex items-center space-x-2 col-span-2">
//             <input
//               type="checkbox"
//               name="statut"
//               checked={formData.statut}
//               onChange={handleChange}
//               disabled={!!formData.dateFin}
//             />
//             <label className="text-sm">Statut actif</label>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//             Afficher les utilisateurs
//           </Button>
//         </div>
//         {message && <p className="text-green-600">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterUtilisateurForm;






// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterUtilisateurForm = ({ onSubmit }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     posteTravail: "",
//     brancheFonction: "",
//     dateFin: "",
//     statut: true,
//     role: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     }
//   }, [formData.dateFin]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
//     if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
//     if (!formData.email.trim()) newErrors.email = "L'email est requis";
//     // if (!formData.posteTravail.trim()) newErrors.posteTravail = "Poste requis";
//     // if (!formData.brancheFonction.trim()) newErrors.brancheFonction = "Branche requise";
//     if (!formData.role.trim()) newErrors.role = "Rôle requis";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({}); // ✅ Reset erreurs
//     setMessage(""); // ✅ Reset message

//     if (!validate()) return;

//     try {
//       await onSubmit({
//         ...formData,
//         dateFin: formData.dateFin || null,
//       });

//       setMessage("✅ Utilisateur ajouté avec succès !");
//       setFormData({
//         nom: "",
//         prenom: "",
//         email: "",
//         posteTravail: "",
//         brancheFonction: "",
//         dateFin: "",
//         statut: true,
//         role: "",
//       });
//     } catch (error) {
//       if (error.response?.status === 400 && error.response.data?.erreurs) {
//         const formattedErrors = {};
//         error.response.data.erreurs.forEach((err) => {
//           formattedErrors[err.path || err.field || "global"] = err.message;
//         });
//         setErrors(formattedErrors);
//       } else {
//         console.error("Erreur inattendue :", error);
//       }
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = async (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       let importedCount = 0;
//       setErrors({});
//       setMessage("");

//       for (const row of jsonData) {
//         try {
//           await onSubmit({
//             nom: row.nom || "",
//             prenom: row.prenom || "",
//             email: row.email || "",
//             posteTravail: row.posteTravail || "",
//             brancheFonction: row.brancheFonction || "",
//             dateFin: row.dateFin || null,
//             statut: row.dateFin ? false : true,
//             role: row.role || "",
//           });
//           importedCount++;
//         } catch (error) {
//           if (error.response?.status === 400 && error.response.data?.erreurs) {
//             const formattedErrors = {};
//             error.response.data.erreurs.forEach((err) => {
//               formattedErrors[err.path || err.field || "global"] = err.message;
//             });
//             setErrors(formattedErrors);
//             setMessage(`❌ Une ou plusieurs erreurs sont survenues à la ligne ${importedCount + 1}`);
//             break;
//           } else {
//             console.error("Erreur inattendue :", error);
//           }
//         }
//       }

//       if (importedCount > 0) {
//         setMessage(`${importedCount} utilisateurs importés depuis Excel.`);
//       }
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
//           {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}

//           <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
//           {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}

//           <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//           <Input name="posteTravail" placeholder="Poste de travail" value={formData.posteTravail} onChange={handleChange} />
//           {/* {errors.posteTravail && <p className="text-red-500 text-sm">{errors.posteTravail}</p>} */}

//           <Input name="brancheFonction" placeholder="Branche fonction" value={formData.brancheFonction} onChange={handleChange} />
//           {/* {errors.brancheFonction && <p className="text-red-500 text-sm">{errors.brancheFonction}</p>} */}

//           <Input type="date" name="dateFin" value={formData.dateFin || ""} onChange={handleChange} />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//           >
//             <option value="">-- Sélectionner un rôle --</option>
//             <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//             <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//             <option value="Admin Dépôt">Admin Dépôt</option>
//           </select>
//           {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

//           <div className="flex items-center space-x-2 col-span-2">
//             <input
//               type="checkbox"
//               name="statut"
//               checked={formData.statut}
//               onChange={handleChange}
//               disabled={!!formData.dateFin}
//             />
//             <label className="text-sm">Statut actif</label>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//             Afficher les utilisateurs
//           </Button>
//         </div>

//         {errors.global && <p className="text-red-600 text-sm mt-2">{errors.global}</p>}
//         {message && <p className="text-green-600">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterUtilisateurForm;
