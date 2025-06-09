import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VehiculeTable = ({ vehicules, selectedId, onSelect, refreshData }) => {
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    onSelect(selectedId === id ? null : id);
  };

  const handleEdit = (vehicule) => {
    navigate(`/modifier-vehicule/${vehicule.matricule}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`http://localhost:5000/vehicules/${id}`);
      if (res.status === 200) {
        toast.success("Véhicule supprimé avec succès !");
        onSelect(null);
        refreshData();
      } else {
        toast.error("Échec de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule", error);
      toast.error("Erreur lors de la suppression.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Liste des véhicules</h2>
        <div className="overflow-auto rounded-lg shadow border">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Sélection</th>
                <th className="px-6 py-3">Matricule</th>
                {/* <th className="px-6 py-3">Type Véhicule</th> */}
                <th className="px-6 py-3">Capacité</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicules.map((v) => (
                <tr
                  key={v.matricule}
                  className={`border-t group hover:bg-gray-50 transition ${
                    selectedId === v.matricule ? "bg-blue-100" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedId === v.matricule}
                      onChange={() => handleCheckboxChange(v.matricule)}
                    />
                  </td>
                  <td className="px-6 py-4">{v.matricule}</td>
                  {/* <td className="px-6 py-4">{v.typeVehicule}</td> */}
                  <td className="px-6 py-4">{v.capaciteVehicule}</td>
                  <td className="px-6 py-4">{v.statut}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <Pencil
                      className="h-5 w-5 text-yellow-600 cursor-pointer transition hover:scale-110"
                      onClick={() => handleEdit(v)}
                    />
                    <Trash2
                      className="h-5 w-5 text-red-600 cursor-pointer transition hover:scale-110"
                      onClick={() => handleDelete(v.matricule)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VehiculeTable;
