import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientTable from "../components/clientTable";

const ListeClients = () => {
  const [clients, setClients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/client");
      setClients(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <ClientTable
        clients={clients}
        selectedId={selectedId}
        onSelect={setSelectedId}
        fetchClients={fetchClients}
      />
    </div>
  );
};

export default ListeClients;
