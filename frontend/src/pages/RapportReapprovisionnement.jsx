// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import Papa from "papaparse";
// import { saveAs } from "file-saver";

// const Reapprovisionnement = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/reapprovisionnement")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Erreur", err));
//   }, []);

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Rapport de Réapprovisionnement", 14, 10);
//     doc.autoTable({
//       head: [["Article", "Mois", "Prévision", "Stock Actuel", "À Commander"]],
//       body: data.map(row => [
//         row.codeArticle,
//         row.mois,
//         row.quantitePrevue,
//         row.stockActuel,
//         row.quantiteACommander
//       ])
//     });
//     doc.save("rapport_reapprovisionnement.pdf");
//   };

//   const exportCSV = () => {
//     const csv = Papa.unparse(data);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "rapport_reapprovisionnement.csv");
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">📦 Rapport de Réapprovisionnement</h2>

//       <div className="mb-4 space-x-2">
//         <button onClick={exportPDF} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           📄 Exporter PDF
//         </button>
//         <button onClick={exportCSV} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//           📊 Exporter CSV
//         </button>
//       </div>

//       <table className="min-w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Article</th>
//             <th className="p-2 border">Mois</th>
//             <th className="p-2 border">Prévision</th>
//             <th className="p-2 border">Stock Actuel</th>
//             <th className="p-2 border">À Commander</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i}>
//               <td className="p-2 border">{row.codeArticle}</td>
//               <td className="p-2 border">{row.mois}</td>
//               <td className="p-2 border">{row.quantitePrevue}</td>
//               <td className="p-2 border">{row.stockActuel}</td>
//               <td className="p-2 border font-semibold text-red-600">
//                 {row.quantiteACommander}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Reapprovisionnement;



import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ importer correctement
import Papa from "papaparse";
import { saveAs } from "file-saver";

const Reapprovisionnement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reapprovisionnement")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Erreur", err));
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Rapport de Réapprovisionnement", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Article", "Mois", "Prévision", "Stock Actuel", "À Commander"]],
      body: data.map(row => [
        row.codeArticle,
        row.mois,
        row.quantitePrevue,
        row.stockActuel,
        row.quantiteACommander
      ])
    });

    doc.save("rapport_reapprovisionnement.pdf");
  };

  const exportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "rapport_reapprovisionnement.csv");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 Rapport de Réapprovisionnement</h2>

      <div className="mb-4 space-x-2">
        <button onClick={exportPDF} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          📄 Exporter PDF
        </button>
        <button onClick={exportCSV} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          📊 Exporter CSV
        </button>
      </div>

      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Article</th>
            <th className="p-2 border">Mois</th>
            <th className="p-2 border">Prévision</th>
            <th className="p-2 border">Stock Actuel</th>
            <th className="p-2 border">À Commander</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="p-2 border">{row.codeArticle}</td>
              <td className="p-2 border">{row.mois}</td>
              <td className="p-2 border">{row.quantitePrevue}</td>
              <td className="p-2 border">{row.stockActuel}</td>
              <td className="p-2 border font-semibold text-red-600">
                {row.quantiteACommander}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reapprovisionnement;
