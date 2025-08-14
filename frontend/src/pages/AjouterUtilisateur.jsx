import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AjouterUtilisateurForm from "../components/AjouterUtilisateurForm";

const AjouterUtilisateur = () => {
  const navigate = useNavigate();
  const [erreur, setErreur] = useState(null); 

  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/utilisateur', userData);
      console.log('Utilisateur ajouté avec succès :', response.data);
    } catch (error) {
      if (error.response) {

        console.error('Erreur de réponse :', error.response.data);
        setErreur(error.response.data.erreurs);  
      } else if (error.request) {

        console.error('Erreur de requête :', error.request);
      } else {
      
        console.error('Erreur lors de la configuration de la requête :', error.message);
      }
    }
  };

  return (
    <div>
     
      <AjouterUtilisateurForm onSubmit={handleAddUser} erreur={erreur} />
    </div>
  );
};

export default AjouterUtilisateur;





