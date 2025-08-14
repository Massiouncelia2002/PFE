import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AjouterDepotForm from "../components/AjouterDepotForm";

const AjouterDepot = () => {
  const navigate = useNavigate();

  const handleAddDepot = async (data) => {
    try {
    
      if (!data || Object.keys(data).length === 0) {
        console.error("Les données du dépôt sont vides ou invalides.");
        return;
      }

     
      const response = await axios.post("http://localhost:5000/depot", data);

      if (response.status === 200 || response.status === 201) {
        console.log("Dépôt ajouté avec succès :", response.data);
        navigate("/depots");
      } else {
        console.error("Échec de l'ajout du dépôt :", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("Erreur du serveur :", error.response.data);
      } else if (error.request) {
        console.error("Aucune réponse reçue :", error.request);
      } else {
        console.error("Erreur inattendue :", error.message);
      }
    }
  };

  return (
    <div>
      <AjouterDepotForm onSubmit={handleAddDepot} />
    </div>
  );
};

export default AjouterDepot;


