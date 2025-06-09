// import React, { useState, useEffect } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const ModifierUtilisateurForm = ({ onSubmit, initialData }) => {
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
//     ...initialData,
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (formData.dateFin) {
//       setFormData((prev) => ({ ...prev, statut: false }));
//     } else {
//       setFormData((prev) => ({ ...prev, statut: true }));
//     }
//   }, [formData.dateFin]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : name === "dateFin" && value === ""
//           ? null
//           : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = {
//       ...formData,
//       dateFin: formData.dateFin === "" ? null : formData.dateFin,
//     };
//     onSubmit(updatedData);
//     setMessage("✅ Utilisateur mis à jour avec succès !");
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier l'utilisateur</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input
//             name="codeUtilisateur"
//             placeholder="Code"
//             value={formData.codeUtilisateur}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="nom"
//             placeholder="Nom"
//             value={formData.nom}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="prenom"
//             placeholder="Prénom"
//             value={formData.prenom}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="posteTravail"
//             placeholder="Poste de travail"
//             value={formData.posteTravail}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             name="brancheFonction"
//             placeholder="Branche fonction"
//             value={formData.brancheFonction}
//             onChange={handleChange}
//             required
//           />

// <Input
//             type="date"
//             name="dateFin"
//             value={formData.dateFin || ""}
//             onChange={handleChange}
//           />
        
          
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">-- Sélectionner un rôle --</option>
//               <option value="Admin Fonctionnel">Admin Fonctionnel</option>
//               <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
//               <option value="Admin Dépôt">Admin Dépôt</option>
//             </select>
          
          

          

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
//             <Button type="submit">Mettre à jour</Button>
//           </div>
//         </form>


//         <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
//           Retour à la liste
//         </Button>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierUtilisateurForm;















import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

const ModifierUtilisateurForm = ({ onSubmit, initialData }) => {
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
    ...initialData,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (formData.dateFin) {
      setFormData((prev) => ({ ...prev, statut: false }));
    } else {
      setFormData((prev) => ({ ...prev, statut: true }));
    }
  }, [formData.dateFin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "dateFin" && value === ""
          ? null
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      dateFin: formData.dateFin === "" ? null : formData.dateFin,
    };
    onSubmit(updatedData);
    setMessage("✅ Utilisateur mis à jour avec succès !");
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Modifier l'utilisateur</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
          <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <Input name="posteTravail" placeholder="Poste de travail" value={formData.posteTravail} onChange={handleChange} required />
          <Input name="brancheFonction" placeholder="Branche fonction" value={formData.brancheFonction} onChange={handleChange} required />
          <Input type="date" name="dateFin" value={formData.dateFin || ""} onChange={handleChange} />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Sélectionner un rôle --</option>
            <option value="Admin Fonctionnel">Admin Fonctionnel</option>
            <option value="Gestionnaire Dépôt">Gestionnaire Dépôt</option>
            <option value="Admin Dépôt">Admin Dépôt</option>
          </select>

          <div className="flex items-center space-x-2 col-span-2">
            <input type="checkbox" name="statut" checked={formData.statut} onChange={handleChange} disabled={!!formData.dateFin} />
            <label className="text-sm">Statut actif</label>
          </div>

          <div className="col-span-2">
            <Button type="submit">Mettre à jour</Button>
          </div>
        </form>

        <Button variant="outline" onClick={() => navigate("/utilisateurs")}>
          Retour à la liste
        </Button>

        {message && <p className="text-green-600 mt-2">{message}</p>}
      </div>
    </AdminLayout>
  );
};

export default ModifierUtilisateurForm;







