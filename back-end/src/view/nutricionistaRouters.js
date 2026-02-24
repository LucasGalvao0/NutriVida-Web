const express = require('express');
const router = express.Router();
const nutricionistasService = require('../model/nutricionistaService');

router.get('/usuario-logado', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const usuario = await nutricionistasService.buscarNutricionistaPorId(req.user.id);
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const nutricionista = await nutricionistasService.buscarNutricionistaPorId(id);

    if (!nutricionista) {
      return res.status(404).json({ error: 'Nutricionista não encontrado' });
    }

    res.json(nutricionista);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nutricionistaData = req.body;
    const novoNutricionista = await nutricionistasService.cadastrarNutricionista(nutricionistaData);
    res.status(201).json(novoNutricionista);
  } catch (error) {
    console.error("Erro ao cadastrar nutricionista:", error);
    res.status(500).json({ error: error.message || "Erro ao cadastrar nutricionista" });
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const dadosAtualizados = req.body;

  try {
    const atualizado = await nutricionistasService.atualizarNutricionista(id, dadosAtualizados);

    if (!atualizado) {
      return res.status(404).json({ error: 'Nutricionista não encontrado para atualizar' });
    }

    res.json({ message: 'Nutricionista atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar nutricionista:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const lista = await nutricionistasService.buscarTodosNutricionistas();
    res.json(lista);
  } catch (error) {
    console.error('Erro ao buscar nutricionistas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});







module.exports = router;
