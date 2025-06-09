import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AjouterVehiculeForm from "../components/AjouterVehiculeForm";

const AjouterVehicule = () => {
  const navigate = useNavigate();

  const handleAddVehicule = async (data) => {
    try {
 
      if (!data || Object.keys(data).length === 0) {
        console.error("Les données du vehicule sont vides ou invalides.");
        return;
      }

 
      const response = await axios.post("http://localhost:5000/vehicules", data);

      if (response.status === 200 || response.status === 201) {
        console.log("Vehicule ajouté avec succès :", response.data);
        navigate("/vehicules");
      } else {
        console.error("Échec de l'ajout du vehicule :", response);
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
      <AjouterVehiculeForm onSubmit={handleAddVehicule} />
    </div>
  );
};

export default AjouterVehicule;
