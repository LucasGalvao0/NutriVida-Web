const { banco: pool } = require('./database');

async function criarAgendamento(agendamento) {
  const { usuario_id, consultorio_id, servico_id, data, hora, preco } = agendamento;
  const sql = `
    INSERT INTO agendamentos (usuario_id, consultorio_id, servico_id, data, hora, preco)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [usuario_id, consultorio_id, servico_id, data, hora, preco]);
  return result.insertId;
}


async function listarAgendamentos() {
  const sql = `
    SELECT a.*, c.nome as consultorio_nome, s.nome_servico, s.preco as preco_original
    FROM agendamentos a
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN servicos s ON a.servico_id = s.id
    ORDER BY a.data, a.hora
  `;
  const [rows] = await pool.query(sql);
  return rows;
}

async function listarAgendamentosPorUsuario(usuarioId) {
  const sql = `
    SELECT 
      a.*, 
      c.nome AS consultorio_nome, 
      s.nome_servico, 
      s.preco AS preco_original
    FROM agendamentos a
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN servicos s ON a.servico_id = s.id
    WHERE a.usuario_id = ?
    ORDER BY a.data DESC, a.hora DESC
  `;
  const [rows] = await pool.execute(sql, [usuarioId]);
  return rows;
}

async function deletarAgendamento(id) {
  const sql = 'DELETE FROM agendamentos WHERE id = ?';
  const [result] = await pool.execute(sql, [id]);
  return result;
}

module.exports = {
  criarAgendamento,
  listarAgendamentos,
  listarAgendamentosPorUsuario,
  deletarAgendamento,
};

