const { banco } = require("./database");
 
async function listarPacientes() {
    const sql = `
       SELECT 
    p.id AS paciente_id,
    u.id AS usuario_id,
    u.nome_usuario AS paciente_nome,
    u.email AS paciente_email,
    p.telefone AS paciente_telefone,
    p.idade AS paciente_idade,
    p.peso AS paciente_peso,
    p.altura AS paciente_altura,
    n.id AS nutricionista_id,
    n.nome AS nutricionista_nome,
    n.especialidade AS nutricionista_especialidade
FROM pacientes p
JOIN usuarios u ON p.usuario_id = u.id
JOIN nutricionistas n ON p.nutricionista_id = n.id
    `;
    const [rows] = await banco.query(sql);
    return rows;
}
 
async function listarPacientesPorNutricionista(nutricionistaId) {
  const sql = `
    SELECT 
        p.id AS paciente_id,
        u.id AS usuario_id,
        u.nome_usuario AS paciente_nome,
        u.email AS paciente_email,
        p.telefone AS paciente_telefone,
        p.idade AS paciente_idade,
        p.peso AS paciente_peso,
        p.altura AS paciente_altura,
        n.id AS nutricionista_id,
        n.nome AS nutricionista_nome,
        n.especialidade AS nutricionista_especialidade
    FROM pacientes p
    JOIN usuarios u ON p.usuario_id = u.id
    JOIN nutricionistas n ON p.nutricionista_id = n.id
    WHERE n.id = ?;
  `;
 
  const [rows] = await banco.query(sql, [nutricionistaId]);
  return rows;
}
 
async function contarPacientesPorNutricionista(nutricionistaId) {
  const sql = `
    SELECT COUNT(*) AS total
    FROM pacientes
    WHERE nutricionista_id = ?
  `;
 
  const [rows] = await banco.query(sql, [nutricionistaId]);
  return rows[0];
}
 
module.exports = { listarPacientes, listarPacientesPorNutricionista, contarPacientesPorNutricionista };