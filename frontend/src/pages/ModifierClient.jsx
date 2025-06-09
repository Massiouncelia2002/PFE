import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModifierClientForm from "../components/ModifierClientForm";

const ModifierClient = () => {
  const { id} = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchClients= async () => {
      try {
        const res = await axios.get(`http://localhost:5000/client/${id}`);
        const data = res.data;

        
        setInitialData(data);
      } catch (error) {
        console.error("Erreur lors du chargement du client :", error);
      }
    };
    fetchClients();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axios.put(`http://localhost:5000/client/${id}`, data);
      alert("Client modifié avec succès !");
      navigate("/clients");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      alert("Erreur lors de la modification du client.");
    }
  };

  if (!initialData) return <p>Chargement...</p>;

  return (
    <div>

      <ModifierClientForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default ModifierClient;
