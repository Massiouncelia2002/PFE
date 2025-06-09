// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterClientForm = ({ onSubmit, onShowClients }) => {
//   const [formData, setFormData] = useState({
//     codeClient: "",
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSubmit(formData);

//     setMessage("✅ Client ajouté avec succès !");
//     setFormData({
//       codeClient: "",
//       nomClient: "",
//       email: "",
//       adress: "",
//       tel: "",
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           codeClient: row.codeClient || "",
//           nomClient: row.nomClient || "",
//           email: row.email || "",
//           adress: row.adress || "",
//           tel: row.tel || "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} clients importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un client</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input name="codeClient" placeholder="Code Client" value={formData.codeClient} onChange={handleChange} />
//           <Input name="nomClient" placeholder="Nom Client" value={formData.nomClient} onChange={handleChange} />
//           <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <Input name="adress" placeholder="Adresse" value={formData.adress} onChange={handleChange} />
//           <Input name="tel" placeholder="Numéro de téléphone" value={formData.tel} onChange={handleChange} />

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/clients")}>
//             Afficher les clients
//           </Button>
//         </div>

//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterClientForm;





// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterClientForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSubmit(formData);

//     setMessage("✅ Client ajouté avec succès !");
//     setFormData({
//       nomClient: "",
//       email: "",
//       adress: "",
//       tel: "",
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           nomClient: row.nomClient || "",
//           email: row.email || "",
//           adress: row.adress || "",
//           tel: row.tel || "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} clients importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un client</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           {/* Suppression du champ codeClient */}
//           <Input name="nomClient" placeholder="Nom Client" value={formData.nomClient} onChange={handleChange} />
//           <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <Input name="adress" placeholder="Adresse" value={formData.adress} onChange={handleChange} />
//           <Input name="tel" placeholder="Numéro de téléphone" value={formData.tel} onChange={handleChange} />

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/clients")}>
//             Afficher les clients
//           </Button>
//         </div>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterClientForm;







// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterClientForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//     codeDepot: "", // Champ pour le dépôt sélectionné
//   });

//   const [message, setMessage] = useState("");
//   const [depots, setDepots] = useState([]); // Liste des dépôts
//   const navigate = useNavigate();

//   // Simulation des dépôts disponibles
//   const depotsDisponibles = [
//     { codeDepot: "DEP01", nomDepot: "Depot Bejaia" },
//     { codeDepot: "DEP02", nomDepot: "Depot Algiers" },
//     { codeDepot: "DEP03", nomDepot: "Depot Oran" },
//   ];

//   useEffect(() => {
//     // Logique pour déterminer le dépôt à affecter selon l'adresse
//     const depotParDefaut = getDepotFromAddress(formData.adress);
//     setFormData((prev) => ({
//       ...prev,
//       codeDepot: depotParDefaut ? depotParDefaut.codeDepot : "", // Sélectionner le dépôt par défaut
//     }));

//     // Définir les dépôts disponibles
//     setDepots(depotsDisponibles);
//   }, [formData.adress]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Fonction pour déterminer le dépôt basé sur l'adresse
//   const getDepotFromAddress = (address) => {
//     // Simple logique basée sur l'adresse, exemple : si l'adresse contient "Bejaia"
//     if (address.toLowerCase().includes("bejaia")) {
//       return depotsDisponibles.find((depot) => depot.codeDepot === "DEP01");
//     }
//     // Si l'adresse ne correspond pas à Bejaia, retourner null (aucun dépôt sélectionné par défaut)
//     return null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setMessage("✅ Client ajouté avec succès !");
//     setFormData({
//       nomClient: "",
//       email: "",
//       adress: "",
//       tel: "",
//       codeDepot: "", // Réinitialiser le dépôt après soumission
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           nomClient: row.nomClient || "",
//           email: row.email || "",
//           adress: row.adress || "",
//           tel: row.tel || "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} clients importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un client</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input
//             name="nomClient"
//             placeholder="Nom Client"
//             value={formData.nomClient}
//             onChange={handleChange}
//           />
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <Input
//             name="adress"
//             placeholder="Adresse"
//             value={formData.adress}
//             onChange={handleChange}
//           />
//           <Input
//             name="tel"
//             placeholder="Numéro de téléphone"
//             value={formData.tel}
//             onChange={handleChange}
//           />

//           {/* Sélection du dépôt */}
//           <div className="col-span-2">
//             <label htmlFor="codeDepot" className="block text-sm font-medium text-gray-700">
//               Sélectionner le dépôt
//             </label>
//             <select
//               name="codeDepot"
//               id="codeDepot"
//               value={formData.codeDepot}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="">Sélectionnez un dépôt</option>
//               {depots.map((depot) => (
//                 <option key={depot.codeDepot} value={depot.codeDepot}>
//                   {depot.nomDepot}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/clients")}>
//             Afficher les clients
//           </Button>
//         </div>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterClientForm;












// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterClientForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//     codeDepot: "", // Champ pour le dépôt sélectionné
//   });

//   const [message, setMessage] = useState("");
//   const [depots, setDepots] = useState([]); // Liste des dépôts
//   const navigate = useNavigate();

//   // Simulation des dépôts disponibles depuis la BDD (remplacez cette partie par un appel API réel)
//   useEffect(() => {
//     // Remplacez ceci par un appel API pour récupérer les dépôts depuis la BDD
//     fetch("/api/depots")
//       .then(response => response.json())
//       .then(data => setDepots(data))
//       .catch(error => console.error("Erreur lors de la récupération des dépôts:", error));
//   }, []);

//   useEffect(() => {
//     // Logique pour déterminer le dépôt à affecter selon l'adresse
//     const depotParDefaut = getDepotFromAddress(formData.adress);
//     setFormData((prev) => ({
//       ...prev,
//       codeDepot: depotParDefaut ? depotParDefaut.codeDepot : "", // Sélectionner le dépôt par défaut
//     }));
//   }, [formData.adress]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Fonction pour déterminer le dépôt basé sur l'adresse
//   const getDepotFromAddress = (address) => {
//     // Ici, vous pouvez adapter la logique pour faire une recherche dans les dépôts de la BDD.
//     return depots.find(depot => address.toLowerCase().includes(depot.nomDepot.toLowerCase()));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setMessage("✅ Client ajouté avec succès !");
//     setFormData({
//       nomClient: "",
//       email: "",
//       adress: "",
//       tel: "",
//       codeDepot: "", // Réinitialiser le dépôt après soumission
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         onSubmit({
//           nomClient: row.nomClient || "",
//           email: row.email || "",
//           adress: row.adress || "",
//           tel: row.tel || "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} clients importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un client</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input
//             name="nomClient"
//             placeholder="Nom Client"
//             value={formData.nomClient}
//             onChange={handleChange}
//           />
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <Input
//             name="adress"
//             placeholder="Adresse"
//             value={formData.adress}
//             onChange={handleChange}
//           />
//           <Input
//             name="tel"
//             placeholder="Numéro de téléphone"
//             value={formData.tel}
//             onChange={handleChange}
//           />

//           {/* Sélection du dépôt */}
//           <div className="col-span-2">
//             <label htmlFor="codeDepot" className="block text-sm font-medium text-gray-700">
//               Sélectionner le dépôt
//             </label>
//             <select
//               name="codeDepot"
//               id="codeDepot"
//               value={formData.codeDepot}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="">Sélectionnez un dépôt</option>
//               {depots.map((depot) => (
//                 <option key={depot.codeDepot} value={depot.codeDepot}>
//                   {depot.nomDepot}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/clients")}>
//             Afficher les clients
//           </Button>
//         </div>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterClientForm;










// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterClientForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//     codeDepot: "", // Sélection du dépôt
//   });

//   const [message, setMessage] = useState("");
//   const [depots, setDepots] = useState([]);
//   const navigate = useNavigate();

//   // Récupérer les dépôts depuis l'API
//   useEffect(() => {
//     fetch("/depot")
//       .then((res) => res.json())
//       .then((data) => setDepots(data))
//       .catch((err) =>
//         console.error("Erreur lors de la récupération des dépôts:", err)
//       );
//   }, []);

//   // Affecter automatiquement un dépôt en fonction de l'adresse
//   useEffect(() => {
//     if (formData.adress && depots.length > 0) {
//       const depotParDefaut = getDepotFromAddress(formData.adress);
//       if (depotParDefaut) {
//         setFormData((prev) => ({
//           ...prev,
//           codeDepot: depotParDefaut.codeDepot,
//         }));
//       }
//     }
//   }, [formData.adress, depots]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Trouver un dépôt dont le nom apparaît dans l'adresse
//   const getDepotFromAddress = (address) => {
//     return depots.find((depot) =>
//       address.toLowerCase().includes(depot.nomDepot.toLowerCase())
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setMessage("✅ Client ajouté avec succès !");
//     setFormData({
//       nomClient: "",
//       email: "",
//       adress: "",
//       tel: "",
//       codeDepot: "",
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         const matchedDepot = getDepotFromAddress(row.adress || "");
//         onSubmit({
//           nomClient: row.nomClient || "",
//           email: row.email || "",
//           adress: row.adress || "",
//           tel: row.tel || "",
//           codeDepot: matchedDepot ? matchedDepot.codeDepot : "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} clients importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un client</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-2 gap-4 max-w-3xl"
//         >
//           <Input
//             name="nomClient"
//             placeholder="Nom Client"
//             value={formData.nomClient}
//             onChange={handleChange}
//           />
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <Input
//             name="adress"
//             placeholder="Adresse"
//             value={formData.adress}
//             onChange={handleChange}
//           />
//           <Input
//             name="tel"
//             placeholder="Numéro de téléphone"
//             value={formData.tel}
//             onChange={handleChange}
//           />

//           {/* Sélection du dépôt */}
//           <div className="col-span-2">
//             <label
//               htmlFor="codeDepot"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Sélectionner le dépôt
//             </label>
//             <select
//               name="codeDepot"
//               id="codeDepot"
//               value={formData.codeDepot}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="">Sélectionnez un dépôt</option>
//               {depots.map((depot) => (
//                 <option key={depot.codeDepot} value={depot.codeDepot}>
//                   {depot.nomDepot} - {depot.wilaya}  {/* Affichage de la wilaya */}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/clients")}>
//             Afficher les clients
//           </Button>
//         </div>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterClientForm;







// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { useNavigate } from "react-router-dom";

// const AjouterClientForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     nomClient: "",
//     email: "",
//     adress: "",
//     tel: "",
//     codeDepot: "", // Sélection du dépôt
//   });

//   const [message, setMessage] = useState("");
//   const [depots, setDepots] = useState([]);
//   const navigate = useNavigate();

//   // Récupérer les dépôts depuis l'API
//   useEffect(() => {
//     fetch("/depot")
//       .then((res) => res.json())
//       .then((data) => setDepots(data))
//       .catch((err) =>
//         console.error("Erreur lors de la récupération des dépôts:", err)
//       );
//   }, []);

//   // Affecter automatiquement un dépôt en fonction de l'adresse
//   useEffect(() => {
//     if (formData.adress && depots.length > 0) {
//       const wilaya = extractWilayaFromAddress(formData.adress);
//       const depotParWilaya = getDepotByWilaya(wilaya);
//       if (depotParWilaya) {
//         setFormData((prev) => ({
//           ...prev,
//           codeDepot: depotParWilaya.codeDepot,
//         }));
//       }
//     }
//   }, [formData.adress, depots]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Extraire la wilaya de l'adresse
//   const extractWilayaFromAddress = (address) => {
//     // Par exemple, si l'adresse contient "Alger", "Oran", etc., vous pouvez ajuster cette logique selon votre besoin
//     const wilayas = depots.map((depot) => depot.wilaya);
//     for (let wilaya of wilayas) {
//       if (address.toLowerCase().includes(wilaya.toLowerCase())) {
//         return wilaya;
//       }
//     }
//     return ""; // Retourner une chaîne vide si aucune wilaya n'est trouvée
//   };

//   // Trouver un dépôt en fonction de la wilaya
//   const getDepotByWilaya = (wilaya) => {
//     return depots.find((depot) => depot.wilaya.toLowerCase() === wilaya.toLowerCase());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setMessage("✅ Client ajouté avec succès !");
//     setFormData({
//       nomClient: "",
//       email: "",
//       adress: "",
//       tel: "",
//       codeDepot: "",
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//       jsonData.forEach((row) => {
//         const wilaya = extractWilayaFromAddress(row.adress || "");
//         const matchedDepot = getDepotByWilaya(wilaya);
//         onSubmit({
//           nomClient: row.nomClient || "",
//           email: row.email || "",
//           adress: row.adress || "",
//           tel: row.tel || "",
//           codeDepot: matchedDepot ? matchedDepot.codeDepot : "",
//         });
//       });

//       setMessage(`✅ ${jsonData.length} clients importés depuis Excel.`);
//     };

//     if (file) {
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Ajouter un client</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-2 gap-4 max-w-3xl"
//         >
//           <Input
//             name="nomClient"
//             placeholder="Nom Client"
//             value={formData.nomClient}
//             onChange={handleChange}
//           />
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <Input
//             name="adress"
//             placeholder="Adresse"
//             value={formData.adress}
//             onChange={handleChange}
//           />
//           <Input
//             name="tel"
//             placeholder="Numéro de téléphone"
//             value={formData.tel}
//             onChange={handleChange}
//           />

//           {/* Sélection du dépôt */}
//           <div className="col-span-2">
//             <label
//               htmlFor="codeDepot"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Sélectionner le dépôt
//             </label>
//             <select
//               name="codeDepot"
//               id="codeDepot"
//               value={formData.codeDepot}
//               onChange={handleChange}
//               className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="">Sélectionnez un dépôt</option>
//               {depots.map((depot) => (
//                 <option key={depot.codeDepot} value={depot.codeDepot}>
//                   {depot.nomDepot} - {depot.wilaya}  {/* Affichage de la wilaya */}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer</Button>
//           </div>
//         </form>

//         <div className="flex items-center space-x-4 mt-4">
//           <Button onClick={() => document.getElementById("excelInput").click()}>
//             Importer depuis Excel
//           </Button>
//           <input
//             type="file"
//             id="excelInput"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <Button variant="outline" onClick={() => navigate("/clients")}>
//             Afficher les clients
//           </Button>
//         </div>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AjouterClientForm;













import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";

const AjouterClientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nomClient: "",
    email: "",
    adress: "",
    tel: "",
    telType: "cellulaire",
    codeDepot: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [depots, setDepots] = useState([]);
  const navigate = useNavigate();

  // Récupération des dépôts depuis le backend
  useEffect(() => {
    fetch("/depot")
      .then((res) => res.json())
      .then((data) => setDepots(data))
      .catch((err) => console.error("Erreur lors de la récupération des dépôts:", err));
  }, []);

  // Mise à jour automatique du dépôt selon la wilaya détectée dans l'adresse
  useEffect(() => {
    if (formData.adress && depots.length > 0) {
      const wilaya = extractWilayaFromAddress(formData.adress);
      const depotParWilaya = getDepotByWilaya(wilaya);
      if (depotParWilaya) {
        setFormData((prev) => ({
          ...prev,
          codeDepot: depotParWilaya.codeDepot,
        }));
      }
    }
  }, [formData.adress, depots]);

  

  const extractWilayaFromAddress = (address) => {
    const wilayas = depots.map((depot) => depot.wilaya);
    for (let wilaya of wilayas) {
      if (address.toLowerCase().includes(wilaya.toLowerCase())) {
        return wilaya;
      }
    }
    return "";
  };

  const getDepotByWilaya = (wilaya) => {
    return depots.find((depot) => depot.wilaya.toLowerCase() === wilaya.toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomClient.trim()) {
      newErrors.nomClient = "Le nom est requis.";
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.nomClient)) {
      newErrors.nomClient = "Le nom doit contenir uniquement des lettres.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide.";
    }

    const wilaya = extractWilayaFromAddress(formData.adress);
    if (!formData.adress.trim()) {
      newErrors.adress = "L'adresse est requise.";
    } 

    if (!formData.tel.trim()) {
      newErrors.tel = "Le numéro de téléphone est requis.";
    } else if (formData.telType === "cellulaire") {
      if (!/^0[567]\d{8}$/.test(formData.tel)) {
        newErrors.tel = "Numéro cellulaire invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres.";
      }
    } else {
      if (!/^\d{9}$/.test(formData.tel)) {
        newErrors.tel = "Numéro fixe invalide. Doit contenir exactement 9 chiffres.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
    setMessage("✅ Client ajouté avec succès !");
    setFormData({
      nomClient: "",
      email: "",
      adress: "",
      tel: "",
      telType: "cellulaire",
      codeDepot: "",
    });
    setErrors({});
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Traitement des lignes du fichier Excel
      data.slice(1).forEach((row) => {
        const [nomClient, email, adress, tel, telType] = row;
        const wilaya = extractWilayaFromAddress(adress || "");
        const depot = getDepotByWilaya(wilaya);

        if (nomClient && email && adress && tel) {
          const clientData = {
            nomClient,
            email,
            adress,
            tel,
            telType: telType || "cellulaire",
            codeDepot: depot ? depot.codeDepot : "",
          };
          onSubmit(clientData);
        }
      });

      setMessage("✅ Importation depuis Excel réussie !");
    };
    reader.readAsBinaryString(file);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Ajouter un client</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
          <div>
          <label className="block text-sm font-medium text-gray-700">Nom du client</label>
            <Input name="nomClient" placeholder="Nom Client" value={formData.nomClient} onChange={handleChange} />
            {errors.nomClient && <p className="text-red-500 text-sm">{errors.nomClient}</p>}
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700">Adress</label>
            <Input name="adress" placeholder="Adresse" value={formData.adress} onChange={handleChange} />
            {errors.adress && <p className="text-red-500 text-sm">{errors.adress}</p>}
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Type de téléphone</label>
            <select
              name="telType"
              value={formData.telType}
              onChange={handleChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
            >
              <option value="cellulaire">Cellulaire</option>
              <option value="fixe">Fixe</option>
            </select>
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700">Numero de téléphone</label>
            <Input name="tel" placeholder="Numéro de téléphone" value={formData.tel} onChange={handleChange} />
            {errors.tel && <p className="text-red-500 text-sm">{errors.tel}</p>}
          </div>


          <div className="col-span-2">
            <label htmlFor="codeDepot" className="block text-sm font-medium text-gray-700">
              Sélectionner le dépôt
            </label>
            <select
              name="codeDepot"
              id="codeDepot"
              value={formData.codeDepot}
              onChange={handleChange}
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Sélectionnez un dépôt</option>
              {depots.map((depot) => (
                <option key={depot.codeDepot} value={depot.codeDepot}>
                  {depot.nomDepot} - {depot.wilaya}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>

        <div className="flex items-center space-x-4 mt-4">
          <Button onClick={() => document.getElementById("excelInput").click()}>
            Importer depuis Excel
          </Button>
          <input
            type="file"
            id="excelInput"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <Button variant="outline" onClick={() => navigate("/clients")}>
            Afficher les clients
          </Button>
        </div>

        {message && <p className="text-green-600 mt-4">{message}</p>}
      </div>
    </AdminLayout>
  );
};

export default AjouterClientForm;
