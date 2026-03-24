const express = require('express');
const router = express.Router();
const planosService = require('../model/planosService');

router.post('/', async (req, res) => {
  const { usuario_id, plano, preco } = req.body;
  if (!usuario_id || !plano) return res.status(400).json({ erro: "Dados incompletos" });
  try {
    await planosService.salvarPlano(usuario_id, plano, preco);
    res.json({ message: "Plano salvo!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.get('/:usuario_id', async (req, res) => {
  try {
    const plano = await planosService.buscarPlanoUsuario(req.params.usuario_id);
    if (!plano) return res.status(404).json({ erro: "Nenhum plano encontrado" });
    res.json(plano);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.put('/:usuario_id/confirmar', async (req, res) => {
  try {
    await planosService.confirmarPlano(req.params.usuario_id);
    res.json({ message: "Plano confirmado!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;