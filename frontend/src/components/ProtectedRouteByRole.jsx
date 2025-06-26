// components/ProtectedRouteByRole.jsx
import { Navigate } from "react-router-dom";

const ProtectedRouteByRole = ({ allowedRoles, children }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    console.warn("⛔ Aucun rôle trouvé dans le localStorage.");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("🔐 Rôle actuel :", role);
  console.log("🎯 Rôles autorisés :", allowedRoles);

  if (!allowedRoles.includes(role)) {
    console.warn("⛔ Accès refusé. Rôle non autorisé :", role);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRouteByRole;
