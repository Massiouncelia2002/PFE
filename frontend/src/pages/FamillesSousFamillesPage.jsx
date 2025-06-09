// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import Table from "../components/ui/Table";
// import AdminLayout from "./AdminLayout";

// const FamillesSousFamillesPage = () => {
//   const [familles, setFamilles] = useState([]);
//   const [sousFamilles, setSousFamilles] = useState([]);
//   const [allSousFamilles, setAllSousFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [familleForm, setFamilleForm] = useState({ nomFamille: "" });
//   const [sousFamilleForm, setSousFamilleForm] = useState({ nomSousFamille: "" });
//   const [editingFamille, setEditingFamille] = useState(null);
//   const [editingSousFamille, setEditingSousFamille] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [famillesRes, sousFamillesRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/familles"),
//           axios.get("http://localhost:5000/api/sous-familles")
//         ]);
//         setFamilles(famillesRes.data);
//         setAllSousFamilles(sousFamillesRes.data);
//       } catch (error) {
//         console.error("Erreur :", error.response?.data || error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedFamille) {
//       const filtered = allSousFamilles.filter(
//         sf => sf.idFamille === selectedFamille.idFamille
//       );
//       setSousFamilles(filtered);
//     } else {
//       setSousFamilles([]);
//     }
//   }, [selectedFamille, allSousFamilles]);

//   const handleFamilleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingFamille) {
//         const hasSousFamilles = allSousFamilles.some(sf => sf.idFamille === editingFamille.idFamille);
//         if (hasSousFamilles) {
//           alert("Impossible de modifier une famille avec des sous-familles");
//           return;
//         }

//         const res = await axios.put(
//           `http://localhost:5000/api/familles/${editingFamille.idFamille}`,
//           { nomFamille: familleForm.nomFamille }
//         );
//         setFamilles(prev => 
//           prev.map(f => f.idFamille === res.data.idFamille ? res.data : f)
//         );
//         setEditingFamille(null);
//       } else {
//         const res = await axios.post(
//           "http://localhost:5000/api/familles",
//           familleForm
//         );
//         setFamilles(prev => [...prev, res.data]);
//       }
//       setFamilleForm({ nomFamille: "" });
//     } catch (error) {
//       console.error("Erreur :", error.response?.data || error.message);
//     }
//   };

//   const handleSousFamilleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedFamille) return;

//     try {
//       const payload = {
//         nomSousFamille: sousFamilleForm.nomSousFamille,
//         idFamille: selectedFamille.idFamille
//       };

//       if (editingSousFamille) {
//         const res = await axios.put(
//           `http://localhost:5000/api/sous-familles/${editingSousFamille.idSousFamille}`,
//           payload
//         );
//         setAllSousFamilles(prev => 
//           prev.map(sf => sf.idSousFamille === res.data.idSousFamille ? res.data : sf)
//         );
//         setEditingSousFamille(null);
//       } else {
//         const res = await axios.post(
//           "http://localhost:5000/api/sous-familles",
//           payload
//         );
//         setAllSousFamilles(prev => [...prev, res.data]);
//       }
//       setSousFamilleForm({ nomSousFamille: "" });
//     } catch (error) {
//       console.error("Erreur :", error.response?.data || error.message);
//     }
//   };

//   const handleDeleteFamille = async (famille) => {
//     if (!window.confirm(`Supprimer la famille ${famille.nomFamille} ?`)) return;
  
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/familles/${famille.idFamille}`
//       );
  
//       if (response.data.success) {
//         setFamilles(prev => prev.filter(f => f.idFamille !== famille.idFamille));
//         setSelectedFamille(prev => 
//           prev?.idFamille === famille.idFamille ? null : prev
//         );
//         alert(response.data.message);
//       }
  
//     } catch (error) {
//       let errorMessage = "Erreur lors de la suppression";
      
//       if (error.response) {
//         errorMessage = `
//           Code: ${error.response.status}
//           Message: ${error.response.data.message || 'Erreur inconnue'}
//           ${error.response.data.details ? `Détails: ${error.response.data.details}` : ''}
//         `;
//       }
  
//       alert(errorMessage);
//       console.error("Erreur détaillée:", error);
//     }
//   };

//   const handleDeleteSousFamille = async (sousFamille) => {
//     if (!window.confirm("Supprimer cette sous-famille ?")) return;
    
//     try {
//       await axios.delete(`http://localhost:5000/api/sous-familles/${sousFamille.idSousFamille}`);
//       setSousFamilles(prev => prev.filter(sf => sf.idSousFamille !== sousFamille.idSousFamille));
//       setAllSousFamilles(prev => prev.filter(sf => sf.idSousFamille !== sousFamille.idSousFamille));
//     } catch (error) {
//       console.error("Erreur suppression sous-famille :", error.response?.data || error.message);
//     }
//   };

//   const familleColumns = [
//     { 
//       Header: "Nom Famille", 
//       accessor: "nomFamille",
//       Cell: ({ row, value }) => (
//         <div className="flex items-center gap-2">
//           <span>{value}</span>
//           {allSousFamilles.filter(sf => sf.idFamille === row.original.idFamille).length > 0 && (
//             <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//               {allSousFamilles.filter(sf => sf.idFamille === row.original.idFamille).length}
//             </span>
//           )}
//         </div>
//       )
//     },
//     { Header: "Code Famille", accessor: "codeFamille" },
//     {
//       Header: "Actions",
//       Cell: ({ row }) => {
//         const hasSousFamilles = allSousFamilles.some(sf => sf.idFamille === row.original.idFamille);
        
//         return (
//           <div className="flex gap-2">
//             <button 
//               onClick={() => {
//                 if (!hasSousFamilles) {
//                   setEditingFamille(row.original);
//                   setFamilleForm({ nomFamille: row.original.nomFamille });
//                 }
//               }}
//               aria-label="Modifier"
//               className={hasSousFamilles ? "opacity-50 cursor-not-allowed" : ""}
//               title={hasSousFamilles ? "Impossible de modifier une famille avec des sous-familles" : ""}
//             >
//               <FaEdit className="text-blue-600 hover:text-blue-800" />
//             </button>
//             <button 
//               onClick={() => handleDeleteFamille(row.original)}
//               aria-label="Supprimer"
//             >
//               <FaTrash className="text-red-600 hover:text-red-800" />
//             </button>
//           </div>
//         );
//       }
//     }
//   ];

//   const sousFamilleColumns = [
//     { Header: "Nom Sous-Famille", accessor: "nomSousFamille" },
//     { Header: "Code Sous-Famille", accessor: "codeSousFamille" },
//     {
//       Header: "Actions",
//       Cell: ({ row }) => (
//         <div className="flex gap-2">
//           <button 
//             onClick={() => {
//               setEditingSousFamille(row.original);
//               setSousFamilleForm({ 
//                 nomSousFamille: row.original.nomSousFamille
//               });
//             }}
//             aria-label="Modifier"
//           >
//             <FaEdit className="text-blue-600 hover:text-blue-800" />
//           </button>
//           <button 
//             onClick={() => handleDeleteSousFamille(row.original)}
//             aria-label="Supprimer"
//           >
//             <FaTrash className="text-red-600 hover:text-red-800" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h1 className="text-3xl font-bold">Gestion des Familles et Sous-Familles</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Section Familles */}
//           <div className="bg-white p-6 rounded-2xl shadow space-y-6">
//             <h2 className="text-xl font-semibold">Familles</h2>
//             <form onSubmit={handleFamilleSubmit} className="space-y-4">
//               <div className="flex gap-2 items-center">
//                 <Input
//                   name="nomFamille"
//                   placeholder="Nom de la famille"
//                   value={familleForm.nomFamille}
//                   onChange={(e) => setFamilleForm({ ...familleForm, nomFamille: e.target.value })}
//                   required
//                   className="flex-1"
//                 />
//                 <div className="flex gap-2">
//                   <Button type="submit" variant="primary">
//                     {editingFamille ? "Modifier" : "Ajouter"}
//                   </Button>
//                   {editingFamille && (
//                     <Button 
//                       variant="secondary"
//                       onClick={() => {
//                         setEditingFamille(null);
//                         setFamilleForm({ nomFamille: "" });
//                       }}
//                     >
//                       <FaTimes />
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </form>

//             <Table
//               data={familles}
//               columns={familleColumns}
//               onRowClick={(row) => setSelectedFamille(row.original)}
//               className="border rounded-lg overflow-hidden"
//             />
//           </div>

//           {/* Section Sous-Familles */}
//           <div className="bg-white p-6 rounded-2xl shadow space-y-6">
//             <h2 className="text-xl font-semibold">Sous-Familles</h2>
//             {selectedFamille ? (
//               <>
//                 <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                   <h3 className="font-medium">
//                     Famille sélectionnée : {selectedFamille.nomFamille}
//                   </h3>
//                   <button 
//                     onClick={() => setSelectedFamille(null)}
//                     className="hover:text-red-600"
//                   >
//                     <FaTimes className="text-lg" />
//                   </button>
//                 </div>

//                 <form onSubmit={handleSousFamilleSubmit} className="space-y-4">
//                   <div className="flex gap-2 items-center">
//                     <Input
//                       name="nomSousFamille"
//                       placeholder="Nom de la sous-famille"
//                       value={sousFamilleForm.nomSousFamille}
//                       onChange={(e) => setSousFamilleForm({ 
//                         ...sousFamilleForm, 
//                         nomSousFamille: e.target.value 
//                       })}
//                       required
//                       className="flex-1"
//                     />
//                     <div className="flex gap-2">
//                       <Button type="submit" variant="primary">
//                         {editingSousFamille ? "Modifier" : "Ajouter"}
//                       </Button>
//                       {editingSousFamille && (
//                         <Button 
//                           variant="secondary"
//                           onClick={() => {
//                             setEditingSousFamille(null);
//                             setSousFamilleForm({ nomSousFamille: "" });
//                           }}
//                         >
//                           <FaTimes />
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </form>

//                 <Table
//                   data={sousFamilles}
//                   columns={sousFamilleColumns}
//                   onRowClick={() => {}} // Fonction vide
//                   className="border rounded-lg overflow-hidden"
//                 />
//               </>
//             ) : (
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <p className="text-gray-500">
//                   Sélectionnez une famille pour gérer ses sous-familles
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tableau récapitulatif */}
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Tableau Récapitulatif</h2>
//           <div className="space-y-4">
//             {familles.map(famille => (
//               <div key={famille.codeFamille} className="border rounded-lg p-4 bg-gray-50">
//                 <div className="font-semibold text-lg text-blue-600">
//                   {famille.nomFamille} (Code: {famille.codeFamille})
//                 </div>
//                 <div className="pl-4 mt-2 space-y-2">
//                   {allSousFamilles
//                     .filter(sf => sf.idFamille === famille.idFamille)
//                     .map(sf => (
//                       <div 
//                         key={sf.codeSousFamille} 
//                         className="flex justify-between items-center p-2 bg-white rounded border"
//                       >
//                         <span>
//                           {sf.nomSousFamille} (Code: {sf.codeSousFamille})
//                         </span>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default FamillesSousFamillesPage;













import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import AdminLayout from "./AdminLayout";

const FamillesSousFamillesPage = () => {
  const [familles, setFamilles] = useState([]);
  const [sousFamilles, setSousFamilles] = useState([]);
  const [allSousFamilles, setAllSousFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [familleForm, setFamilleForm] = useState({ nomFamille: "" });
  const [sousFamilleForm, setSousFamilleForm] = useState({ nomSousFamille: "" });
  const [editingFamille, setEditingFamille] = useState(null);
  const [editingSousFamille, setEditingSousFamille] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [famillesRes, sousFamillesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/familles"),
          axios.get("http://localhost:5000/api/sous-familles")
        ]);
        setFamilles(famillesRes.data);
        setAllSousFamilles(sousFamillesRes.data);
      } catch (error) {
        console.error("Erreur :", error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFamille) {
      const filtered = allSousFamilles.filter(
        sf => sf.codeFamille === selectedFamille.codeFamille
      );
      setSousFamilles(filtered);
    } else {
      setSousFamilles([]);
    }
  }, [selectedFamille, allSousFamilles]);

  const handleFamilleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFamille) {
        const hasSousFamilles = allSousFamilles.some(sf => sf.codeFamille === editingFamille.codeFamille);
        if (hasSousFamilles) {
          alert("Impossible de modifier une famille avec des sous-familles");
          return;
        }

        const res = await axios.put(
          `http://localhost:5000/api/familles/${editingFamille.codeFamille}`,
          { nomFamille: familleForm.nomFamille }
        );
        setFamilles(prev => 
          prev.map(f => f.codeFamille === res.data.codeFamille ? res.data : f)
        );
        setEditingFamille(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/familles",
          familleForm
        );
        setFamilles(prev => [...prev, res.data]);
      }
      setFamilleForm({ nomFamille: "" });
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
    }
  };

  const handleSousFamilleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFamille) return;

    try {
      const payload = {
        nomSousFamille: sousFamilleForm.nomSousFamille,
        codeFamille: selectedFamille.codeFamille
      };

      if (editingSousFamille) {
        const res = await axios.put(
          `http://localhost:5000/api/sous-familles/${editingSousFamille.codeSousFamille}`,
          payload
        );
        setAllSousFamilles(prev => 
          prev.map(sf => sf.codeSousFamille === res.data.codeSousFamille ? res.data : sf)
        );
        setEditingSousFamille(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/sous-familles",
          payload
        );
        setAllSousFamilles(prev => [...prev, res.data]);
      }
      setSousFamilleForm({ nomSousFamille: "" });
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
    }
  };

  const handleDeleteFamille = async (famille) => {
    if (!window.confirm(`Supprimer la famille ${famille.nomFamille} ?`)) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/familles/${famille.codeFamille}`
      );
  
      if (response.data.success) {
        setFamilles(prev => prev.filter(f => f.codeFamille !== famille.codeFamille));
        setSelectedFamille(prev => 
          prev?.codeFamille === famille.codeFamille ? null : prev
        );
        alert(response.data.message);
      }
  
    } catch (error) {
      let errorMessage = "Erreur lors de la suppression";
      
      if (error.response) {
        errorMessage = `
          Code: ${error.response.status}
          Message: ${error.response.data.message || 'Erreur inconnue'}
          ${error.response.data.details ? `Détails: ${error.response.data.details}` : ''}
        `;
      }
  
      alert(errorMessage);
      console.error("Erreur détaillée:", error);
    }
  };

  const handleDeleteSousFamille = async (sousFamille) => {
    if (!window.confirm("Supprimer cette sous-famille ?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/sous-familles/${sousFamille.codeSousFamille}`);
      setSousFamilles(prev => prev.filter(sf => sf.codeSousFamille !== sousFamille.codeSousFamille));
      setAllSousFamilles(prev => prev.filter(sf => sf.codeSousFamille !== sousFamille.codeSousFamille));
    } catch (error) {
      console.error("Erreur suppression sous-famille :", error.response?.data || error.message);
    }
  };

  const familleColumns = [
    { 
      Header: "Nom Famille", 
      accessor: "nomFamille",
      Cell: ({ row, value }) => (
        <div className="flex items-center gap-2">
          <span>{value}</span>
          {allSousFamilles.filter(sf => sf.codeFamille === row.original.codeFamille).length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {allSousFamilles.filter(sf => sf.codeFamille === row.original.codeFamille).length}
            </span>
          )}
        </div>
      )
    },
    { Header: "Code Famille", accessor: "codeFamille" },
    {
      Header: "Actions",
      Cell: ({ row }) => {
        const hasSousFamilles = allSousFamilles.some(sf => sf.codeFamille === row.original.codeFamille);
        
        return (
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (!hasSousFamilles) {
                  setEditingFamille(row.original);
                  setFamilleForm({ nomFamille: row.original.nomFamille });
                }
              }}
              aria-label="Modifier"
              className={hasSousFamilles ? "opacity-50 cursor-not-allowed" : ""}
              title={hasSousFamilles ? "Impossible de modifier une famille avec des sous-familles" : ""}
            >
              <FaEdit className="text-blue-600 hover:text-blue-800" />
            </button>
            <button 
              onClick={() => handleDeleteFamille(row.original)}
              aria-label="Supprimer"
            >
              <FaTrash className="text-red-600 hover:text-red-800" />
            </button>
          </div>
        );
      }
    }
  ];

  const sousFamilleColumns = [
    { Header: "Nom Sous-Famille", accessor: "nomSousFamille" },
    { Header: "Code Sous-Famille", accessor: "codeSousFamille" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setEditingSousFamille(row.original);
              setSousFamilleForm({ 
                nomSousFamille: row.original.nomSousFamille
              });
            }}
            aria-label="Modifier"
          >
            <FaEdit className="text-blue-600 hover:text-blue-800" />
          </button>
          <button 
            onClick={() => handleDeleteSousFamille(row.original)}
            aria-label="Supprimer"
          >
            <FaTrash className="text-red-600 hover:text-red-800" />
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Gestion des Familles et Sous-Familles</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section Familles */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-6">
            <h2 className="text-xl font-semibold">Familles</h2>
            <form onSubmit={handleFamilleSubmit} className="space-y-4">
              <div className="flex gap-2 items-center">
                <Input
                  name="nomFamille"
                  placeholder="Nom de la famille"
                  value={familleForm.nomFamille}
                  onChange={(e) => setFamilleForm({ ...familleForm, nomFamille: e.target.value })}
                  required
                  className="flex-1"
                />
                <div className="flex gap-2">
                  <Button type="submit" variant="primary">
                    {editingFamille ? "Modifier" : "Ajouter"}
                  </Button>
                  {editingFamille && (
                    <Button 
                      variant="secondary"
                      onClick={() => {
                        setEditingFamille(null);
                        setFamilleForm({ nomFamille: "" });
                      }}
                    >
                      <FaTimes />
                    </Button>
                  )}
                </div>
              </div>
            </form>

            <Table
              data={familles}
              columns={familleColumns}
              onRowClick={(row) => setSelectedFamille(row.original)}
              className="border rounded-lg overflow-hidden"
            />
          </div>

          {/* Section Sous-Familles */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-6">
            <h2 className="text-xl font-semibold">Sous-Familles</h2>
            {selectedFamille ? (
              <>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium">
                    Famille sélectionnée : {selectedFamille.nomFamille}
                  </h3>
                  <button 
                    onClick={() => setSelectedFamille(null)}
                    className="hover:text-red-600"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <form onSubmit={handleSousFamilleSubmit} className="space-y-4">
                  <div className="flex gap-2 items-center">
                    <Input
                      name="nomSousFamille"
                      placeholder="Nom de la sous-famille"
                      value={sousFamilleForm.nomSousFamille}
                      onChange={(e) => setSousFamilleForm({ 
                        ...sousFamilleForm, 
                        nomSousFamille: e.target.value 
                      })}
                      required
                      className="flex-1"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" variant="primary">
                        {editingSousFamille ? "Modifier" : "Ajouter"}
                      </Button>
                      {editingSousFamille && (
                        <Button 
                          variant="secondary"
                          onClick={() => {
                            setEditingSousFamille(null);
                            setSousFamilleForm({ nomSousFamille: "" });
                          }}
                        >
                          <FaTimes />
                        </Button>
                      )}
                    </div>
                  </div>
                </form>

                <Table
                  data={sousFamilles}
                  columns={sousFamilleColumns}
                  onRowClick={() => {}} // Fonction vide
                  className="border rounded-lg overflow-hidden"
                />
              </>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Sélectionnez une famille pour gérer ses sous-familles
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tableau récapitulatif */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Tableau Récapitulatif</h2>
          <div className="space-y-4">
            {familles.map(famille => (
              <div key={famille.codeFamille} className="border rounded-lg p-4 bg-gray-50">
                <div className="font-semibold text-lg text-blue-600">
                  {famille.nomFamille} (Code: {famille.codeFamille})
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  {allSousFamilles
                    .filter(sf => sf.codeFamille === famille.codeFamille)
                    .map(sf => (
                      <div 
                        key={sf.codeSousFamille} 
                        className="flex justify-between items-center p-2 bg-white rounded border"
                      >
                        <span>
                          {sf.nomSousFamille} (Code: {sf.codeSousFamille})
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FamillesSousFamillesPage;



















