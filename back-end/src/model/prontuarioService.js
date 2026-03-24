const { banco } = require('./database');

async function buscarProntuario(usuarioId, nutricionistaId) {
  const [rows] = await banco.query(`
    SELECT * FROM prontuarios 
    WHERE usuario_id = ? AND nutricionista_id = ?
    LIMIT 1
  `, [usuarioId, nutricionistaId]);
  return rows[0] || null;
}

async function salvarProntuario(dados) {
  const existing = await buscarProntuario(dados.usuario_id, dados.nutricionista_id);

  if (existing) {
    await banco.query(`
      UPDATE prontuarios SET
        nome=?, data_nascimento=?, sexo=?, profissao=?, telefone=?,
        motivo_consulta=?, historico_doencas=?, medicamentos=?, suplementos=?,
        alergias=?, alimentos_gosta=?, alimentos_naogosta=?, atividade_fisica=?,
        obs_clinicas=?, peso=?, altura=?, peso_meta=?, objetivo=?, conduta=?,
        pac_situacao=?, pac_exames_resumo=?, pac_passos=?
      WHERE usuario_id=? AND nutricionista_id=?
    `, [
      dados.nome, dados.data_nascimento, dados.sexo, dados.profissao, dados.telefone,
      dados.motivo_consulta, dados.historico_doencas, dados.medicamentos, dados.suplementos,
      dados.alergias, dados.alimentos_gosta, dados.alimentos_naogosta, dados.atividade_fisica,
      dados.obs_clinicas, dados.peso, dados.altura, dados.peso_meta, dados.objetivo, dados.conduta,
      dados.pac_situacao, dados.pac_exames_resumo, dados.pac_passos,
      dados.usuario_id, dados.nutricionista_id
    ]);
  } else {
    await banco.query(`
      INSERT INTO prontuarios 
      (usuario_id, nutricionista_id, nome, data_nascimento, sexo, profissao, telefone,
      motivo_consulta, historico_doencas, medicamentos, suplementos, alergias,
      alimentos_gosta, alimentos_naogosta, atividade_fisica, obs_clinicas,
      peso, altura, peso_meta, objetivo, conduta, pac_situacao, pac_exames_resumo, pac_passos)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `, [
      dados.usuario_id, dados.nutricionista_id, dados.nome, dados.data_nascimento,
      dados.sexo, dados.profissao, dados.telefone, dados.motivo_consulta,
      dados.historico_doencas, dados.medicamentos, dados.suplementos, dados.alergias,
      dados.alimentos_gosta, dados.alimentos_naogosta, dados.atividade_fisica,
      dados.obs_clinicas, dados.peso, dados.altura, dados.peso_meta,
      dados.objetivo, dados.conduta, dados.pac_situacao, dados.pac_exames_resumo, dados.pac_passos
    ]);
  }
}

async function enviarResumoParaPaciente(dados) {
  await banco.query(`
    INSERT INTO prontuarios 
    (usuario_id, nutricionista_id, nome, data_nascimento, sexo, profissao, telefone,
    motivo_consulta, historico_doencas, medicamentos, suplementos, alergias,
    alimentos_gosta, alimentos_naogosta, atividade_fisica, obs_clinicas,
    peso, altura, peso_meta, objetivo, conduta, pac_situacao, pac_exames_resumo, pac_passos)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `, [
    dados.usuario_id, dados.nutricionista_id, dados.nome, dados.data_nascimento,
    dados.sexo, dados.profissao, dados.telefone, dados.motivo_consulta,
    dados.historico_doencas, dados.medicamentos, dados.suplementos, dados.alergias,
    dados.alimentos_gosta, dados.alimentos_naogosta, dados.atividade_fisica,
    dados.obs_clinicas, dados.peso, dados.altura, dados.peso_meta,
    dados.objetivo, dados.conduta, dados.pac_situacao, dados.pac_exames_resumo, dados.pac_passos
  ]);
}

module.exports = { buscarProntuario, salvarProntuario, enviarResumoParaPaciente };

