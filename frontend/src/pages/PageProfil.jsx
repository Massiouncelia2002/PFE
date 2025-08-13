
import React from "react";
// import AdminLayout from "./AdminLayout";
import AdminLayoutDepot from "./AdminLayoutDepot";
// import AdminLayoutPlannificateur from "./AdminLayoutPlannificateur";
import Profil from "../components/Profil";

const PageProfil = () => {
  return (
    // <AdminLayout>
    //   <Profil />
    // </AdminLayout>

    <AdminLayoutDepot>
        <Profil />
    </AdminLayoutDepot>
    // <AdminLayoutPlannificateur>
    //     <Profil />
    // </AdminLayoutPlannificateur>
          );
};


export default PageProfil;
