const express = require('express');
const router = express.Router();
const metasService = require('../model/metasService');

router.get('/paciente/:usuarioId', async (req, res) => {
  try {
    const metas = await metasService.listarMetasPaciente(req.params.usuarioId);
    res.json(metas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = await metasService.salvarMeta(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/progresso', async (req, res) => {
  try {
    await metasService.atualizarProgresso(req.params.id, req.body.valor_atual);
    res.json({ message: 'Progresso atualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await metasService.deletarMeta(req.params.id);
    res.json({ message: 'Meta removida' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/nutricionista/:nutricionistaId/atingidas', async (req, res) => {
  try {
    const total = await metasService.contarMetasAtingidas(req.params.nutricionistaId);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/nutricionista/:nutricionistaId/total', async (req, res) => {
  try {
    const total = await metasService.contarTotalMetas(req.params.nutricionistaId);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;