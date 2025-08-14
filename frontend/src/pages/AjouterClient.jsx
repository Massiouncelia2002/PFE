import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AjouterClientForm from "../components/AjouterClientForm";

const AjouterClient = () => {
  const navigate = useNavigate();

  const handleAddClient = async (data) => {
    try {
     
      if (!data || Object.keys(data).length === 0) {
        console.error("Les données du client sont vides ou invalides.");
        return;
      }

      
      const response = await axios.post("http://localhost:5000/client", data);

      if (response.status === 200 || response.status === 201) {
        console.log("Client ajouté avec succès :", response.data);
        navigate("/clients");
      } else {
        console.error("Échec de l'ajout du client :", response);
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
      <AjouterClientForm onSubmit={handleAddClient} />
    </div>
  );
};

export default AjouterClient;
