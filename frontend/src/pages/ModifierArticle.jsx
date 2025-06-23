// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminLayout from "./AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import Select from "react-select";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ModifierArticle = () => {
//   const { id } = useParams(); // Changé de codeArticle à id
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     codeArticle: "",
//     designation: "",
//     statut: true,
//     um: "",
//   });
//   const [familles, setFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
//   const [selectedSousFamille, setSelectedSousFamille] = useState(null);

//   const fetchFamilles = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/familles/with-sous-familles");
//       const famillesFormatted = res.data.map((f) => ({
//         value: f.codeFamille,
//         label: f.nomFamille,
//         sousFamilles: f.SousFamilles.map((sf) => ({
//           value: sf.codSousFamille,
//           label: sf.nomSousFamille,
//         })),
//       }));
//       setFamilles(famillesFormatted);
//     } catch (error) {
//       toast.error("Erreur lors du chargement des familles");
//     }
//   };

//   const fetchArticle = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/articles/${id}`); 
//       const article = res.data;

//       setFormData({
//         codeArticle: article.codeArticle,
//         designation: article.designation,
//         statut: article.statut,
//         um: article.um,
//       });

//       const familleMatch = familles.find((f) => f.value === article.codeFamille);
//       setSelectedFamille(familleMatch);
//       setFilteredSousFamilles(familleMatch?.sousFamilles || []);

//       const sousFamilleMatch = familleMatch?.sousFamilles.find(
//         (sf) => sf.value === article.codeSousFamille
//       );
//       setSelectedSousFamille(sousFamilleMatch || null);
//     } catch (error) {
//       toast.error("Article non trouvé");
//       navigate("/articles");
//     }
//   };

//   useEffect(() => {
//     fetchFamilles();
//   }, []);

//   useEffect(() => {
//     if (familles.length > 0 && id) {
//       fetchArticle();
//     }
//   }, [familles, id]);

//   const handleChange = (e) => {
//     const value = e.target.name === "statut" ? e.target.value === "true" : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const handleFamilleChange = (option) => {
//     setSelectedFamille(option);
//     setFilteredSousFamilles(option?.sousFamilles || []);
//     setSelectedSousFamille(null);
//   };

//   const handleSousFamilleChange = (option) => {
//     setSelectedSousFamille(option);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       ...formData,
//       codeFamille: selectedFamille?.value,
//       codeSousFamille: selectedSousFamille?.value,
//     };

//     try {
//       await axios.put(`http://localhost:5000/api/articles/${id}`, data); // Utilisation de l'ID
//       toast.success("Article modifié avec succès");
//       navigate("/articles");
//     } catch (error) {
//       toast.error("Erreur lors de la modification");
//       console.error(error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier l'article</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
//           {/* <Input
//             name="codeArticle"
//             value={formData.codeArticle}
//             onChange={handleChange}
//             placeholder="Code"
//             disabled
//           /> */}
//           <Input
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             placeholder="Désignation"
//           />

//           <div>
//             <select
//               name="statut"
//               value={formData.statut}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value={true}>Actif</option>
//               <option value={false}>Inactif</option>
//             </select>
//           </div>

//           <Input
//             name="um"
//             value={formData.um}
//             onChange={handleChange}
//             placeholder="Unité"
//           />

//           <div>
//             <Select
//               options={familles}
//               value={selectedFamille}
//               onChange={handleFamilleChange}
//               placeholder="🔍 Rechercher une famille..."
//               className="react-select-container"
//               classNamePrefix="react-select"
//               isClearable
//             />
//           </div>

//           <div>
//             <Select
//               options={filteredSousFamilles}
//               value={selectedSousFamille}
//               onChange={handleSousFamilleChange}
//               placeholder="🔍 Rechercher une sous-famille..."
//               className="react-select-container"
//               classNamePrefix="react-select"
//               isClearable
//               isDisabled={!selectedFamille}
//             />
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer les modifications</Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierArticle;










import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ModifierArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    codeArticle: "",
    designation: "",
    statut: true,
    um: "",
  });

  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
  const [selectedSousFamille, setSelectedSousFamille] = useState(null);

  const fetchFamilles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/familles/with-sous-familles");
      const formatted = res.data.map((f) => ({
        value: f.codeFamille,
        label: f.nomFamille,
        sousFamilles: f.SousFamilles.map((sf) => ({
          value: sf.codSousFamille,
          label: sf.nomSousFamille,
        })),
      }));
      setFamilles(formatted);
    } catch (error) {
      toast.error("❌ Erreur lors du chargement des familles.");
    }
  };

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/articles/${id}`);
      const article = res.data;

      setFormData({
        codeArticle: article.codeArticle,
        designation: article.designation,
        
        
      });

      const familleMatch = familles.find((f) => f.value === article.codeFamille);
      setSelectedFamille(familleMatch || null);
      setFilteredSousFamilles(familleMatch?.sousFamilles || []);

      const sousFamilleMatch = familleMatch?.sousFamilles.find(
        (sf) => sf.value === article.codeSousFamille
      );
      setSelectedSousFamille(sousFamilleMatch || null);
    } catch (error) {
      toast.error("❌ Article introuvable.");
      navigate("/articles");
    }
  };

  useEffect(() => {
    fetchFamilles();
  }, []);

  useEffect(() => {
    if (familles.length > 0 && id) {
      fetchArticle();
    }
  }, [familles, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: name === "statut" ? value === "true" : value,
    // });
  };

  const handleFamilleChange = (option) => {
    setSelectedFamille(option);
    setFilteredSousFamilles(option?.sousFamilles || []);
    setSelectedSousFamille(null);
  };

  const handleSousFamilleChange = (option) => {
    setSelectedSousFamille(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      codeFamille: selectedFamille?.value || null,
      codeSousFamille: selectedSousFamille?.value || null,
    };

    try {
      await axios.put(`http://localhost:5000/api/articles/${id}`, dataToSend);
      toast.success("✅ Article modifié avec succès !");
      navigate("/articles");
    } catch (error) {
      toast.error("❌ Erreur lors de la modification.");
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Modifier l'article</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
          {/* Désignation */}
          <Input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Désignation"
          />

          {/* Statut */}
          {/* <div>
            <select
              name="statut"
              value={formData.statut ? "true" : "false"}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="true">Actif</option>
              <option value="false">Inactif</option>
            </select>
          </div> */}

          {/* Unité de mesure */}
          {/* <Input
            name="um"
            value={formData.um}
            onChange={handleChange}
            placeholder="Unité"
          /> */}

          {/* Famille */}
          <div>
            <Select
              options={familles}
              value={selectedFamille}
              onChange={handleFamilleChange}
              placeholder="🔍 Rechercher une famille..."
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
            />
          </div>

          {/* Sous-Famille */}
          <div>
            <Select
              options={filteredSousFamilles}
              value={selectedSousFamille}
              onChange={handleSousFamilleChange}
              placeholder="🔍 Rechercher une sous-famille..."
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
              isDisabled={!selectedFamille}
            />
          </div>

          {/* Submit */}
          <div className="col-span-2">
            <Button type="submit">💾 Enregistrer les modifications</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ModifierArticle;
