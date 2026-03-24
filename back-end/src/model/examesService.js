const { banco } = require('./database');

async function listarExames(usuarioId, nutricionistaId) {
  const [rows] = await banco.query(`
    SELECT * FROM exames 
    WHERE usuario_id = ? AND nutricionista_id = ?
    ORDER BY criado_em DESC
  `, [usuarioId, nutricionistaId]);
  return rows;
}

async function salvarExame(dados) {
  const { usuario_id, nutricionista_id, nome, valor, unidade, ref_min, ref_max, categoria, data, obs } = dados;
  const [result] = await banco.query(`
    INSERT INTO exames (usuario_id, nutricionista_id, nome, valor, unidade, ref_min, ref_max, categoria, data, obs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [usuario_id, nutricionista_id, nome, valor, unidade, ref_min, ref_max, categoria, data, obs]);
  return result.insertId;
}

async function atualizarExame(id, dados) {
  const { nome, valor, unidade, ref_min, ref_max, categoria, data, obs } = dados;
  await banco.query(`
    UPDATE exames SET nome=?, valor=?, unidade=?, ref_min=?, ref_max=?, categoria=?, data=?, obs=?
    WHERE id=?
  `, [nome, valor, unidade, ref_min, ref_max, categoria, data, obs, id]);
}

async function deletarExame(id) {
  await banco.query(`DELETE FROM exames WHERE id = ?`, [id]);
}

module.exports = { listarExames, salvarExame, atualizarExame, deletarExame };