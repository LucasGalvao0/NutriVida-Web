const express = require("express");
const router = express.Router();
const pacientesService = require("../model/pacientesService");


// Rota para listar todos os pacientes
router.get("/pacientes", async (req, res) => {
    try {
        const pacientes = await pacientesService.listarPacientes();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para listar pacientes de um nutricionista específico
router.get("/:nutricionistaId/pacientes", async (req, res) => {
    const { nutricionistaId } = req.params;
    try {
        const pacientes = await pacientesService.listarPacientesPorNutricionista(nutricionistaId);
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/:nutricionistaId/total", async (req, res) => {
  const { nutricionistaId } = req.params;

  try {
    const total = await pacientesService.contarPacientesPorNutricionista(nutricionistaId);
    res.json(total);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Rota para buscar o cardápio mais recente de um paciente pelo usuario_id
router.get("/paciente/:usuarioId/cardapio", async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [rows] = await require("../model/database").banco.query(
      `SELECT id, nome_cardapio, cardapio_texto, criado_em 
       FROM cardapio 
       WHERE usuario_id = ? 
       ORDER BY id DESC`,
      [usuarioId]
    );
    if (!rows.length) return res.status(404).json({ erro: "Nenhum cardápio encontrado" });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;