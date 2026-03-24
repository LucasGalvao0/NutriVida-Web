const express = require('express');
const router = express.Router();
const examesService = require('../model/examesService');

router.get('/paciente/:usuarioId/:nutricionistaId', async (req, res) => {
  try {
    const exames = await examesService.listarExames(req.params.usuarioId, req.params.nutricionistaId);
    res.json(exames);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = await examesService.salvarExame(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await examesService.atualizarExame(req.params.id, req.body);
    res.json({ message: 'Exame atualizado' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await examesService.deletarExame(req.params.id);
    res.json({ message: 'Exame removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;