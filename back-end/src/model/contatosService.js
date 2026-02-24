const { banco } = require("./database");
const { enviarEmailResposta } = require('./emailService');




const GetAll = async (request, response) => {
    try {
        const nutricionistaId = request.query.nutricionista;

        let query = 'SELECT id, nome, email, mensagem, telefone, remetente, resposta, respondido, arquivado FROM contatos';
        let values = [];

        if (nutricionistaId) {
            query += ' WHERE remetente = ?';
            values.push(nutricionistaId);
        }

        const [data] = await banco.query(query, values);
        response.status(200).send(data);
    } catch (error) {
        console.error("Erro ao buscar contatos:", error.message);
        response.status(500).send({ "message": "Falha ao buscar contatos!" });
    }
};



const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query('SELECT * FROM contatos WHERE id = ?', [id]);
        if (data[0].length === 0) {
            return response.status(404).send({"message": "Contato não encontrado."});
        }
        response.status(200).send(data[0][0]);
    } catch (error) {
        console.error("Erro ao buscar contato:", error.message);
        response.status(500).send({"message": "Falha ao executar a ação!"});
    }
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        await banco.query('DELETE FROM contatos WHERE id = ?', [id]);
        response.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar contato:", error.message);
        response.status(500).send({"message": "Falha ao executar a ação!"});
    }
};

const Put = async (request, response) => {
    try {
        const id = request.params.id;
        const payload = request.body;
        const queryText = 'UPDATE contatos SET nome = ?, email = ?, mensagem = ?, telefone = ?, remetente = ? WHERE id = ?';
        const values = [payload.nome, payload.email, payload.mensagem, payload.telefone, payload.remetente, id];
        await banco.query(queryText, values);
        response.status(200).send({ message: "Contato atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar contato:", error.message);
        response.status(500).send({"message": "Falha ao executar a ação!"});
    }
};

const Post = async (request, response) => {
  try {
    const payload = request.body;

    // Insere contato no banco
    const queryText = 'INSERT INTO contatos (nome, email, mensagem, telefone, remetente, arquivado) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [payload.nome, payload.email, payload.mensagem, payload.telefone, payload.remetente, false];
    await banco.query(queryText, values);

    // Se for nutricionista (ou seja, remetente é um número/id), enviar notificação
    if(payload.remetente !== 'dev') {
      const [result] = await banco.query('SELECT email FROM nutricionistas WHERE id = ?', [payload.remetente]);

      if(result.length > 0) {
        const emailNutricionista = result[0].email;

        // Exemplo de chamada para enviar email - descomente e implemente o serviço
        // await enviarEmailNotificacao(emailNutricionista, payload);

        console.log(`Notificação de contato enviada para: ${emailNutricionista}`);
      } else {
        console.log('ID do nutricionista não encontrado para notificação.');
      }
    } else {
      console.log('Mensagem destinada aos desenvolvedores, nenhuma notificação de nutricionista será enviada.');
    }

    response.status(201).send({ message: "Mensagem cadastrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar mensagem:", error.message);
    response.status(500).send({ message: "Falha ao executar a ação!" });
  }
};


const Responder = async (request, response) => {
    try {
        const { id } = request.params;
        const { resposta } = request.body;

        if (!resposta) {
            return response.status(400).send({ message: "O texto da resposta é obrigatório." });
        }
        const [rows] = await banco.query('SELECT * FROM contatos WHERE id = ?', [id]);
        const contatoOriginal = rows[0];
        if (!contatoOriginal) {
            return response.status(404).send({ message: "Contato original não encontrado." });
        }
        await enviarEmailResposta(contatoOriginal.email, resposta, contatoOriginal);
        await banco.query(
            'UPDATE contatos SET resposta = ?, respondido = ?, arquivado = ? WHERE id = ?',
            [resposta, true, false, id] 
        );

        response.status(200).send({ message: `Resposta enviada e salva para ${contatoOriginal.email}!` });

    } catch (error) {
        console.error("Falha ao enviar resposta:", error.message);
        response.status(500).send({ message: "Ocorreu um erro no servidor ao tentar enviar a resposta." });
    }
};


const ArquivarContato = async (request, response) => {
    try {
        const { id } = request.params;
        const [rows] = await banco.query('SELECT respondido FROM contatos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return response.status(404).send({ message: "Contato não encontrado." });
        }
        if (!rows[0].respondido) {
            return response.status(400).send({ message: "Mensagem deve ser respondida antes de arquivar." });
        }
        await banco.query('UPDATE contatos SET arquivado = ? WHERE id = ?', [true, id]);
        response.status(200).send({ message: "Mensagem arquivada com sucesso!" });
    } catch (error) {
        console.error("Erro ao arquivar contato:", error.message);
        response.status(500).send({ message: "Falha ao arquivar mensagem!" });
    }
};

const DesarquivarContato = async (request, response) => {
    try {
        const { id } = request.params;
        await banco.query('UPDATE contatos SET arquivado = ? WHERE id = ?', [false, id]);
        response.status(200).send({ message: "Mensagem desarquivada com sucesso!" });
    } catch (error) {
        console.error("Erro ao desarquivar contato:", error.message);
        response.status(500).send({ message: "Falha ao desarquivar mensagem!" });
    }
};


const ExcluirTodas = async (request, response) => {
    try {
        await banco.query('DELETE FROM contatos');
        response.status(204).send();
    } catch (error) {
        console.error("Erro ao excluir todas as mensagens:", error.message);
        response.status(500).send({"message": "Falha ao excluir todas as mensagens!"});
    }
};


module.exports = {
    GetAll,
    GetById,
    Erase,
    Post,
    Put,
    Responder,
    ArquivarContato, 
    DesarquivarContato, 
    ExcluirTodas
};