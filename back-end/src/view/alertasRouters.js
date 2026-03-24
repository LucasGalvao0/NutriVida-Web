const express = require('express');
const router = express.Router();
const alertasService = require('../model/alertasService');

router.get('/nutricionista/:id', async (req, res) => {
  try {
    const alertas = await alertasService.gerarAlertasNutricionista(req.params.id);
    res.json(alertas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;