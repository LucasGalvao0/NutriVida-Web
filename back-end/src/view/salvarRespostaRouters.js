const express = require("express");
const router = express.Router();
const salvarRespostaService = require("../model/salvarRespostaService");

// ===============================
// ⬇ SALVAR respostas do formulário
// ===============================
router.post("/", async (req, res) => {
  try {
    console.log("📥 JSON recebido:", req.body);

    // Validação mínima (evita erro de SQL)
    if (!req.body.usuario_id) {
      return res.status(400).json({
        sucesso: false,
        erro: "usuario_id é obrigatório."
      });
    }

    const respostas_id = await salvarRespostaService.salvarRespostas(req.body);

    res.status(200).json({
      sucesso: true,
      mensagem: "Respostas salvas com sucesso!",
      respostas_id
    });

  } catch (error) {
    console.error("❌ Erro ao salvar resposta:", error);
    res.status(500).json({
      sucesso: false,
      erro: "Erro interno ao salvar resposta."
    });
  }
});

// ========================================
// ⬇ LISTAR todas respostas de um usuário
// ========================================
router.get("/usuario/:usuario_id", async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id;

    const respostas = await salvarRespostaService.listarDoUsuario(usuario_id);

    res.status(200).json({
      sucesso: true,
      total: respostas.length,
      respostas
    });

  } catch (error) {
    console.error("❌ Erro ao listar respostas:", error);
    res.status(500).json({ erro: "Erro interno ao listar respostas." });
  }
});

// ===============================
// ⬇ BUSCAR respostas por ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const resposta = await salvarRespostaService.buscarPorId(id);

    if (!resposta) {
      return res.status(404).json({
        sucesso: false,
        erro: "Resposta não encontrada."
      });
    }

    res.status(200).json({
      sucesso: true,
      resposta
    });

  } catch (error) {
    console.error("❌ Erro ao buscar resposta:", error);
    res.status(500).json({ erro: "Erro interno ao buscar resposta." });
  }
});

module.exports = router;
