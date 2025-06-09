import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModifierUtilisateurForm from "../components/ModifierUtilisateurForm";

const ModifierUtilisateur = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/utilisateur/${id}`);
      const data = res.data;

      if (data.dateFin) {
        data.dateFin = data.dateFin.split("T")[0];
      }

      setInitialData(data);
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axios.put(`http://localhost:5000/utilisateur/${id}`, data);
      navigate("/utilisateurs");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    }
  };

  if (!initialData) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier l'utilisateur</h2>
      <ModifierUtilisateurForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default ModifierUtilisateur;
