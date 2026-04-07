// back-end/src/model/salvarCardapioService.js
const { banco } = require("./database");
 
module.exports = {
  // ==========================================
  // Busca cardápio pelo hash_respostas
  // ==========================================
  async buscarPorHash(hash_respostas) {
    try {
      const [rows] = await banco.query(
        "SELECT * FROM cardapio WHERE hash_respostas = ? LIMIT 1",
        [hash_respostas]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Erro ao buscar cardápio por hash:", error);
      throw error;
    }
  },
 
  // ==========================================
  // Salva um novo cardápio COM respostas_id e nome_cardapio
  // ==========================================
  async salvarCardapio(usuario_id, respostas_id, hash_respostas, cardapio_texto, nome_cardapio) {
    try {
      const nomeCardapioFinal = nome_cardapio || "Meu Plano Nutricional";
 
      const [result] = await banco.query(
        "INSERT INTO cardapio (usuario_id, respostas_id, hash_respostas, cardapio_texto, nome_cardapio) VALUES (?, ?, ?, ?, ?)",
        [usuario_id, respostas_id, hash_respostas, cardapio_texto, nomeCardapioFinal]
      );
 
      return {
        id: result.insertId,
        usuario_id,
        respostas_id,
        hash_respostas,
        cardapio_texto,
        nome_cardapio: nomeCardapioFinal
      };
    } catch (error) {
      console.error("Erro ao salvar cardápio:", error);
      throw error;
    }
  },

  
 
  // ==========================================
  // Busca todos os cardápios de um usuário (mais recentes primeiro)
  // ==========================================
  async buscarPorUsuarioId(usuario_id) {
    try {
      const [rows] = await banco.query(
        `SELECT 
          id, 
          usuario_id, 
          respostas_id, 
          nome_cardapio, 
          cardapio_texto, 
          criado_em 
        FROM cardapio 
        WHERE usuario_id = ? 
        ORDER BY id DESC`,
        [usuario_id]
      );
      return rows;
    } catch (error) {
      console.error("Erro ao buscar cardápios por usuário:", error);
      throw error;
    }
  },

  // ==========================================
// Atualiza cardápio existente (substituição)
// ==========================================
async atualizarCardapio(id, cardapio_texto) {
  try {
    await banco.query(
      "UPDATE cardapio SET cardapio_texto = ? WHERE id = ?",
      [cardapio_texto, id]
    );

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar cardápio:", error);
    throw error;
  }
}
};