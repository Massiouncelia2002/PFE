// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UtilisateurTable from "../components/UtilisateurTable";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 

// const ListeUtilisateurs = () => {
//   const [utilisateurs, setUtilisateurs] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const navigate = useNavigate();

//   const fetchUtilisateurs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/utilisateur");
//       setUtilisateurs(res.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des utilisateurs", error);
//     }
//   };

//   const deleteUtilisateur = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/utilisateur/${id}`);
//       toast.success(" Utilisateur supprimé !");
//       fetchUtilisateurs();
//     } catch (error) {
//       toast.error(" Erreur lors de la suppression");
//       console.error("Erreur lors de la suppression", error);
//     }
//   };

//   const showDeleteConfirmation = (id) => {
//     toast.info(
//       ({ closeToast }) => (
//         <div>
//           <p>Confirmer la suppression de l'utilisateur ?</p>
//           <div className="mt-2 flex gap-2">
//             <button
//               onClick={() => {
//                 deleteUtilisateur(id);
//                 closeToast();
//               }}
//               className="px-2 py-1 bg-red-600 text-white rounded"
//             >
//               Oui
//             </button>
//             <button
//               onClick={closeToast}
//               className="px-2 py-1 bg-gray-300 rounded"
//             >
//               Annuler
//             </button>
//           </div>
//         </div>
//       ),
//       { autoClose: false }
//     );
//   };

//   const handleDelete = () => {
//     if (selectedId) {
//       showDeleteConfirmation(selectedId);
//     }
//   };

//   const handleEdit = () => {
//     if (selectedId) {
//       navigate(`/modifier-utilisateur/${selectedId}`);
//     }
//   };

//   useEffect(() => {
//     fetchUtilisateurs();
//   }, []);

//   return (
//     <UtilisateurTable
//       utilisateurs={utilisateurs}
//       selectedId={selectedId}
//       onSelect={setSelectedId}
//       onDelete={handleDelete}
//       onEdit={handleEdit}
//     />
//   );
// };

// export default ListeUtilisateurs;



import React, { useEffect, useState } from "react";
import axios from "axios";
import UtilisateurTable from "../components/UtilisateurTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const navigate = useNavigate();

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/utilisateur");
      setUtilisateurs(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  const deleteUtilisateur = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/utilisateur/${id}`);
      toast.success("Utilisateur supprimé !");
      fetchUtilisateurs();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error("Erreur lors de la suppression", error);
    }
  };

  const showDeleteConfirmation = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Confirmer la suppression de l'utilisateur ?</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => {
                deleteUtilisateur(id);
                closeToast();
              }}
              className="px-2 py-1 bg-red-600 text-white rounded"
            >
              Oui
            </button>
            <button
              onClick={closeToast}
              className="px-2 py-1 bg-gray-300 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleDelete = (id) => {
    showDeleteConfirmation(id);
  };

  const handleEdit = (user) => {
    navigate(`/modifier-utilisateur/${user.codeUtilisateur}`);
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  return (
    <UtilisateurTable
      utilisateurs={utilisateurs}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
};

export default ListeUtilisateurs;
