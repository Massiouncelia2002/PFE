import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import AdminFonctionnel from "./pages/AdminFonctionnel";
import AdminDepot from "./pages/AdminDepot";

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

import UniteDeMesurePage from "./pages/UniteDeMesurePage";

import AffecterUnitesArticle from "./pages/AffecterUnitesArticle";

import ArticleDepot from "./pages/ArticleDepot";

import AffecterDepotArticle from "./pages/AffecterDepotArticle";

import StockModifier from "./pages/StockModifier";

import EntreeStock from "./pages/EntreeStock";

import PlanifierCommande from "./pages/PlanifierCommande";







export default function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/dashboard/admin" element={<div>Admin Dashboard</div>} /> */}
          <Route path="/dashboard/gestionnaire" element={<div>Gestionnaire Dashboard</div>} />
          

          <Route path="/admin-fonctionnel" element={<AdminFonctionnel />} />
          <Route path="/admin-depot" element={<AdminDepot/>} />


          <Route path="/ajouter-utilisateur" element={<AjouterUtilisateur />} />
          <Route path="/utilisateurs" element={<ListeUtilisateurs />} />
          <Route path="/modifier-utilisateur/:id" element={<ModifierUtilisateur />} />


          <Route path="/articles" element={<Articles />} />
          <Route path="/liste-articles" element={<ListeArticles />} />
          <Route path="/articles/modifier-article/:id" element={<ModifierArticle />} />

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

          <Route path="/import-commandes" element={<ImporterCommandes />} />
          


          <Route path="/uniteMesure" element={<UniteDeMesurePage />} />
          
          <Route path="/affecter-unite-article" element={<AffecterUnitesArticle />} />

          <Route path="/article-depot" element={<ArticleDepot />} />

          <Route path="/AffecterDepotArticle" element={<AffecterDepotArticle />} />

          <Route path="/StockModifier" element={<StockModifier />} />

          <Route path="/EntreeStock" element={<EntreeStock />} />

          <Route path="/PlanifierCommande" element={<PlanifierCommande />} />

          

          
      

          
        </Routes>
      </Router>
    </>
  );
}
