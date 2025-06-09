import React, { useEffect, useState } from "react";
import axios from "axios";
import DepotTable from "../components/DepotTable";

const ListeDepots = () => {
  const [depots, setDepots] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  
  const fetchDepots = async () => {
    try {
      const res = await axios.get("http://localhost:5000/depot");
      setDepots(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des dépôts", error);
    }
  };

  useEffect(() => {
    fetchDepots();
  }, []);

  return (
    <div>
      <DepotTable
        depots={depots}
        selectedId={selectedId}
        onSelect={setSelectedId}
        fetchDepots={fetchDepots}
      />
    </div>
  );
};

export default ListeDepots;
