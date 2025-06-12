const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.get('/', (req, res) => {
  const pythonPath = 'python3';  // ou 'python' selon ton OS
  const scriptPath = path.join(__dirname, '../python_scripts/predict.py');

  const python = spawn(pythonPath, [scriptPath]);

  let data = '';
  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on('data', (err) => {
    console.error('Erreur Python :', err.toString());
  });

  python.on('close', (code) => {
    if (code === 0) {
      try {
        const result = JSON.parse(data);
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: 'Erreur lors du parsing du JSON' });
      }
    } else {
      res.status(500).json({ error: 'Le script Python a échoué' });
    }
  });
});

module.exports = router;
