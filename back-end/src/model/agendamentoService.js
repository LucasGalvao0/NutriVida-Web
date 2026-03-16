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

async function contarConsultasHojePorNutricionista(nutricionistaId) {

  const sql = `
    SELECT COUNT(*) as total
    FROM agendamentos a
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND DATE(a.data) = CURDATE()
    AND a.status != 'realizada'
  `;

  const [rows] = await pool.execute(sql, [nutricionistaId]);

  return rows[0];
}

async function listarConsultasHojePorNutricionista(nutricionistaId) {

  const sql = `
    SELECT 
      a.hora,
      a.status,
      u.nome_usuario AS paciente_nome,
      s.nome_servico
    FROM agendamentos a
    JOIN usuarios u ON a.usuario_id = u.id
    JOIN servicos s ON a.servico_id = s.id
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND DATE(a.data) = CURDATE()
    AND a.status != 'realizada'
    ORDER BY a.hora ASC
    LIMIT 4
  `;

  const [rows] = await pool.execute(sql, [nutricionistaId]);
  return rows;
}

async function listarConsultasProximos3Dias(nutricionistaId) {

  const sql = `
    SELECT 
      a.data,
      a.hora,
      a.status,
      u.nome_usuario AS paciente_nome,
      s.nome_servico
    FROM agendamentos a
    JOIN usuarios u ON a.usuario_id = u.id
    JOIN servicos s ON a.servico_id = s.id
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND a.data >= CURDATE()
    AND a.data <= CURDATE() + INTERVAL 3 DAY
    AND a.status != 'realizada'
    ORDER BY a.data ASC, a.hora ASC
  `;

  const [rows] = await pool.execute(sql, [nutricionistaId]);
  return rows;
}

async function listarAgendaCompleta(nutricionistaId) {

  const sql = `
    SELECT 
      a.id,
      a.data,
      a.hora,
      a.status,
      u.nome_usuario AS paciente_nome,
      s.nome_servico
    FROM agendamentos a
    JOIN usuarios u ON a.usuario_id = u.id
    JOIN servicos s ON a.servico_id = s.id
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND a.status != 'realizada'
    ORDER BY a.data ASC, a.hora ASC
  `;

  const [rows] = await pool.execute(sql, [nutricionistaId]);

  return rows;
}
async function resumoMesNutricionista(nutricionistaId) {

  const sql = `
    SELECT 
      COUNT(CASE WHEN a.status = 'realizada' THEN 1 END) AS realizadas,
      COUNT(CASE WHEN a.status = 'pendente' THEN 1 END) AS pendentes
    FROM agendamentos a
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND a.consultorio_id = c.id
    AND MONTH(a.data) = MONTH(CURDATE())
    AND YEAR(a.data) = YEAR(CURDATE())
  `;

  const [rows] = await pool.execute(sql, [nutricionistaId]);

  return rows[0];
}

async function listarHistoricoNutricionista(nutricionistaId) {

  const sql = `
    SELECT 
      a.id,
      a.data,
      a.hora,
      a.status,
      u.nome_usuario AS paciente,
      s.nome_servico AS tipo
    FROM agendamentos a
    JOIN usuarios u ON a.usuario_id = u.id
    JOIN servicos s ON a.servico_id = s.id
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND a.status = 'realizada'
    ORDER BY a.data DESC
  `;

  const [rows] = await pool.execute(sql, [nutricionistaId]);

  return rows;
}

async function marcarComoRealizada(id) {

  const sql = `
    UPDATE agendamentos
    SET status = 'realizada'
    WHERE id = ?
  `;

  await pool.execute(sql, [id]);

}

async function contarConsultasRealizadas(nutricionistaId) {

  const sql = `
    SELECT COUNT(*) as total
    FROM agendamentos a
    JOIN consultorios c ON a.consultorio_id = c.id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND a.status = 'realizada'
  `;

  const [rows] = await pool.execute(sql, [nutricionistaId]);

  return rows[0];
}

module.exports = {
  criarAgendamento,
  listarAgendamentos,
  listarAgendamentosPorUsuario,
  deletarAgendamento,
  contarConsultasHojePorNutricionista,
  listarConsultasHojePorNutricionista,
  listarConsultasProximos3Dias,
  listarAgendaCompleta,
  resumoMesNutricionista,
  listarHistoricoNutricionista,
  marcarComoRealizada,
  contarConsultasRealizadas
};

