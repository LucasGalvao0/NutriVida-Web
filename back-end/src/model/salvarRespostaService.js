const { banco } = require("./database");

async function salvarRespostas(dados) {
  try {
    const {
      usuario_id,
      name,
      age,
      imc,
      height,
      weight,
      gender,
      objective,
      level,
      alergia,
      trabalho,
      alimentosFavoritos,
      esporte,
      dietaAtual,
      rotina,
      tempoPreparo
    } = dados;

    const [result] = await banco.query(
      `INSERT INTO respostas_formulario 
      (usuario_id, name, age, imc, height, weight, gender, objective, level, alergia, trabalho, alimentosFavoritos, esporte, dietaAtual, rotina, tempoPreparo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario_id,
        name,
        age,
        imc,
        height,
        weight,
        gender,
        objective,
        level,
        alergia,
        trabalho,
        JSON.stringify(alimentosFavoritos), // salva array corretamente como JSON
        esporte,
        dietaAtual,
        rotina,
        tempoPreparo
      ]
    );

    return result.insertId;

  } catch (error) {
    console.error("Erro ao salvar respostas:", error);
    throw error;
  }
}

async function buscarPorId(id) {
  try {
    const [rows] = await banco.query(
      "SELECT * FROM respostas_formulario WHERE id = ?",
      [id]
    );

    return rows[0] || null;

  } catch (error) {
    console.error("Erro ao buscar resposta:", error);
    throw error;
  }
}

async function listarDoUsuario(usuario_id) {
  try {
    const [rows] = await banco.query(
      "SELECT * FROM respostas_formulario WHERE usuario_id = ? ORDER BY id DESC",
      [usuario_id]
    );

    return rows;

  } catch (error) {
    console.error("Erro ao listar respostas:", error);
    throw error;
  }
}

module.exports = {
  salvarRespostas,
  buscarPorId,
  listarDoUsuario
};
