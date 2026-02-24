const { banco: pool } = require("../model/database");

// Lista todos os consultórios (com tratamento de campos opcionais)
async function listarConsultorios() {
  const [rows] = await pool.query("SELECT * FROM consultorios");
  return rows.map(c => ({
    id: c.id,
    nome: c.nome,
    servico: c.servico || "",
    endereco: c.endereco,
    preco: parseFloat(c.preco) || 0,
    descricao: c.descricao || "",
    imagem: c.imagem || "",
    telefone: c.telefone || "Telefone não informado",
  }));
}

// Adiciona consultório com até 6 serviços relacionados
async function adicionarConsultorioCompleto({ nome, endereco, telefone, servicos, horarios_funcionamento }) {
  // Validações
  if (!nome || !endereco || !telefone) {
    throw new Error("Os campos nome, endereço e telefone são obrigatórios.");
  }
  if (!horarios_funcionamento || typeof horarios_funcionamento !== "object") {
    throw new Error("Horários de funcionamento são obrigatórios e devem ser um objeto.");
  }
  if (!Array.isArray(servicos) || servicos.length === 0) {
    throw new Error("Deve ter pelo menos um serviço.");
  }
  if (servicos.length > 6) {
    throw new Error("Limite máximo de 6 serviços.");
  }

  for (const s of servicos) {
    if (!s.nomeServico || typeof s.preco !== "number" || isNaN(s.preco) || s.preco < 0 || !s.descricaoServico) {
      throw new Error("Cada serviço deve conter 'nomeServico', 'preco' válido (>= 0) e 'descricaoServico'.");
    }
  }

  const {
    segunda = "Fechado",
    terca = "Fechado",
    quarta = "Fechado",
    quinta = "Fechado",
    sexta = "Fechado",
    sabado = "Fechado",
    domingo = "Fechado"
  } = horarios_funcionamento;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Inserir consultório com os horários desestruturados
    const [resConsultorio] = await conn.query(`
      INSERT INTO consultorios (nome, endereco, telefone, segunda, terca, quarta, quinta, sexta, sabado, domingo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [nome, endereco, telefone, segunda, terca, quarta, quinta, sexta, sabado, domingo]);

    const consultorioId = resConsultorio.insertId;

    // Inserir serviços e vincular ao consultório
    for (const s of servicos) {
      const [resServico] = await conn.query(`
        INSERT INTO servicos (nome_servico, preco, descricao)
        VALUES (?, ?, ?)
      `, [s.nomeServico, s.preco, s.descricaoServico]);

      const servicoId = resServico.insertId;

      await conn.query(`
        INSERT INTO consultorios_servicos (consultorio_id, servico_id)
        VALUES (?, ?)
      `, [consultorioId, servicoId]);
    }

    await conn.commit();
    return { id: consultorioId };

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

module.exports = {
  listarConsultorios,
  adicionarConsultorioCompleto
};
