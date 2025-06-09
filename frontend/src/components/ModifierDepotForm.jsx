// import React, { useState } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const ModifierDepotForm = ({ onSubmit, initialData = {}, onShowDepots }) => {
//   const [formData, setFormData] = useState({
//     codeDepot: "",
//     nomDepot: "",
//     typeDepot: "",
//     capaciteDepot: "",
//     description: "",
//     region: "",
//     ...initialData,
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "number" ? parseInt(value, 10) || "" : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setMessage("Dépôt mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le dépôt</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="codeDepot" placeholder="Code Dépôt" value={formData.codeDepot} onChange={handleChange} required />
//           <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} required />
//           <Input name="typeDepot" placeholder="Type Dépôt" value={formData.typeDepot} onChange={handleChange} required />
//           <Input
//             name="capaciteDepot"
//             type="number"
//             placeholder="Capacité Dépôt"
//             value={formData.capaciteDepot}
//             onChange={handleChange}
//             required
//           />
//           <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
//           <Input name="region" placeholder="Région" value={formData.region} onChange={handleChange} required />

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowDepots}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>

//         {message && <p className="text-green-600 font-medium">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierDepotForm;
















// import React, { useState } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";



// const wilayasByRegion = {
//   "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
//   "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
//   "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
//   "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
// };

// const ModifierDepotForm = ({ onSubmit, initialData = {}, onShowDepots }) => {
//   const [formData, setFormData] = useState({
//     nomDepot: "",
//     typeDepot: "",
//     capaciteDepot: "",
//     description: "",
//     region: "",
//     ...initialData,
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "number" ? parseInt(value, 10) || "" : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData); // `codeDepot` sera transmis automatiquement s'il est requis
//     setMessage("Dépôt mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le dépôt</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           {/* Affichage en lecture seule du code du dépôt */}
//           <div className="col-span-2">
//             <label className="block font-medium text-gray-700">Code Dépôt</label>
//             <input
//               type="text"
//               value={initialData.codeDepot || ""}
//               disabled
//               className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
//             />
//           </div>

//           <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} required />
//           <Input name="typeDepot" placeholder="Type Dépôt" value={formData.typeDepot} onChange={handleChange} required />
//           <Input
//             name="capaciteDepot"
//             type="number"
//             placeholder="Capacité Dépôt"
//             value={formData.capaciteDepot}
//             onChange={handleChange}
//             required
//           />
//           <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          

//           <div>
//   <label className="block mb-1 font-medium">Région</label>
//   <select
//     name="region"
//     value={formData.region}
//     onChange={handleChange}
//     className="w-full border p-2 rounded"
//   >
//     <option value="">Sélectionnez une région</option>
//     {Object.keys(wilayasByRegion).map((region) => (
//       <option key={region} value={region}>{region}</option>
//     ))}
//   </select>
// </div>

// <div>
//   <label className="block mb-1 font-medium">Wilaya</label>
//   <select
//     name="wilaya"
//     value={formData.wilaya || ""}
//     onChange={handleChange}
//     className="w-full border p-2 rounded"
//     disabled={!formData.region}
//   >
//     <option value="">Sélectionnez une wilaya</option>
//     {formData.region &&
//       wilayasByRegion[formData.region].map((wilaya) => (
//         <option key={wilaya} value={wilaya}>{wilaya}</option>
//       ))}
//   </select>
// </div>

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowDepots}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>

//         {message && <p className="text-green-600 font-medium">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierDepotForm;










// import React, { useState } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const wilayasByRegion = {
//   "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
//   "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
//   "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
//   "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
// };

// const ModifierDepotForm = ({ onSubmit, initialData = {}, onShowDepots }) => {
//   const [formData, setFormData] = useState({
//     nomDepot: "",
//     typeDepot: "",
//     capaciteDepot: "",
//     description: "",
//     region: "",
//     wilaya: "",
//     ...initialData,
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "number" ? parseInt(value, 10) || "" : value,
//       // Si région change, on réinitialise la wilaya
//       ...(name === "region" ? { wilaya: "" } : {}),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setMessage("Dépôt mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le dépôt</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <div className="col-span-2">
//             <label className="block font-medium text-gray-700">Code Dépôt</label>
//             <input
//               type="text"
//               value={initialData.codeDepot || ""}
//               disabled
//               className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
//             />
//           </div>

//           <Input name="nomDepot" placeholder="Nom Dépôt" value={formData.nomDepot} onChange={handleChange} required />
//           <Input name="typeDepot" placeholder="Type Dépôt" value={formData.typeDepot} onChange={handleChange} required />
//           <Input
//             name="capaciteDepot"
//             type="number"
//             placeholder="Capacité Dépôt"
//             value={formData.capaciteDepot}
//             onChange={handleChange}
//             required
//           />
//           <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

//           <div>
//             <label className="block mb-1 font-medium">Région</label>
//             <select
//               name="region"
//               value={formData.region}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Sélectionnez une région</option>
//               {Object.keys(wilayasByRegion).map((region) => (
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

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowDepots}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>

//         {message && <p className="text-green-600 font-medium">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierDepotForm;







import React, { useState } from "react";
import AdminLayout from "../pages/AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";

const wilayasByRegion = {
  "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
  "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
  "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
  "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
};

const ModifierDepotForm = ({ onSubmit, initialData = {}, onShowDepots }) => {
  const [formData, setFormData] = useState({
    nomDepot: "",
    typeDepot: "",
    capaciteDepot: "",
    description: "",
    region: "",
    wilaya: "",
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || "" : value,
      ...(name === "region" ? { wilaya: "" } : {}),
    }));
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
    setMessage("✅ Dépôt mis à jour avec succès !");
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Modifier le dépôt</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <div>
            {errors.nomDepot && <p className="text-red-600 mb-1">{errors.nomDepot}</p>}
            <Input
              name="nomDepot"
              placeholder="Nom Dépôt"
              value={formData.nomDepot}
              onChange={handleChange}
            />
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
            <Input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            {errors.region && <p className="text-red-600 mb-1">{errors.region}</p>}
            <label className="block mb-1 font-medium">Région</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionnez une région</option>
              {Object.keys(wilayasByRegion).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
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
                  <option key={wilaya} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-span-2">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>

        {message && <p className="text-green-600 mt-4">{message}</p>}
      </div>
    </AdminLayout>
  );
};

export default ModifierDepotForm;






