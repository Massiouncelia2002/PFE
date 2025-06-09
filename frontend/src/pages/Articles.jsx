// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminLayout from "./AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom"; 

// const Articles = () => {
//   const navigate = useNavigate(); 
//   const [articles, setArticles] = useState([]);
//   const [formData, setFormData] = useState({
//     codeArticle: "",
//     designation: "",
//     statut: true, 
//     um: "",
//     codeFamille: "",
//     codeSousFamille: "",
//   });
//   const [familles, setFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
//   const [selectedSousFamille, setSelectedSousFamille] = useState(null);


//   const fetchArticles = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/articles");
//       setArticles(res.data);
//     } catch (error) {
//       console.error("Erreur fetch articles", error);
//     }
//   };


//   const fetchFamilles = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/familles/with-sous-familles");
//       const famillesFormatted = res.data.map((f) => ({
//         value: f.codeFamille,
//         label: f.nomFamille,
//         sousFamilles: f.SousFamilles.map((sf) => ({
//           value: sf.codeSousFamille,
//           label: sf.nomSousFamille,
//         })),
//       }));
//       setFamilles(famillesFormatted);
//     } catch (error) {
//       console.error("Erreur récupération familles :", error);
//     }
//   };

//   useEffect(() => {
//     fetchFamilles();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       ...formData,
//       codeFamille: selectedFamille?.value,
//       codeSousFamille: selectedSousFamille?.value,
//     };
//     try {
//       await axios.post("http://localhost:5000/api/articles", data);
//       setFormData({
//         codeArticle: "",
//         designation: "",
//         statut: true, 
//         um: "",
//         codeFamille: "",
//         codeSousFamille: "",
//       });
//       setSelectedFamille(null);
//       setSelectedSousFamille(null);
//       navigate("/liste-articles"); 
//     } catch (error) {
//       console.error("Erreur ajout article", error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un article</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
//           <Input name="codeArticle" placeholder="Code" value={formData.codeArticle} onChange={handleChange} />
//           <Input name="designation" placeholder="Désignation" value={formData.designation} onChange={handleChange} />
          
//           {/* Sélectionner le statut */}
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

//           <Input name="um" placeholder="Unité" value={formData.um} onChange={handleChange} />

//           {/* Sélectionner la famille */}
//           <div>
//             <Select
//               options={familles}
//               value={selectedFamille}
//               onChange={(option) => {
//                 setSelectedFamille(option);
//                 setFilteredSousFamilles(option?.sousFamilles || []);
//               }}
//               placeholder="🔍 Rechercher une famille..."
//               isClearable
//             />
//           </div>

         
//           <div>
//             <Select
//               options={filteredSousFamilles}
//               value={selectedSousFamille}
//               onChange={(option) => setSelectedSousFamille(option)}
//               placeholder="🔍 Rechercher une sous-famille..."
//               isDisabled={!selectedFamille}
//               isClearable
//             />
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Ajouter</Button>
            
//           </div>
//           <div>
//           <Button onClick={() => navigate("/liste-articles")} className="bg-blue-500 text-white">
//             Liste d'articles
//           </Button>
//           </div>
           
           
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default Articles;













// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminLayout from "./AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";

// const Articles = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     designation: "",
//     statut: true,
//     um: "",
//     codeFamille: "",
//     codeSousFamille: "",
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
//           value: sf.codeSousFamille,
//           label: sf.nomSousFamille,
//         })),
//       }));
//       setFamilles(famillesFormatted);
//     } catch (error) {
//       console.error("Erreur récupération familles :", error);
//     }
//   };

//   useEffect(() => {
//     fetchFamilles();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       ...formData,
//       codeFamille: selectedFamille?.value,
//       codeSousFamille: selectedSousFamille?.value,
//     };
//     try {
//       await axios.post("http://localhost:5000/api/articles", data);
//       setFormData({
//         designation: "",
//         statut: true,
//         um: "",
//         codeFamille: "",
//         codeSousFamille: "",
//       });
//       setSelectedFamille(null);
//       setSelectedSousFamille(null);
//       navigate("/liste-articles");
//     } catch (error) {
//       console.error("Erreur ajout article", error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un article</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
//           <Input name="designation" placeholder="Désignation" value={formData.designation} onChange={handleChange} />
          
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

//           <Input name="um" placeholder="Unité" value={formData.um} onChange={handleChange} />

//           <div>
//             <Select
//               options={familles}
//               value={selectedFamille}
//               onChange={(option) => {
//                 setSelectedFamille(option);
//                 setFilteredSousFamilles(option?.sousFamilles || []);
//               }}
//               placeholder="🔍 Rechercher une famille..."
//               isClearable
//             />
//           </div>

//           <div>
//             <Select
//               options={filteredSousFamilles}
//               value={selectedSousFamille}
//               onChange={(option) => setSelectedSousFamille(option)}
//               placeholder="🔍 Rechercher une sous-famille..."
//               isDisabled={!selectedFamille}
//               isClearable
//             />
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Ajouter</Button>
//           </div>

//           <div>
//             <Button onClick={() => navigate("/liste-articles")} className="bg-blue-500 text-white">
//               Liste d'articles
//             </Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default Articles;











import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    designation: "",
    statut: true,
    codeFamille: "",
    codeSousFamille: "",
  });

  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
  const [selectedSousFamille, setSelectedSousFamille] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchFamilles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/familles/with-sous-familles");
      const famillesFormatted = res.data.map((f) => ({
        value: f.codeFamille,
        label: f.nomFamille,
        sousFamilles: f.SousFamilles.map((sf) => ({
          value: sf.codeSousFamille,
          label: sf.nomSousFamille,
        })),
      }));
      setFamilles(famillesFormatted);
    } catch (error) {
      console.error("Erreur récupération familles :", error);
    }
  };

  useEffect(() => {
    fetchFamilles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation des données du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    // Vérification de la désignation
    if (!formData.designation) {
      newErrors.designation = "La désignation est requise.";
    } else if (!isNaN(formData.designation)) {
      newErrors.designation = "La désignation ne peut pas être uniquement des chiffres.";
    }

    // Vérification du statut
    if (!formData.statut) {
      newErrors.statut = "Le statut est requis.";
    }

    

    // Vérification de la famille
    if (!selectedFamille) {
      newErrors.codeFamille = "La famille est requise.";
    }

    // Vérification de la sous-famille
    if (!selectedSousFamille) {
      newErrors.codeSousFamille = "La sous-famille est requise.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du formulaire
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Si des erreurs sont présentes, on arrête la soumission
    }

    const data = {
      ...formData,
      codeFamille: selectedFamille?.value,
      codeSousFamille: selectedSousFamille?.value,
    };

    try {
      await axios.post("http://localhost:5000/api/articles", data);
      setFormData({
        designation: "",
        statut: true,
        codeFamille: "",
        codeSousFamille: "",
      });
      setSelectedFamille(null);
      setSelectedSousFamille(null);
      setErrors({}); // Réinitialiser les erreurs
      navigate("/liste-articles");
    } catch (error) {
      console.error("Erreur ajout article", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Ajouter un article</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
          <div>
            <Input
              name="designation"
              placeholder="Désignation"
              value={formData.designation}
              onChange={handleChange}
            />
            {errors.designation && <p style={{ color: "red" }}>{errors.designation}</p>}
          </div>
          
          <div>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={true}>Actif</option>
              <option value={false}>Inactif</option>
            </select>
            {errors.statut && <p style={{ color: "red" }}>{errors.statut}</p>}
          </div>

          

          <div>
            <Select
              options={familles}
              value={selectedFamille}
              onChange={(option) => {
                setSelectedFamille(option);
                setFilteredSousFamilles(option?.sousFamilles || []);
              }}
              placeholder="🔍 Rechercher une famille..."
              isClearable
            />
            {errors.codeFamille && <p style={{ color: "red" }}>{errors.codeFamille}</p>}
          </div>

          <div>
            <Select
              options={filteredSousFamilles}
              value={selectedSousFamille}
              onChange={(option) => setSelectedSousFamille(option)}
              placeholder="🔍 Rechercher une sous-famille..."
              isDisabled={!selectedFamille}
              isClearable
            />
            {errors.codeSousFamille && <p style={{ color: "red" }}>{errors.codeSousFamille}</p>}
          </div>

          <div className="col-span-2">
            <Button type="submit">Ajouter</Button>
          </div>

          <div>
            <Button onClick={() => navigate("/liste-articles")} className="bg-blue-500 text-white">
              Liste d'articles
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Articles;
