// back-end/src/model/salvarCardapioService.js
const {banco} = require("./database");

module.exports = {
    // Verifica se já existe um cardápio com o mesmo hash
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

    // Salva um novo cardápio COM respostas_id
    async salvarCardapio(usuario_id, respostas_id, hash_respostas, cardapio_texto) {
        try {
            const [result] = await banco.query(
                "INSERT INTO cardapio (usuario_id, respostas_id, hash_respostas, cardapio_texto) VALUES (?, ?, ?, ?)",
                [usuario_id, respostas_id, hash_respostas, cardapio_texto]
            );

            return {
                id: result.insertId,
                usuario_id,
                respostas_id,
                hash_respostas,
                cardapio_texto
            };

        } catch (error) {
            console.error("Erro ao salvar cardápio:", error);
            throw error;
        }
    }
};