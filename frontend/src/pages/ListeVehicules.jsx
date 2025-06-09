import React, { useEffect, useState } from "react";
import axios from "axios";
import VehiculeTable from "../components/VehiculeTable";

const ListeVehicules = () => {
  const [vehicules, setVehicules] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchVehicules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/vehicules");
      setVehicules(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des vehicules", error);
    }
  };

  useEffect(() => {
    fetchVehicules();
  }, []);

  return (
    <VehiculeTable
      vehicules={vehicules}
      selectedId={selectedId}
      onSelect={setSelectedId}
      refreshData={fetchVehicules}
    />
  );
};

export default ListeVehicules;
