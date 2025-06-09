// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterVehiculeForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     matricule: "",
//     typeVehicule: "",
//     capaciteVehicule: "",
//     statut: "",
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setMessage("✅ Véhicule ajouté avec succès !");
//     setFormData({
//       matricule: "",
//       typeVehicule: "",
//       capaciteVehicule: "",
//       statut: "",
//     });
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
//           matricule: row.matricule || "",
//           typeVehicule: row.typeVehicule || "",
//           capaciteVehicule: row.capaciteVehicule || "",
//           statut: row.statut || "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} véhicules importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un véhicule</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="matricule" placeholder="Matricule" value={formData.matricule} onChange={handleChange} />
//           <Input name="typeVehicule" placeholder="Type de véhicule" value={formData.typeVehicule} onChange={handleChange} />
//           <Input
//             name="capaciteVehicule"
//             type="number"
//             placeholder="Capacité du véhicule"
//             value={formData.capaciteVehicule}
//             onChange={handleChange}
//           />
//           <Input name="statut" placeholder="Statut" value={formData.statut} onChange={handleChange} />

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
//           <Button variant="outline" onClick={() => navigate("/vehicules")}>
//             Afficher les véhicules
//           </Button>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterVehiculeForm;










// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterVehiculeForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     matricule: "",
//     typeVehicule: "",
//     capaciteVehicule: "",
//     statut: "",
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await onSubmit(formData);
//       setMessage("✅ Véhicule ajouté avec succès !");
//       setFormData({
//         matricule: "",
//         typeVehicule: "",
//         capaciteVehicule: "",
//         statut: "",
//       });
//     } catch (error) {
//       setMessage("❌ Erreur : " + (error?.response?.data?.error || "Vérifiez les champs."));
//     }
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
//           matricule: row.matricule || "",
//           typeVehicule: row.typeVehicule || "",
//           capaciteVehicule: row.capaciteVehicule || "",
//           statut: row.statut || "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} véhicules importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un véhicule</h2>

//         {message && (
//           <div className="text-sm text-green-600 font-medium">{message}</div>
//         )}

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input
//             name="matricule"
//             placeholder="Matricule"
//             value={formData.matricule}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="typeVehicule"
//             placeholder="Type de véhicule"
//             value={formData.typeVehicule}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="capaciteVehicule"
//             type="number"
//             placeholder="Capacité du véhicule"
//             value={formData.capaciteVehicule}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="statut"
//             placeholder="Statut"
//             value={formData.statut}
//             onChange={handleChange}
//             required
//           />

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
//           <Button variant="outline" onClick={() => navigate("/vehicules")}>
//             Afficher les véhicules
//           </Button>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterVehiculeForm;









// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterVehiculeForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     matricule: "",
//     typeVehicule: "",
//     capaciteVehicule: "",
//     statut: "",
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const typesVehicules = ["Numilog_Camions", "Semi-remorques", "Camion léger"];
//   const statuts = ["Disponible", "Non disponible", "En maintenance"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await onSubmit(formData);
//       setMessage("✅ Véhicule ajouté avec succès !");
//       setFormData({
//         matricule: "",
//         typeVehicule: "",
//         capaciteVehicule: "",
//         statut: "",
//       });
//     } catch (error) {
//       setMessage("❌ Erreur : " + (error?.response?.data?.error || "Vérifiez les champs."));
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       const typesAutorises = typesVehicules;
//       const statutsAutorises = statuts;

//       let lignesValides = 0;
//       let lignesInvalides = 0;
//       let erreurs = [];

//       jsonData.forEach((row, index) => {
//         const type = row.typeVehicule?.trim();
//         const statut = row.statut?.trim();

//         if (!typesAutorises.includes(type) || !statutsAutorises.includes(statut)) {
//           lignesInvalides++;
//           erreurs.push(`⛔ Ligne ${index + 2} : type ou statut invalide (type = "${type}", statut = "${statut}")`);
//           return;
//         }

//         onSubmit({
//           matricule: row.matricule || "",
//           typeVehicule: type,
//           capaciteVehicule: row.capaciteVehicule || "",
//           statut: statut,
//         });

//         lignesValides++;
//       });

//       if (erreurs.length > 0) {
//         setMessage(`✅ ${lignesValides} véhicules importés.\n❌ ${lignesInvalides} ligne(s) ignorée(s) :\n- ${erreurs.join("\n- ")}`);
//       } else {
//         setMessage(`✅ ${lignesValides} véhicules importés avec succès.`);
//       }
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un véhicule</h2>

//         {message && (
//           <div className="whitespace-pre-wrap text-sm text-green-600 font-medium">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input
//             name="matricule"
//             placeholder="Matricule"
//             value={formData.matricule}
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="typeVehicule"
//             value={formData.typeVehicule}
//             onChange={handleChange}
//             required
//             className="border border-gray-300 p-2 rounded"
//           >
//             <option value="">-- Type de véhicule --</option>
//             {typesVehicules.map((type, idx) => (
//               <option key={idx} value={type}>{type}</option>
//             ))}
//           </select>

//           <Input
//             name="capaciteVehicule"
//             type="number"
//             placeholder="Capacité du véhicule"
//             value={formData.capaciteVehicule}
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="statut"
//             value={formData.statut}
//             onChange={handleChange}
//             required
//             className="border border-gray-300 p-2 rounded"
//           >
//             <option value="">-- Statut --</option>
//             {statuts.map((s, idx) => (
//               <option key={idx} value={s}>{s}</option>
//             ))}
//           </select>

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
//           <Button variant="outline" onClick={() => navigate("/vehicules")}>
//             Afficher les véhicules
//           </Button>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterVehiculeForm;








// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const newErrors = {};

//   // Validation du matricule : obligatoire et format valide
//   if (!formData.matricule) {
//     newErrors.matricule = "Le matricule est requis.";
//   } else if (!/^[A-Za-z0-9]+$/.test(formData.matricule)) {
//     newErrors.matricule = "Le matricule doit être alphanumérique.";
//   }

//   // Validation de la capacité : obligatoire et positive
//   if (!formData.capaciteVehicule) {
//     newErrors.capaciteVehicule = "La capacité du véhicule est requise.";
//   } else if (formData.capaciteVehicule <= 0) {
//     newErrors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//   }

//   // Validation du type de véhicule : obligatoire
//   if (!formData.typeVehicule) {
//     newErrors.typeVehicule = "Le type de véhicule est requis.";
//   }

//   // Si des erreurs existent, on les affiche
//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     return;
//   }

//   // Si pas d'erreurs, on envoie les données
//   try {
//     await onSubmit(formData);
//     setMessage("✅ Véhicule ajouté avec succès !");
//     setFormData({
//       matricule: "",
//       typeVehicule: "",
//       capaciteVehicule: "",
//       statut: "",
//     });
//     setErrors({}); // Réinitialiser les erreurs
//   } catch (error) {
//     setMessage("❌ Erreur : " + (error?.response?.data?.error || "Vérifiez les champs."));
//   }
// };




//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation du formulaire
//     const newErrors = {};

//     // Validation du matricule : obligatoire et format valide
//     if (!formData.matricule) {
//         newErrors.matricule = "Le matricule est requis.";
//     } else if (!/^[A-Za-z0-9]+$/.test(formData.matricule)) {
//         newErrors.matricule = "Le matricule doit être alphanumérique.";
//     }

//     // Validation de la capacité : obligatoire et positive
//     if (!formData.capaciteVehicule) {
//         newErrors.capaciteVehicule = "La capacité du véhicule est requise.";
//     } else if (formData.capaciteVehicule <= 0) {
//         newErrors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//     }

//     // Validation du type de véhicule : obligatoire
//     if (!formData.typeVehicule) {
//         newErrors.typeVehicule = "Le type de véhicule est requis.";
//     }

//     // Si des erreurs existent, on les affiche
//     if (Object.keys(newErrors).length > 0) {
//         setErrors(newErrors);
//         return;
//     }

//     // Si pas d'erreurs, on envoie les données
//     try {
//         const response = await onSubmit(formData);

//         // Vérification de la réponse
//         if (response.message && response.vehicule) {
//             setMessage(` ${response.message}`);
//             setFormData({
//                 matricule: "",
//                 typeVehicule: "",
//                 capaciteVehicule: "",
//                 statut: "",
//             });
//             setErrors({}); // Réinitialiser les erreurs
//         } else {
//             setMessage("Le véhicule n'a pas été ajouté.");
//         }
//     } catch (error) {
//         setMessage("Une erreur est survenue.");
//     }
// };




import React, { useState } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

const AjouterVehiculeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    matricule: "",
    // typeVehicule: "",
    capaciteVehicule: "",
    statut: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // const typesVehicules = ["Numilog_Camions", "Semi-remorques", "Camion léger"];
  const statuts = ["disponible"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du formulaire
    const newErrors = {};

    // Validation du matricule : obligatoire et format valide
    if (!formData.matricule) {
      newErrors.matricule = "Le matricule est requis.";
    } else if (!/^[A-Za-z0-9]+$/.test(formData.matricule)) {
      newErrors.matricule = "Le matricule doit être alphanumérique.";
    }

    // Validation de la capacité : obligatoire et positive
    if (!formData.capaciteVehicule) {
      newErrors.capaciteVehicule = "La capacité du véhicule est requise.";
    } else if (formData.capaciteVehicule <= 0) {
      newErrors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
    }

    // // Validation du type de véhicule : obligatoire
    // if (!formData.typeVehicule) {
    //   newErrors.typeVehicule = "Le type de véhicule est requis.";
    // }

    // Si des erreurs existent, on les affiche
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si pas d'erreurs, on envoie les données
    try {
      const response = await onSubmit(formData);

      // Vérification de la réponse
      if (response?.message === "Le matricule existe déjà.") {
        setMessage("❌ Erreur : Le matricule existe déjà.");
        setErrors({ matricule: "Le matricule existe déjà." }); // Affichage de l'erreur
      } else if (response.message && response.vehicule) {
        setMessage(`✅ ${response.message}`);
        setFormData({
          matricule: "",
          // typeVehicule: "",
          capaciteVehicule: "",
          statut: "",
        });
        setErrors({}); // Réinitialiser les erreurs
      } else {
        setMessage("Le véhicule n'a pas été ajouté.");
      }
    } catch (error) {
      setMessage("❌ Une erreur est survenue. Matricule déjà existant.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      // const typesAutorises = typesVehicules;
      const statutsAutorises = statuts;

      let lignesValides = 0;
      let lignesInvalides = 0;
      let erreurs = [];

      jsonData.forEach((row, index) => {
        // // const type = row.typeVehicule?.trim();
        // const statut = row.statut?.trim();

        // if (!typesAutorises.includes(type) || !statutsAutorises.includes(statut)) {
        //   lignesInvalides++;
        //   erreurs.push(`Ligne ${index + 2} : type ou statut invalide (type = "${type}", statut = "${statut}")`);
        //   return;
        // }

        const statut = row.statut?.trim();

        if (!statutsAutorises.includes(statut)) {
          lignesInvalides++;
          erreurs.push(`Ligne ${index + 2} : statut invalide (statut = "${statut}")`);
          return;
        } 

        onSubmit({
          matricule: row.matricule || "",
          // typeVehicule: type,
          capaciteVehicule: row.capaciteVehicule || "",
          statut: statut,
        });

        lignesValides++;
      });

      if (erreurs.length > 0) {
        setMessage(`✅ ${lignesValides} véhicules importés.\n ${lignesInvalides} ligne(s) ignorée(s) :\n- ${erreurs.join("\n- ")}`);
      } else {
        setMessage(`✅ ${lignesValides} véhicules importés avec succès.`);
      }
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Ajouter un véhicule</h2>

        {/* Message d'erreur global */}
        {message && (
          <div style={{ color: 'red', fontSize: '14px' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <div>
            <Input
              name="matricule"
              placeholder="Matricule"
              value={formData.matricule}
              onChange={handleChange}
              required
            />
            {errors.matricule && <div className="text-red-500 text-sm">{errors.matricule}</div>}
          </div>

          {/* <div>
            <select
              name="typeVehicule"
              value={formData.typeVehicule}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">-- Type de véhicule --</option>
              {typesVehicules.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
            {errors.typeVehicule && <div className="text-red-500 text-sm">{errors.typeVehicule}</div>}
          </div> */}

          <div>
            <Input
              name="capaciteVehicule"
              type="number"
              placeholder="Capacité du véhicule"
              value={formData.capaciteVehicule}
              onChange={handleChange}
              required
            />
            {errors.capaciteVehicule && <div className="text-red-500 text-sm">{errors.capaciteVehicule}</div>}
          </div>

          <div>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">-- Statut --</option>
              {statuts.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
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
          <Button variant="outline" onClick={() => navigate("/vehicules")}>
            Afficher les véhicules
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AjouterVehiculeForm;
