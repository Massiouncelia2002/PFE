import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import AdminFonctionnel from "./pages/AdminFonctionnel";
import AdminDepot from "./pages/AdminDepot";
import PlanificateurDepot from "./pages/PlanificateurDepot";


import PlanifierMesDepots from "./pages/PlanifierMesDepots";



import FamillesSousFamillesPage from './pages/FamillesSousFamillesPage'

import AjouterUtilisateur from "./pages/AjouterUtilisateur";
import ListeUtilisateurs from "./pages/ListeUtilisateurs";
import ModifierUtilisateur from "./pages/ModifierUtilisateur";

import Articles from "./pages/Articles";
import ListeArticles from "./pages/ListeArticles";
import ModifierArticle from "./pages/ModifierArticle";


import AjouterDepot from "./pages/AjouterDepot";
import ListeDepots from "./pages/ListeDepots";
import ModifierDepot from "./pages/ModifierDepot";

import AjouterClient from "./pages/AjouterClient";
import ListeClients from "./pages/ListeClients";
import ModifierClient from "./pages/ModifierClient";

import AjouterVehicule from "./pages/AjouterVehicule";
import ListeVehicules from "./pages/ListeVehicules";
import ModifierVehicule from "./pages/ModifierVehicule";

import AffectationDepot from "./pages/AffectationDepot";

import ImporterCommandes from "./pages/ImporterCommandes";

import AffecterUnitesArticle from "./pages/AffecterUnitesArticle";

import ArticleDepot from "./pages/ArticleDepot";

import AffecterDepotArticle from "./pages/AffecterDepotArticle";

import StockModifier from "./pages/StockModifier";

import EntreeStock from "./pages/EntreeStock";

import PlanifierCommandes from "./pages/PlanifierCommandes";

import PlanifierCommande from "./pages/PlanifierCommande";

import AfficherCommandesParClient from "./pages/AfficherCommandesParClient";

import AfficherCommandesPlanifiees from "./pages/AfficherCommandesPlanifiees";

import AffecterVehiculePage from './pages/AffecterVehiculePage';

import Previsions from "./pages/Previsions";

import PrevisionsParUtilisateur from "./pages/PrevisionsParUtilisateur";

import Reapprovisionnement from './pages/RapportReapprovisionnement';

import AffichePlanificationAdmin from "./pages/AffichePlanificationAdmin";


import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
import PageProfil from "./pages/PageProfil";
import Unauthorized from "./pages/Unauthorized";






export default function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Login />} />
      
          <Route path="/profil" element={<PageProfil />} />

          {/* <Route path="/admin-fonctionnel" element={<AdminFonctionnel />} /> */}
          <Route path="/admin-depot" element={<AdminDepot/>} />
          <Route path="/gestionnaire-depot" element={<PlanificateurDepot/>} />


          <Route path="/PlanifierMesDepots" element={<PlanifierMesDepots/>} />

{/* 
          <Route path="/articles" element={<Articles />} />
          <Route path="/liste-articles" element={<ListeArticles />} />
          <Route path="/articles/modifier-article/:codeArticle" element={<ModifierArticle />} />

          
          <Route path="/ajouter-utilisateur" element={<AjouterUtilisateur />} />
          <Route path="/utilisateurs" element={<ListeUtilisateurs />} />
          <Route path="/modifier-utilisateur/:id" element={<ModifierUtilisateur />} />



          <Route path="/famillesSousFamillespage" element={<FamillesSousFamillesPage />} />

          <Route path="/ajouter-depot" element={<AjouterDepot />} />
          <Route path="/depots" element={<ListeDepots />} />
          <Route path="/modifier-depot/:id" element={<ModifierDepot />} />

          <Route path="/ajouter-client" element={<AjouterClient />} />
          <Route path="/clients" element={<ListeClients />} />
          <Route path="/modifier-client/:id" element={<ModifierClient />} />

          <Route path="/ajouter-vehicule" element={<AjouterVehicule />} />
          <Route path="/vehicules" element={<ListeVehicules />} />
          <Route path="/modifier-vehicule/:id" element={<ModifierVehicule />} />

          <Route path="/affecter-depot" element={<AffectationDepot />} />

        <Route path="/AffecterDepotArticle" element={<AffecterDepotArticle />} /> */}

{/* 🔐 Routes accessibles uniquement à l'Admin Fonctionnel */}
<Route
  path="/admin-fonctionnel"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <AdminFonctionnel />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/articles"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <Articles />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/liste-articles"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ListeArticles />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/articles/modifier-article/:codeArticle"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ModifierArticle />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/ajouter-utilisateur"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <AjouterUtilisateur />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/utilisateurs"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ListeUtilisateurs />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/modifier-utilisateur/:id"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ModifierUtilisateur />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/famillesSousFamillespage"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <FamillesSousFamillesPage />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/ajouter-depot"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <AjouterDepot />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/depots"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ListeDepots />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/modifier-depot/:id"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ModifierDepot />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/ajouter-client"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <AjouterClient />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/clients"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ListeClients />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/modifier-client/:id"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ModifierClient />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/ajouter-vehicule"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <AjouterVehicule />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/vehicules"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ListeVehicules />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/modifier-vehicule/:id"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <ModifierVehicule />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/affecter-depot"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <AffectationDepot />
    </ProtectedRouteByRole>
  }
/>

<Route
  path="/AffecterDepotArticle"
  element={
    <ProtectedRouteByRole allowedRoles={["Admin Fonctionnel"]}>
      <AffecterDepotArticle />
    </ProtectedRouteByRole>
  }
/>


          <Route path="/article-depot" element={<ArticleDepot />} />

          <Route path="/import-commandes" element={<ImporterCommandes />} />

      
          <Route path="/StockModifier" element={<StockModifier />} />

          <Route path="/EntreeStock" element={<EntreeStock />} />

          <Route path="/Planifier-commandes" element={<PlanifierCommandes />} />

          <Route path="/PlanifierCommande" element={<PlanifierCommande />} />

          <Route path="/AffecterVehiculePage" element={<AffecterVehiculePage />} />

          <Route path="/Previsions" element={<Previsions />} />

          <Route path="/PrevisionsParUtilisateur" element={<PrevisionsParUtilisateur />} />

          <Route path="/RapportReapprovisionnement" element={<Reapprovisionnement />} />

          <Route path="/AfficherCommandesParClient" element={<AfficherCommandesParClient />} />

          <Route path="/AfficherCommandesPlanifiees" element={<AfficherCommandesPlanifiees />} />

          <Route path="/AffichePlanificationAdmin" element={<AffichePlanificationAdmin />} />

         

          

          
      

          
        </Routes>
      </Router>
    </>
  );
}
