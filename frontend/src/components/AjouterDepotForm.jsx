// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";


// const AjouterDepotForm = ({ onSubmit, onShowDepots }) => {
//   const [formData, setFormData] = useState({
//     codeDepot: "",
//     nomDepot: "",
//     typeDepot: "",
//     capaciteDepot: "",
//     description: "",
//     region: "",
//   });

//   const [message, setMessage] = useState("");

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

//     setMessage(" Dépôt ajouté avec succès !");
//     setFormData({
//       codeDepot: "",
//       nomDepot: "",
//       typeDepot: "",
//       capaciteDepot: "",
//       description: "",
//       region: "",
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
//           codeDepot: row.codeDepot || "",
//           nomDepot: row.nomDepot || "",
//           typeDepot: row.typeDepot || "",
//           capaciteDepot: row.capaciteDepot || "",
//           description: row.description || "",
//           region: row.region || "",
//         });
//       });

//       setMessage(` ${jsonData.length} dépôts importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };
//   const navigate = useNavigate();

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un dépôt</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="codeDepot" placeholder="Code Dépôt" value={formData.codeDepot} onChange={handleChange} />
//           <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} />
//           <Input name="typeDepot" placeholder="Type Dépôt" value={formData.typeDepot} onChange={handleChange} />
//           <Input
//             name="capaciteDepot"
//             type="number"
//             placeholder="Capacité Dépôt"
//             value={formData.capaciteDepot}
//             onChange={handleChange}
//           />
//           <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
//           <Input name="region" placeholder="Région" value={formData.region} onChange={handleChange} />

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
//           <Button variant="outline" onClick={() => navigate("/depots")}>
//   Afficher les dépôts
// </Button>

//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterDepotForm;






// // AjouterDepotForm.jsx
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterDepotForm = ({ onSubmit, onShowDepots }) => {
//   const [formData, setFormData] = useState({
//     nomDepot: "",
//     typeDepot: "",
//     capaciteDepot: "",
//     description: "",
//     region: "",
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

//     setMessage("Dépôt ajouté avec succès !");
//     setFormData({
//       nomDepot: "",
//       typeDepot: "",
//       capaciteDepot: "",
//       description: "",
//       region: "",
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
//           nomDepot: row.nomDepot || "",
//           typeDepot: row.typeDepot || "",
//           capaciteDepot: row.capaciteDepot || "",
//           description: row.description || "",
//           region: row.region || "",
//         });
//       });

//       setMessage(`${jsonData.length} dépôts importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un dépôt</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} />
//           <Input name="typeDepot" placeholder="Type Dépôt" value={formData.typeDepot} onChange={handleChange} />
//           <Input
//             name="capaciteDepot"
//             type="number"
//             placeholder="Capacité Dépôt"
//             value={formData.capaciteDepot}
//             onChange={handleChange}
//           />
//           <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
//           <Input name="region" placeholder="Région" value={formData.region} onChange={handleChange} />

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
//           <Button variant="outline" onClick={() => navigate("/depots")}>
//             Afficher les dépôts
//           </Button>
//         </div>
//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterDepotForm;











// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// // Liste wilayas par région
// const wilayasByRegion = {
//   "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
//   "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
//   "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
//   "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
// };

// const AjouterDepotForm = ({ onSubmit, onShowDepots }) => {
//   const [formData, setFormData] = useState({
//     nomDepot: "",
//     typeDepot: "",
//     capaciteDepot: "",
//     description: "",
//     region: "",
//     wilaya: ""
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Réinitialiser la wilaya si la région change
//     if (name === "region") {
//       setFormData((prev) => ({
//         ...prev,
//         region: value,
//         wilaya: ""
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSubmit(formData);

//     setMessage("Dépôt ajouté avec succès !");
//     setFormData({
//       nomDepot: "",
//       typeDepot: "",
//       capaciteDepot: "",
//       description: "",
//       region: "",
//       wilaya: ""
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
//           nomDepot: row.nomDepot || "",
//           typeDepot: row.typeDepot || "",
//           capaciteDepot: row.capaciteDepot || "",
//           description: row.description || "",
//           region: row.region || "",
//           wilaya: row.wilaya || "",
//         });
//       });

//       setMessage(`${jsonData.length} dépôts importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un dépôt</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} />
//           <Input name="typeDepot" placeholder="Type Dépôt" value={formData.typeDepot} onChange={handleChange} />
//           <Input
//             name="capaciteDepot"
//             type="number"
//             placeholder="Capacité Dépôt"
//             value={formData.capaciteDepot}
//             onChange={handleChange}
//           />
//           <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

//           {/* Select Région */}
//           <div>
//             <label className="block mb-1 font-medium">Région</label>
//             <select name="region" value={formData.region} onChange={handleChange} className="w-full border p-2 rounded">
//               <option value="">Sélectionnez une région</option>
//               {Object.keys(wilayasByRegion).map(region => (
//                 <option key={region} value={region}>{region}</option>
//               ))}
//             </select>
//           </div>

//           {/* Select Wilaya */}
//           <div>
//             <label className="block mb-1 font-medium">Wilaya</label>
//             <select
//               name="wilaya"
//               value={formData.wilaya}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               disabled={!formData.region}
//             >
//               <option value="">Sélectionnez une wilaya</option>
//               {formData.region &&
//                 wilayasByRegion[formData.region].map((wilaya) => (
//                   <option key={wilaya} value={wilaya}>{wilaya}</option>
//                 ))}
//             </select>
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
//           <Button variant="outline" onClick={() => navigate("/depots")}>
//             Afficher les dépôts
//           </Button>
//         </div>
//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterDepotForm;









// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// // Liste wilayas par région
// const wilayasByRegion = {
//   "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
//   "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
//   "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
//   "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
// };

// const AjouterDepotForm = ({ onSubmit, onShowDepots }) => {
//   const [formData, setFormData] = useState({
//     nomDepot: "",
//     typeDepot: "",
//     capaciteDepot: "",
//     description: "",
//     region: "",
//     wilaya: ""
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "region") {
//       setFormData((prev) => ({
//         ...prev,
//         region: value,
//         wilaya: ""
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const validateForm = ({ nomDepot, typeDepot, capaciteDepot, region, wilaya }) => {
//     const nomRegex = /^(?=.*[a-zA-ZÀ-ÿ])[a-zA-ZÀ-ÿ0-9\s\-']+$/;

//     if (!nomDepot || nomDepot.trim() === "") {
//       return "❌ Le champ 'Nom du dépôt' est obligatoire.";
//     }

//     if (!nomRegex.test(nomDepot.trim())) {
//       return "❌ Le nom du dépôt est invalide. Il doit contenir au moins une lettre et ne pas être composé uniquement de chiffres ou de symboles.";
//     }

//     if (!typeDepot || typeDepot.trim() === "") {
//       return "❌ Le champ 'Type de dépôt' est obligatoire.";
//     }

//     if (!capaciteDepot || capaciteDepot.trim() === "") {
//       return "❌ Le champ 'Capacité du dépôt' est obligatoire.";
//     }

//     if (isNaN(capaciteDepot) || Number(capaciteDepot) <= 0) {
//       return "❌ La capacité du dépôt doit être un nombre positif.";
//     }

//     if (!region || region.trim() === "") {
//       return "❌ Le champ 'Région' est obligatoire.";
//     }

//     if (!wilaya || wilaya.trim() === "") {
//       return "❌ Le champ 'Wilaya' est obligatoire.";
//     }

//     return null; // Aucune erreur
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const error = validateForm(formData);
//     if (error) {
//       setMessage(error);
//       return;
//     }

//     onSubmit(formData);
//     setMessage("✅ Dépôt ajouté avec succès !");
//     setFormData({
//       nomDepot: "",
//       typeDepot: "",
//       capaciteDepot: "",
//       description: "",
//       region: "",
//       wilaya: ""
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

//       let validCount = 0;
//       jsonData.forEach((row) => {
//         const rowData = {
//           nomDepot: row.nomDepot || "",
//           typeDepot: row.typeDepot || "",
//           capaciteDepot: row.capaciteDepot || "",
//           description: row.description || "",
//           region: row.region || "",
//           wilaya: row.wilaya || "",
//         };

//         const error = validateForm(rowData);
//         if (!error) {
//           onSubmit(rowData);
//           validCount++;
//         }
//       });

//       setMessage(`✅ ${validCount} dépôt(s) valides importé(s) depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un dépôt</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} />
//           <Input name="typeDepot" placeholder="Type Dépôt" value={formData.typeDepot} onChange={handleChange} />
//           <Input
//             name="capaciteDepot"
//             type="number"
//             placeholder="Capacité Dépôt"
//             value={formData.capaciteDepot}
//             onChange={handleChange}
//           />
//           <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

//           <div>
//             <label className="block mb-1 font-medium">Région</label>
//             <select name="region" value={formData.region} onChange={handleChange} className="w-full border p-2 rounded">
//               <option value="">Sélectionnez une région</option>
//               {Object.keys(wilayasByRegion).map(region => (
//                 <option key={region} value={region}>{region}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Wilaya</label>
//             <select
//               name="wilaya"
//               value={formData.wilaya}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               disabled={!formData.region}
//             >
//               <option value="">Sélectionnez une wilaya</option>
//               {formData.region &&
//                 wilayasByRegion[formData.region].map((wilaya) => (
//                   <option key={wilaya} value={wilaya}>{wilaya}</option>
//                 ))}
//             </select>
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
//           <Button variant="outline" onClick={() => navigate("/depots")}>
//             Afficher les dépôts
//           </Button>
//         </div>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterDepotForm;








import React, { useState } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

// Liste wilayas par région
const wilayasByRegion = {
  "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
  "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
  "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
  "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
};

const AjouterDepotForm = ({ onSubmit, onShowDepots }) => {
  const [formData, setFormData] = useState({
    nomDepot: "",
    typeDepot: "",
    capaciteDepot: "",
    description: "",
    region: "",
    wilaya: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "region") {
      setFormData((prev) => ({
        ...prev,
        region: value,
        wilaya: ""
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = ({ nomDepot, typeDepot, capaciteDepot, region, wilaya }) => {
    const nomRegex = /^(?=.*[a-zA-ZÀ-ÿ])[a-zA-ZÀ-ÿ0-9\s\-']+$/;
    const errors = {};

    if (!nomDepot || nomDepot.trim() === "") {
      errors.nomDepot = "Le champ 'Nom du dépôt' est obligatoire.";
    } else if (!nomRegex.test(nomDepot.trim())) {
      errors.nomDepot = "Le nom du dépôt est invalide. Il doit contenir au moins une lettre.";
    }

    if (!typeDepot || typeDepot.trim() === "") {
      errors.typeDepot = "Le champ 'Type de dépôt' est obligatoire.";
    }

    if (!capaciteDepot || String(capaciteDepot).trim() === "") {
      errors.capaciteDepot = "Le champ 'Capacité du dépôt' est obligatoire.";
    } else if (isNaN(Number(capaciteDepot)) || Number(capaciteDepot) <= 0) {
      errors.capaciteDepot = "La capacité du dépôt doit être un nombre positif.";
    }

    if (!region || region.trim() === "") {
      errors.region = "Le champ 'Région' est obligatoire.";
    }

    if (!wilaya || wilaya.trim() === "") {
      errors.wilaya = "Le champ 'Wilaya' est obligatoire.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
    setMessage("✅ Dépôt ajouté avec succès !");
    setFormData({
      nomDepot: "",
      typeDepot: "",
      capaciteDepot: "",
      description: "",
      region: "",
      wilaya: ""
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      let validCount = 0;
      jsonData.forEach((row) => {
        const rowData = {
          nomDepot: row.nomDepot || "",
          typeDepot: row.typeDepot || "",
          capaciteDepot: row.capaciteDepot || "",
          description: row.description || "",
          region: row.region || "",
          wilaya: row.wilaya || "",
        };

        const error = validateForm(rowData);
        if (Object.keys(error).length === 0) {
          onSubmit(rowData);
          validCount++;
        }
      });

      setMessage(`✅ ${validCount} dépôt(s) valides importé(s) depuis Excel.`);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Ajouter un dépôt</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <div className="col-span-1">
            {errors.nomDepot && <p className="text-red-600 mb-1">{errors.nomDepot}</p>}
            <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} />
          </div>

          <div>
            {errors.typeDepot && <p className="text-red-600 mb-1">{errors.typeDepot}</p>}
            <label className="block mb-1 font-medium">Type de dépôt</label>
            <select
              name="typeDepot"
              value={formData.typeDepot}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionnez un type</option>
              <option value="C">CLR</option>
             
            </select>
          </div>

          <div>
            {errors.capaciteDepot && <p className="text-red-600 mb-1">{errors.capaciteDepot}</p>}
            <Input
              name="capaciteDepot"
              type="number"
              placeholder="Capacité Dépôt"
              value={formData.capaciteDepot}
              onChange={handleChange}
            />
          </div>

          <div>
            <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          </div>

          <div>
            {errors.region && <p className="text-red-600 mb-1">{errors.region}</p>}
            <label className="block mb-1 font-medium">Région</label>
            <select name="region" value={formData.region} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">Sélectionnez une région</option>
              {Object.keys(wilayasByRegion).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            {errors.wilaya && <p className="text-red-600 mb-1">{errors.wilaya}</p>}
            <label className="block mb-1 font-medium">Wilaya</label>
            <select
              name="wilaya"
              value={formData.wilaya}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!formData.region}
            >
              <option value="">Sélectionnez une wilaya</option>
              {formData.region &&
                wilayasByRegion[formData.region].map((wilaya) => (
                  <option key={wilaya} value={wilaya}>{wilaya}</option>
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
          <Button variant="outline" onClick={() => navigate("/depots")}>Afficher les dépôts</Button>
        </div>

        {message && <p className="text-green-600 mt-4">{message}</p>}
      </div>
    </AdminLayout>
  );
};

export default AjouterDepotForm;