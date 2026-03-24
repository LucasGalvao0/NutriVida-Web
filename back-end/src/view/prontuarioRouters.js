const express = require('express');
const router = express.Router();
const prontuarioService = require('../model/prontuarioService');

// 👇 PRIMEIRO as rotas específicas
router.get('/:usuarioId/dados-completos', async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [paciente] = await require('../model/database').banco.query(`
      SELECT u.nome_usuario, u.email, p.telefone, p.idade, p.peso, p.altura
      FROM pacientes p
      JOIN usuarios u ON u.id = p.usuario_id
      WHERE p.usuario_id = ?
      LIMIT 1
    `, [usuarioId]);

    const [formulario] = await require('../model/database').banco.query(`
      SELECT * FROM respostas_formulario 
      WHERE usuario_id = ? 
      ORDER BY id DESC 
      LIMIT 1
    `, [usuarioId]);

    res.json({
      paciente: paciente[0] || {},
      formulario: formulario[0] || {}
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.get('/paciente/:usuarioId', async (req, res) => {
  try {
    const [rows] = await require('../model/database').banco.query(`
      SELECT p.*, n.nome AS nutricionista_nome, n.crn AS nutricionista_crn
      FROM prontuarios p
      JOIN nutricionistas n ON n.id = p.nutricionista_id
      WHERE p.usuario_id = ?
      ORDER BY p.atualizado_em DESC
      LIMIT 1
    `, [req.params.usuarioId]);
    if (!rows[0]) return res.status(404).json({ erro: 'Não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.get('/:usuarioId/:nutricionistaId', async (req, res) => {
  try {
    const dados = await prontuarioService.buscarProntuario(req.params.usuarioId, req.params.nutricionistaId);
    if (!dados) return res.status(404).json({ erro: 'Não encontrado' });
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await prontuarioService.salvarProntuario(req.body);
    res.json({ message: 'Prontuário salvo!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.put('/:usuarioId/peso', async (req, res) => {
  const { usuarioId } = req.params;
  const { peso, altura } = req.body;
  try {
    await require('../model/database').banco.query(
      `UPDATE pacientes SET peso = ?, altura = ? WHERE usuario_id = ?`,
      [peso, altura, usuarioId]
    );
    res.json({ message: 'Peso atualizado' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.post('/enviar', async (req, res) => {
  try {
    await prontuarioService.enviarResumoParaPaciente(req.body);
    res.json({ message: 'Resumo enviado!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para listar histórico de resumos do paciente
router.get('/paciente/:usuarioId/historico', async (req, res) => {
  try {
    const [rows] = await require('../model/database').banco.query(`
      SELECT p.id, p.pac_situacao, p.pac_exames_resumo, p.pac_passos, 
             p.atualizado_em, n.nome AS nutricionista_nome, n.crn AS nutricionista_crn
      FROM prontuarios p
      JOIN nutricionistas n ON n.id = p.nutricionista_id
      WHERE p.usuario_id = ? 
        AND (p.pac_situacao IS NOT NULL OR p.pac_exames_resumo IS NOT NULL OR p.pac_passos IS NOT NULL)
        AND p.pac_situacao != ''
      ORDER BY p.atualizado_em DESC
    `, [req.params.usuarioId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;