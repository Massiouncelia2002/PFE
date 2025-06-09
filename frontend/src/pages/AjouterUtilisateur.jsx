// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AjouterUtilisateurForm from "../components/AjouterUtilisateurForm";

// const AjouterUtilisateur = () => {
//   const navigate = useNavigate();

//   const handleAddUser = async (data) => {
//     try {
//       await axios.post("http://localhost:5000/utilisateur", data);
//       navigate("/utilisateurs");
//     } catch (error) {
//       console.error("Erreur lors de l'ajout :", error);
//     }
//   };

//   return (
//     <div>
//       <AjouterUtilisateurForm onSubmit={handleAddUser} />
//     </div>
//   );
// };

// export default AjouterUtilisateur;











// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AjouterUtilisateurForm from "../components/AjouterUtilisateurForm";

// const AjouterUtilisateur = () => {
//   const navigate = useNavigate();
//   const [erreur, setErreur] = useState(null); // Utiliser un état pour gérer l'erreur

//   // const handleAddUser = async (data) => {
//   //   try {
//   //     await axios.post("http://localhost:5000/utilisateur", data);
//   //     navigate("/utilisateurs");
//   //   } catch (error) {
//   //     console.error("Erreur lors de l'ajout :", error);
//   //     // Vérifier si l'erreur contient des erreurs spécifiques
//   //     if (error.response && error.response.data && error.response.data.erreurs) {
//   //       setErreur(error.response.data.erreurs); // Mettre à jour l'état avec les erreurs
//   //     } else {
//   //       setErreur({ general: "Une erreur est survenue, veuillez réessayer." });
//   //     }
//   //   }
//   // };

  
// const handleAddUser = async (userData) => {
//   try {
//     const response = await axios.post('http://localhost:5000/utilisateur', userData);
//     console.log('Utilisateur ajouté avec succès :', response.data);
//   } catch (error) {
//     if (error.response) {
//       // Le serveur a répondu avec un code d'erreur
//       console.error('Erreur de réponse :', error.response.data);
//       setErrorMessages(error.response.data.erreurs);  // Afficher les erreurs dans l'interface utilisateur
//     } else if (error.request) {
//       // La requête a été envoyée, mais aucune réponse reçue
//       console.error('Erreur de requête :', error.request);
//     } else {
//       // Erreur lors de la configuration de la requête
//       console.error('Erreur lors de la configuration de la requête :', error.message);
//     }
//   }
// };

//   return (
//     <div>
//       {/* Passer l'erreur au formulaire pour affichage */}
//       <AjouterUtilisateurForm onSubmit={handleAddUser} erreur={erreur} />
//     </div>
//   );
// };

// export default AjouterUtilisateur;





import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AjouterUtilisateurForm from "../components/AjouterUtilisateurForm";

const AjouterUtilisateur = () => {
  const navigate = useNavigate();
  const [erreur, setErreur] = useState(null); // Utiliser l'état 'erreur' pour gérer l'erreur

  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/utilisateur', userData);
      console.log('Utilisateur ajouté avec succès :', response.data);
    } catch (error) {
      if (error.response) {
        // Le serveur a répondu avec un code d'erreur
        console.error('Erreur de réponse :', error.response.data);
        setErreur(error.response.data.erreurs);  // Mettre à jour l'état avec les erreurs
      } else if (error.request) {
        // La requête a été envoyée, mais aucune réponse reçue
        console.error('Erreur de requête :', error.request);
      } else {
        // Erreur lors de la configuration de la requête
        console.error('Erreur lors de la configuration de la requête :', error.message);
      }
    }
  };

  return (
    <div>
      {/* Passer l'erreur au formulaire pour affichage */}
      <AjouterUtilisateurForm onSubmit={handleAddUser} erreur={erreur} />
    </div>
  );
};

export default AjouterUtilisateur;





