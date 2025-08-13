import React, { useState } from 'react';
import { Download, AlertTriangle, TrendingUp, Package, CheckCircle, Edit3 } from 'lucide-react';

import AdminLayoutPlannificateur from './AdminLayoutPlannificateur'; 

const SmartRestockInterface = () => {
  const [currentStep, setCurrentStep] = useState('depot-selection');
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [alertArticles, setAlertArticles] = useState([]);
  const [restockQuantities, setRestockQuantities] = useState({});
  const [editingArticle, setEditingArticle] = useState(null);

  // Données des dépôts Cevital
  const depots = [
    { id: 'CLR-OUE-3199', name: 'Clr5', location: 'Est' },
    { id: 'CLR-SUD-5247', name: 'Clr3', location: 'Est' },
    { id: 'CLR-EST-8854', name: 'Clr4', location: 'Est' }
  ];

  // Données des articles - stocks Cevital
  const stockData = [
    { articleId: "SF-F-649-TCHINA-JUSFRUIT1L001", depotId: "CLR-EST-8854", currentStock: 0, alertThreshold: 0, suggestedRestock: 50 },
    { articleId: "SF-F-143-BOISSON-EAU1L001", depotId: "CLR-EST-8854", currentStock: 50, alertThreshold: 0, suggestedRestock: 20 },
    { articleId: "SF-F-395-HUILE-FLEURIAL5L001", depotId: "CLR-OUE-8043", currentStock: 0, alertThreshold: 0, suggestedRestock: 10 },
    { articleId: "SF-F-395-HUILE-FLEURIAL5L001", depotId: "CLR-SUD-9221", currentStock: 5, alertThreshold: 0, suggestedRestock: 10 },
    { articleId: "SF-F-395-HUILE-LABELLE500GR001", depotId: "CLR-OUE-8043", currentStock: 0, alertThreshold: 0, suggestedRestock: 30 },
    { articleId: "SF-F-395-HUILE-LABELLE500GR001", depotId: "CLR-SUD-9221", currentStock: 50, alertThreshold: 0, suggestedRestock: 30 },
    { articleId: "SF-F-395-HUILE-LABELLE500GR002", depotId: "CLR-OUE-8043", currentStock: 0, alertThreshold: 0, suggestedRestock: 20 },
    { articleId: "SF-F-395-HUILE-LABELLE500GR002", depotId: "CLR-SUD-9221", currentStock: 5, alertThreshold: 0, suggestedRestock: 20 },
    { articleId: "SF-F-395-HUILE-LABELLE500GR003", depotId: "CLR-OUE-8043", currentStock: 0, alertThreshold: 0, suggestedRestock: 30 },
    { articleId: "SF-F-762-LALAKHEDIJA-EAUGAZEUX33CL001", depotId: "CLR-EST-8854", currentStock: 50, alertThreshold: 0, suggestedRestock: 30 },
    { articleId: "SF-F-762-LALAKHEDIJA-EAUMINIRALLE33CL001", depotId: "CLR-EST-8854", currentStock: 0, alertThreshold: 0, suggestedRestock: 30 },
    { articleId: "SF-F-762-LALAKHEDIJA-EAUMINIRALLE5L001", depotId: "CLR-EST-8854", currentStock: 0, alertThreshold: 0, suggestedRestock: 20 },
    { articleId: "SF-F-684-ELIO-HUILE5L001", depotId: "CLR-EST-8854", currentStock: 0, alertThreshold: 0, suggestedRestock: 20 },
    { articleId: "SF-F-917-MATINA-SMEN500G001", depotId: "CLR-EST-8854", currentStock: 0, alertThreshold: 0, suggestedRestock: 20 },
    { articleId: "SF-F-917-MATINA-MARGARINE1KG001", depotId: "CLR-EST-8854", currentStock: 0, alertThreshold: 0, suggestedRestock: 20 },
    { articleId: "SF-F-395-HUILE-LABELLE500GR005", depotId: "CLR-SUD-9221", currentStock: 0, alertThreshold: 0, suggestedRestock: 20 }
  ];

  // Informations sur les articles Cevital
  const articleDetails = {
    "SF-F-143-BOISSON-EAU1L001": {
      name: "Eau minérale 1L",
      category: "Boissons",
      averageDailySales: 2.1,
      predictedDemand: 60
    },
    "SF-F-395-HUILE-FLEURIAL5L001": {
      name: "Huile Fleurial 5L",
      category: "Huiles",
      averageDailySales: 0.8,
      predictedDemand: 12
    },
    "SF-F-395-HUILE-LABELLE500GR001": {
      name: "Huile Labelle 500g (Type 1)",
      category: "Huiles",
      averageDailySales: 1.5,
      predictedDemand: 45
    },
    "SF-F-395-HUILE-LABELLE500GR002": {
      name: "Huile Labelle 500g (Type 2)",
      category: "Huiles",
      averageDailySales: 1.2,
      predictedDemand: 36
    },
    "SF-F-395-HUILE-LABELLE500GR003": {
      name: "Huile Labelle 500g (Type 3)",
      category: "Huiles",
      averageDailySales: 1.3,
      predictedDemand: 39
    },
    "SF-F-395-HUILE-LABELLE500GR004": {
      name: "Huile Labelle 500g (Type 4)",
      category: "Huiles",
      averageDailySales: 1.1,
      predictedDemand: 33
    },
    "SF-F-395-HUILE-LABELLE500GR005": {
      name: "Huile Labelle 500g (Type 5)",
      category: "Huiles",
      averageDailySales: 1.0,
      predictedDemand: 30
    }
  };

  const getAlertArticles = (depotId) => {
    return stockData
      .filter(item => item.depotId === depotId && item.currentStock <= item.alertThreshold)
      .map(item => {
        const details = articleDetails[item.articleId] || {
          name: item.articleId,
          category: "Inconnu",
          averageDailySales: 0,
          predictedDemand: 0
        };
        
        return {
          id: item.articleId,
          name: details.name,
          currentStock: item.currentStock,
          alertThreshold: item.alertThreshold,
          averageDailySales: details.averageDailySales,
          predictedDemand: details.predictedDemand,
          suggestedRestock: item.suggestedRestock,
          category: details.category
        };
      });
  };

  const handleDepotSelection = (depot) => {
    setSelectedDepot(depot);
    const articles = getAlertArticles(depot.id);
    setAlertArticles(articles);
    
    const initialQuantities = {};
    articles.forEach(article => {
      initialQuantities[article.id] = article.suggestedRestock;
    });
    setRestockQuantities(initialQuantities);
    
    setCurrentStep('alert-articles');
  };

  const handleQuantityChange = (articleId, newQuantity) => {
    setRestockQuantities(prev => ({
      ...prev,
      [articleId]: Math.max(0, parseInt(newQuantity) || 0)
    }));
  };

  const generateRestockFile = () => {
    const restockData = alertArticles.map(article => ({
      'Code Article': article.id,
      'Nom Article': article.name,
      'Dépôt Cevital': selectedDepot.name,
      'Stock Actuel': article.currentStock,
      'Seuil Alerte': article.alertThreshold,
      'Quantité Suggérée': article.suggestedRestock,
      'Quantité Commandée': restockQuantities[article.id],
      'Prédiction Demande': article.predictedDemand,
      'Catégorie': article.category,
      'Date': new Date().toLocaleDateString('fr-FR')
    }));

    const headers = Object.keys(restockData[0]);
    const csvContent = [
      headers.join(','),
      ...restockData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reapprovisionnement_cevital_${selectedDepot.id}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderDepotSelection = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Package className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Stocks Cevital</h1>
        <p className="text-gray-600">Sélectionnez un dépôt Cevital pour le réapprovisionnement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {depots.map((depot) => (
          <div
            key={depot.id}
            onClick={() => handleDepotSelection(depot)}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{depot.id}</h3>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <h4 className="text-lg text-gray-700 mb-2">{depot.name}</h4>
            <p className="text-gray-500">{depot.location}</p>
            <div className="mt-4 text-blue-600 font-medium">Cliquer pour analyser →</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlertArticles = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => setCurrentStep('depot-selection')}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Retour aux dépôts Cevital
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Articles à réapprovisionner</h1>
            <p className="text-gray-600">Dépôt Cevital: {selectedDepot.name} - {alertArticles.length} articles en alerte de stock</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
      </div>

      {alertArticles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Stocks suffisants</h3>
          <p className="text-gray-600">Aucun article ne nécessite de réapprovisionnement dans ce dépôt Cevital.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actuel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seuil Alerte</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventes Moyennes/jour</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prédiction Demande</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggéré</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité Commande</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alertArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{article.name}</div>
                          <div className="text-sm text-gray-500">{article.id} - {article.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.currentStock <= article.alertThreshold ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.currentStock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{article.alertThreshold}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{article.averageDailySales}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm text-gray-900">{article.predictedDemand}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {article.suggestedRestock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {editingArticle === article.id ? (
                            <input
                              type="number"
                              value={restockQuantities[article.id] || ''}
                              onChange={(e) => handleQuantityChange(article.id, e.target.value)}
                              onBlur={() => setEditingArticle(null)}
                              onKeyPress={(e) => e.key === 'Enter' && setEditingArticle(null)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                              autoFocus
                            />
                          ) : (
                            <div
                              onClick={() => setEditingArticle(article.id)}
                              className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                            >
                              <span className="text-sm font-medium mr-1">{restockQuantities[article.id]}</span>
                              <Edit3 className="w-3 h-3 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleQuantityChange(article.id, article.suggestedRestock)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Réinitialiser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Résumé de la commande</h3>
                <p className="text-gray-600">Total des articles: {alertArticles.length}</p>
                <p className="text-gray-600">Quantité totale à commander: {Object.values(restockQuantities).reduce((a, b) => a + b, 0)} unités</p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                onClick={generateRestockFile}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Exporter la commande (CSV)
              </button>
              <button
                onClick={() => {
                  alert('Commande transmise à la production Cevital avec succès!');
                }}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Transmettre à Cevital
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  ); 

  return (
    <AdminLayoutPlannificateur  >
    <div className="min-h-screen bg-gray-100">
      {currentStep === 'depot-selection' && renderDepotSelection()}
      {currentStep === 'alert-articles' && renderAlertArticles()}
    </div>
    </AdminLayoutPlannificateur>
  );
};

export default SmartRestockInterface;