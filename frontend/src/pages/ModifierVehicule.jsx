import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModifierVehiculeForm from "../components/ModifierVehiculeForm";

const ModifierVehicule = () => {
  const { id} = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchVehicule = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/vehicules/${id}`);
        const data = res.data;

        
        setInitialData(data);
      } catch (error) {
        console.error("Erreur lors du chargement du vehicule :", error);
      }
    };
    fetchVehicule();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axios.put(`http://localhost:5000/vehicules/${id}`, data);
      navigate("/vehicules");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    }
  };

  if (!initialData) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier le vehicule</h2>
      <ModifierVehiculeForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default ModifierVehicule;
