const { banco } = require('./database');

async function salvarPlano(usuario_id, plano, preco, status = 'pendente') {
  await banco.query(`
    INSERT INTO planos_usuarios (usuario_id, plano, preco, status)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE plano = VALUES(plano), preco = VALUES(preco), status = VALUES(status), criado_em = NOW()
  `, [usuario_id, plano, preco, status]);
}

async function confirmarPlano(usuario_id) {
  await banco.query(`
    UPDATE planos_usuarios SET status = 'ativo'
    WHERE usuario_id = ? ORDER BY criado_em DESC LIMIT 1
  `, [usuario_id]);
}



async function buscarPlanoUsuario(usuario_id) {
  const [rows] = await banco.query(`
    SELECT * FROM planos_usuarios 
    WHERE usuario_id = ? 
    ORDER BY criado_em DESC 
    LIMIT 1
  `, [usuario_id]);
  return rows[0] || null;
}

module.exports = { salvarPlano, buscarPlanoUsuario, confirmarPlano };