// import React, { useState } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const ModifierVehiculeForm = ({ onSubmit, initialData = {}, onShowVehicules }) => {
//   const [formData, setFormData] = useState({
//     matricule: "",
//     typeVehicule: "",
//     capaciteVehicule: "",
//     statut: "",
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
//     console.log("📦 Données envoyées (vehicule) :", formData);
//     onSubmit(formData);
//     setMessage("Véhicule mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le véhicule</h2>

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
//             type="number"
//             name="capaciteVehicule"
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

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowVehicules}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>

//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierVehiculeForm;






// import React, { useState } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const ModifierVehiculeForm = ({ onSubmit, initialData = {}, onShowVehicules }) => {
//   const [formData, setFormData] = useState({
//     matricule: "",
//     typeVehicule: "",
//     capaciteVehicule: "",
//     statut: "",
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
//     console.log("📦 Données envoyées (véhicule) :", formData);
//     onSubmit(formData);
//     setMessage("Véhicule mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le véhicule</h2>

//         {message && <div className="text-green-600 font-medium">{message}</div>}

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          
//           <Input
//             name="typeVehicule"
//             placeholder="Type de véhicule"
//             value={formData.typeVehicule}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             type="number"
//             name="capaciteVehicule"
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

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowVehicules}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierVehiculeForm;







import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";

const ModifierVehiculeForm = ({ onSubmit, initialData = {}, onShowVehicules }) => {
  const [formData, setFormData] = useState({
    matricule: "",
    // typeVehicule: "",
    capaciteVehicule: "",
    statut: "",
    ...initialData,
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // const typesVehicules = ["Numilog_Camions", "Semi-remorques", "Camion léger"];
  const statuts = ["Disponible", "Non disponible", "En maintenance"];

  // Handle the change of input fields
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des données avant d'envoyer la requête
    const newErrors = {};

    // Validation du matricule (obligatoire et format valide)
    if (!formData.matricule) {
      newErrors.matricule = "Le matricule est requis.";
    } else if (!/^[A-Za-z0-9]+$/.test(formData.matricule)) {
      newErrors.matricule = "Le matricule doit être alphanumérique.";
    }

    // Validation de la capacité du véhicule (obligatoire et positive)
    if (!formData.capaciteVehicule) {
      newErrors.capaciteVehicule = "La capacité du véhicule est requise.";
    } else if (formData.capaciteVehicule <= 0) {
      newErrors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
    }

    // // Validation du type de véhicule (obligatoire)
    // if (!formData.typeVehicule) {
    //   newErrors.typeVehicule = "Le type de véhicule est requis.";
    // }

    // Validation du statut (obligatoire)
    if (!formData.statut) {
      newErrors.statut = "Le statut est requis.";
    }

    // Si des erreurs existent, on les affiche
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si pas d'erreurs, on envoie les données de modification
    try {
      const response = await onSubmit(formData);

      if (response.message && response.vehicule) {
        setMessage(`✅ Véhicule modifié avec succès !`);
        setFormData({
          matricule: "",
          // typeVehicule: "",
          capaciteVehicule: "",
          statut: "",
        });
        setErrors({}); // Réinitialiser les erreurs
      } else if (response.error) {
        setMessage(response.error); // Affichage des erreurs de contrainte d'intégrité (par ex. matricule déjà pris)
      } else {
        setMessage("❌ Le véhicule n'a pas pu être modifié.");
      }
    } catch (error) {
      setMessage("❌ Une erreur est survenue lors de la modification.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Modifier le véhicule</h2>

        {message && <div className="text-green-600 font-medium">{message}</div>}
        {Object.keys(errors).length > 0 && (
          <div className="text-red-600 font-medium">
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <Input
            name="matricule"
            placeholder="Matricule du véhicule"
            value={formData.matricule}
            onChange={handleChange}
            required
          />
          {/* <div>
            <label htmlFor="typeVehicule" className="block">Type de véhicule</label>
            <select
              name="typeVehicule"
              value={formData.typeVehicule}
              onChange={handleChange}
              required
              className="w-full p-2 border"
            >
              <option value="">Sélectionner un type de véhicule</option>
              {typesVehicules.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div> */}
          <Input
            type="number"
            name="capaciteVehicule"
            placeholder="Capacité du véhicule"
            value={formData.capaciteVehicule}
            onChange={handleChange}
            required
          />
          <div>
            <label htmlFor="statut" className="block">Statut</label>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              required
              className="w-full p-2 border"
            >
              <option value="">Sélectionner un statut</option>
              {statuts.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex space-x-4">
            <Button type="submit">Mettre à jour</Button>
            <Button variant="outline" onClick={onShowVehicules}>
              Retour à la liste
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ModifierVehiculeForm;
