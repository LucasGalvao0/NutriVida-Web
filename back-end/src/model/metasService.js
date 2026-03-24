const { banco } = require('./database');

async function listarMetasPaciente(usuarioId) {
  const [rows] = await banco.query(`
    SELECT * FROM metas 
    WHERE usuario_id = ? 
    ORDER BY criado_em DESC
  `, [usuarioId]);
  return rows;
}

async function salvarMeta(dados) {
  const { usuario_id, nutricionista_id, tipo, valor_atual, valor_meta, unidade, prazo, observacao } = dados;
  const [result] = await banco.query(`
    INSERT INTO metas (usuario_id, nutricionista_id, tipo, valor_atual, valor_meta, unidade, prazo, observacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [usuario_id, nutricionista_id, tipo, valor_atual, valor_meta, unidade, prazo, observacao]);
  return result.insertId;
}

async function atualizarProgresso(id, valor_atual) {
  await banco.query(`UPDATE metas SET valor_atual = ? WHERE id = ?`, [valor_atual, id]);
}

async function deletarMeta(id) {
  await banco.query(`DELETE FROM metas WHERE id = ?`, [id]);
}

async function contarMetasAtingidas(nutricionistaId) {
  const [rows] = await banco.query(`
    SELECT COUNT(*) AS total FROM metas
    WHERE nutricionista_id = ?
    AND valor_atual >= valor_meta
  `, [nutricionistaId]);
  return rows[0].total;
}

async function contarTotalMetas(nutricionistaId) {
  const [rows] = await banco.query(`
    SELECT COUNT(*) AS total FROM metas
    WHERE nutricionista_id = ?
  `, [nutricionistaId]);
  return rows[0].total;
}

module.exports = { listarMetasPaciente, salvarMeta, atualizarProgresso, deletarMeta, contarMetasAtingidas, contarTotalMetas };
