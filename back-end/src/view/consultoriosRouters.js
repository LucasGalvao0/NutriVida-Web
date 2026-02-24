const express = require("express");
const router = express.Router();
const { banco } = require("../model/database");
const { adicionarConsultorioCompleto } = require("../model/consultoriosService");

// GET /consultorios - Lista todos os consultórios (resumo)
router.get("/", async (req, res) => {
  try {
    const [consultoriosRaw] = await banco.query("SELECT * FROM consultorios");

    const consultorios = consultoriosRaw.map(c => ({
      id: c.id,
      nome: c.nome,
      servico: c.servico || "",
      endereco: c.endereco,
      preco: parseFloat(c.preco) || 0,
      descricao: c.descricao || "",
      imagem: c.imagem || "",
      telefone: c.telefone || "Telefone não informado"
    }));

    res.json(consultorios);
  } catch (error) {
    console.error("Erro ao buscar consultórios:", error);
    res.status(500).json({ error: "Erro ao buscar consultórios" });
  }
});

// GET /consultorios/:id - Dados detalhados de um consultório (com serviços e horários por dia)
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [consultorioRes] = await banco.query("SELECT * FROM consultorios WHERE id = ?", [id]);
    if (consultorioRes.length === 0) return res.status(404).json({ error: "Consultório não encontrado" });

    const consultorio = consultorioRes[0];

    // Buscar serviços vinculados ao consultório
    const [servicos] = await banco.query(`
      SELECT s.id, s.nome_servico AS nome, s.descricao, s.preco
      FROM servicos s
      JOIN consultorios_servicos cs ON cs.servico_id = s.id
      WHERE cs.consultorio_id = ?
    `, [id]);

    // Estrutura os horários por dia da semana
    const horariosFuncionamento = {
      segunda: consultorio.segunda || "Fechado",
      terca: consultorio.terca || "Fechado",
      quarta: consultorio.quarta || "Fechado",
      quinta: consultorio.quinta || "Fechado",
      sexta: consultorio.sexta || "Fechado",
      sabado: consultorio.sabado || "Fechado",
      domingo: consultorio.domingo || "Fechado"
    };

    res.json({
      consultorio: {
        id: consultorio.id,
        nome: consultorio.nome,
        endereco: consultorio.endereco,
        telefone: consultorio.telefone,
        descricao: consultorio.descricao,
        preco: parseFloat(consultorio.preco) || 0,
        imagem: consultorio.imagem || "",
        dias: consultorio.dias,
        horario: consultorio.horario,
        horarios_funcionamento: horariosFuncionamento
      },
      servicos
    });

  } catch (error) {
    console.error("Erro ao buscar consultório com serviços:", error);
    res.status(500).json({ error: "Erro interno ao buscar consultório com serviços" });
  }
});

// GET /consultorios/:id/servicos - Somente os serviços disponíveis do consultório
router.get("/:id/servicos", async (req, res) => {
  const { id } = req.params;
  try {
    const [servicos] = await banco.query(
      `SELECT s.id, s.nome_servico AS nome, s.descricao, s.preco
       FROM servicos s
       JOIN consultorios_servicos cs ON cs.servico_id = s.id
       WHERE cs.consultorio_id = ? AND s.disponivel = 1`,
      [id]
    );

    res.json(servicos);
  } catch (err) {
    console.error("Erro ao buscar serviços:", err);
    res.status(500).json({ error: "Erro ao buscar serviços" });
  }
});

// POST /consultorios - Adicionar consultório completo
router.post("/", async (req, res) => {
  const { nome, endereco, telefone, servicos, horarios_funcionamento } = req.body;

  if (!nome || !endereco || !telefone) {
    return res.status(400).json({ error: "Campos obrigatórios faltando" });
  }

  if (!horarios_funcionamento || typeof horarios_funcionamento !== 'object') {
    return res.status(400).json({ error: "Horários de funcionamento são obrigatórios" });
  }

  if (!Array.isArray(servicos) || servicos.length === 0) {
    return res.status(400).json({ error: "Deve adicionar pelo menos um serviço" });
  }

  try {
    const result = await adicionarConsultorioCompleto({
      nome,
      endereco,
      telefone,
      servicos,
      horarios_funcionamento
    });

    return res.status(201).json({ message: "Consultório criado com sucesso", id: result.id });
  } catch (error) {
    console.error("Erro ao criar consultório:", error);
    return res.status(500).json({ error: error.message || "Erro ao criar consultório" });
  }
});


module.exports = router;
