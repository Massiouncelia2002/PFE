import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModifierDepotForm from "../components/ModifierDepotForm";

const ModifierDepot = () => {
  const { id} = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchDepot = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/depot/${id}`);
        const data = res.data;

        
        setInitialData(data);
      } catch (error) {
        console.error("Erreur lors du chargement du dépôt :", error);
      }
    };
    fetchDepot();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axios.put(`http://localhost:5000/depot/${id}`, data);
      navigate("/depots");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    }
  };

  if (!initialData) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier le dépôt</h2>
      <ModifierDepotForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default ModifierDepot;
