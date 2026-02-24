const { banco } = require("./database");

async function cadastrarNutricionista(data) {
  const conn = await banco.getConnection();

  try {
    await conn.beginTransaction();

    // Inserir nutricionista sem consultorio_id direto
    const queryNutricionista = `
      INSERT INTO nutricionistas 
      (nome, crn, especialidade, email, telefone, senha) 
      VALUES (?, ?, ?, ?, ?, ?)`;
    const [resultNutricionista] = await conn.query(queryNutricionista, [
      data.nome,       // veja que no frontend o campo é nome_usuario
      data.crn,
      data.especialidade,
      data.email,
      data.telefone,
      data.senha
    ]);

    const nutricionistaId = resultNutricionista.insertId;

    // Inserir serviços vinculados
    const queryServico = `
      INSERT INTO nutricionistas_servicos (nutricionista_id, servico_id, preco) 
      VALUES (?, ?, ?)`;
    for (const servico of data.servicos) {
      await conn.query(queryServico, [nutricionistaId, servico.id_servico, servico.preco]);
    }

    // Inserir consultórios vinculados (se existir data.consultorios como array de ids)
    if (Array.isArray(data.consultorios) && data.consultorios.length > 0) {
      const queryConsultorio = `
        INSERT INTO nutricionistas_consultorios (nutricionista_id, consultorio_id)
        VALUES (?, ?)`;
      for (const consultorioId of data.consultorios) {
        await conn.query(queryConsultorio, [nutricionistaId, consultorioId]);
      }
    }

    await conn.commit();

    return { id: nutricionistaId };

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

async function buscarNutricionistaPorId(id) {
  const conn = await banco.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM nutricionistas WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } finally {
    conn.release();
  }
}


async function atualizarNutricionista(id, dadosAtualizados) {
  const conn = await banco.getConnection();

  try {
    // Campos que podem ser atualizados
    const camposPossiveis = ['nome', 'crn', 'especialidade', 'email', 'telefone', 'senha'];

    // Filtra só os campos enviados e que não sejam undefined/vazios (exceto senha que pode ser omitida)
    const camposParaAtualizar = [];
    const valores = [];

    for (const campo of camposPossiveis) {
      if (campo === 'senha') {
        // Só atualiza senha se veio e não está vazia
        if (dadosAtualizados.senha && dadosAtualizados.senha.trim() !== '') {
          camposParaAtualizar.push(`${campo} = ?`);
          valores.push(dadosAtualizados.senha);
        }
      } else {
        // Para os outros campos, atualiza se estiver definido (mesmo que vazio)
        if (dadosAtualizados[campo] !== undefined) {
          camposParaAtualizar.push(`${campo} = ?`);
          valores.push(dadosAtualizados[campo]);
        }
      }
    }

    if (camposParaAtualizar.length === 0) {
      // Nada para atualizar
      return false;
    }

    const query = `
      UPDATE nutricionistas
      SET ${camposParaAtualizar.join(', ')}
      WHERE id = ?`;

    valores.push(id);

    const [result] = await conn.query(query, valores);

    return result.affectedRows > 0;

  } finally {
    conn.release();
  }
}

async function buscarTodosNutricionistas() {
  const conn = await banco.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM nutricionistas');
    return rows;
  } finally {
    conn.release();
  }
}

async function buscarUsuarioLogado(id) {
  if (!id || isNaN(parseInt(id, 10))) {
    throw new Error('ID inválido para buscar usuário logado');
  }
  return buscarNutricionistaPorId(parseInt(id, 10));
}


module.exports = { cadastrarNutricionista, buscarNutricionistaPorId, atualizarNutricionista, buscarTodosNutricionistas, buscarUsuarioLogado };
