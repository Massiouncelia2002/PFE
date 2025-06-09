import React, { useEffect, useState } from 'react';

const DepotsAvecArticles = () => {
  const [depots, setDepots] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/articleDepot/depots-articles')
      .then(res => res.json())
      .then(data => setDepots(data))
      .catch(err => console.error('Erreur chargement:', err));
  }, []);

  const handleInputChange = (e, depotIndex, articleIndex, field) => {
    const newDepots = [...depots];
    newDepots[depotIndex].articles[articleIndex][field] = e.target.value;
    setDepots(newDepots);
  };

  const handleSubmit = async (e, depot, article) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/articleDepot/article-depot/${depot.codeDepot}/${article.codeArticle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stockMax: article.stockMax,
          stockAlert: article.stockAlert
        })
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(`✔️ Stock mis à jour pour ${article.nomArticle}`);
      } else {
        setMessage(`❌ Erreur : ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Erreur lors de la mise à jour.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dépôts et Articles</h2>
      {message && <p><strong>{message}</strong></p>}

      {depots.map((depot, depotIndex) => (
        <div key={depot.codeDepot} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h3>Dépôt: {depot.nomDepot} ({depot.codeDepot})</h3>
          {depot.articles && depot.articles.length > 0 ? (
            depot.articles.map((article, articleIndex) => (
              <form key={article.codeArticle} onSubmit={(e) => handleSubmit(e, depot, article)} style={{ marginBottom: '1rem' }}>
                <div><strong>Article:</strong> {article.nomArticle} ({article.codeArticle})</div>
                <div>Quantité stockée: {article.quantiteStockee}</div>

                <label>
                  Stock Max:
                  <input
                    type="number"
                    value={article.stockMax || ''}
                    onChange={(e) => handleInputChange(e, depotIndex, articleIndex, 'stockMax')}
                    required
                  />
                </label>
                {' '}
                <label>
                  Stock Alerte:
                  <input
                    type="number"
                    value={article.stockAlert || ''}
                    onChange={(e) => handleInputChange(e, depotIndex, articleIndex, 'stockAlert')}
                    required
                  />
                </label>
                {' '}
                <button type="submit">Enregistrer</button>
              </form>
            ))
          ) : (
            <p>Aucun article dans ce dépôt.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DepotsAvecArticles;
