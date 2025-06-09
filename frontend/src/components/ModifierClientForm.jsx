// import React, { useState } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const ModifierClientForm = ({ onSubmit, initialData = {}, onShowClients }) => {
//   const [formData, setFormData] = useState({
//     codeClient: "",
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//     ...initialData,
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedData = {
//       ...formData,
//       email: formData.email || null,
//       adress: formData.adress || null,
//       tel: formData.tel || null,
//     };

//     console.log("📦 Données envoyées (Clients) :", updatedData);
//     onSubmit(updatedData);
//     setMessage("Client mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le client</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="codeClient" placeholder="Code du client" value={formData.codeClient} onChange={handleChange} required />
//           <Input name="nomClient" placeholder="Nom du client" value={formData.nomClient} onChange={handleChange} required />
//           <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <Input name="adress" placeholder="Adresse" value={formData.adress} onChange={handleChange} />
//           <Input name="tel" placeholder="Téléphone" value={formData.tel} onChange={handleChange} />

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowClients}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>

//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierClientForm;















// import React, { useState } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const ModifierClientForm = ({ onSubmit, initialData = {}, onShowClients }) => {
//   const [formData, setFormData] = useState({
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//     ...initialData, // On garde les données initiales pour pré-remplir le formulaire
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedData = {
//       ...formData,
//       email: formData.email || null,
//       adress: formData.adress || null,
//       tel: formData.tel || null,
//     };

//     console.log("📦 Données envoyées (Clients) :", updatedData);
//     onSubmit(updatedData);
//     setMessage("Client mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le client</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           {/* Pas besoin de champ codeClient ici, car il sera généré par le backend */}
//           <Input name="nomClient" placeholder="Nom du client" value={formData.nomClient} onChange={handleChange} required />
//           <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <Input name="adress" placeholder="Adresse" value={formData.adress} onChange={handleChange} />
//           <Input name="tel" placeholder="Téléphone" value={formData.tel} onChange={handleChange} />

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowClients}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>

//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierClientForm;







import React, { useEffect, useState } from "react"; 
import AdminLayout from "../pages/AdminLayout"; 
import { Button } from "../components/ui/Button"; 
import Input from "../components/ui/Input";

const ModifierClientForm = ({ onSubmit, initialData = {}, onShowClients }) => { 
  const [formData, setFormData] = useState({
    nomClient: "", 
    email: "", 
    adress: "", 
    tel: "", 
    telType: "cellulaire", 
    codeDepot: "", 
    ...initialData,
  });

  const [message, setMessage] = useState(""); 
  const [errors, setErrors] = useState({}); 
  const [depots, setDepots] = useState([]);

  useEffect(() => {
    fetch("/depot")
      .then((res) => res.json())
      .then((data) => setDepots(data))
      .catch((err) => console.error("Erreur lors du chargement des dépôts :", err));
  }, []);

  useEffect(() => {
    if (formData.adress && depots.length > 0) {
      const wilaya = extractWilayaFromAddress(formData.adress);
      const depotParWilaya = getDepotByWilaya(wilaya);
      if (depotParWilaya) {
        setFormData((prev) => ({
          ...prev,
          codeDepot: depotParWilaya.codeDepot,  // Mise à jour du dépôt basé sur l'adresse
        }));
      }
    }
  }, [formData.adress, depots]);

  const extractWilayaFromAddress = (address) => {
    const wilayas = depots.map((depot) => depot.wilaya);
    for (let wilaya of wilayas) {
      if (address.toLowerCase().includes(wilaya.toLowerCase())) {
        return wilaya;
      }
    }
    return "";
  };

  const getDepotByWilaya = (wilaya) => {
    return depots.find((depot) => depot.wilaya.toLowerCase() === wilaya.toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomClient.trim()) {
      newErrors.nomClient = "Le nom est requis.";
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.nomClient)) {
      newErrors.nomClient = "Le nom doit contenir uniquement des lettres.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide.";
    }

    if (!formData.adress.trim()) {
      newErrors.adress = "L'adresse est requise.";
    }

    if (!formData.tel.trim()) {
      newErrors.tel = "Le numéro de téléphone est requis.";
    } else if (formData.telType === "cellulaire") {
      if (!/^0[567]\d{8}$/.test(formData.tel)) {
        newErrors.tel = "Numéro cellulaire invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres.";
      }
    } else {
      if (!/^\d{9}$/.test(formData.tel)) {
        newErrors.tel = "Numéro fixe invalide. Doit contenir exactement 9 chiffres.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedData = {
      ...formData,
      email: formData.email || null,
      adress: formData.adress || null,
      tel: formData.tel || null,
    };

    onSubmit(updatedData);
    setMessage("✅ Client mis à jour avec succès !");
    setErrors({});
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Modifier un client</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom du client</label>
            <Input name="nomClient" value={formData.nomClient} onChange={handleChange} />
            {errors.nomClient && <p className="text-red-500 text-sm">{errors.nomClient}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse</label>
            <Input name="adress" value={formData.adress} onChange={handleChange} />
            {errors.adress && <p className="text-red-500 text-sm">{errors.adress}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type de téléphone</label>
            <select
              name="telType"
              value={formData.telType}
              onChange={handleChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
            >
              <option value="cellulaire">Cellulaire</option>
              <option value="fixe">Fixe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <Input name="tel" value={formData.tel} onChange={handleChange} />
            {errors.tel && <p className="text-red-500 text-sm">{errors.tel}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Sélectionner le dépôt</label>
            <select
              name="codeDepot"
              value={formData.codeDepot}
              onChange={handleChange}
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Sélectionnez un dépôt</option>
              {depots.map((depot) => (
                <option key={depot.codeDepot} value={depot.codeDepot}>
                  {depot.nomDepot} - {depot.wilaya}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <Button type="submit">Enregistrer les modifications</Button>
            <Button variant="outline" className="ml-4" onClick={onShowClients}>
              Afficher les clients
            </Button>
          </div>
        </form>

        {message && <p className="text-green-600 mt-4">{message}</p>}
      </div>
    </AdminLayout>
  );
};

export default ModifierClientForm;
