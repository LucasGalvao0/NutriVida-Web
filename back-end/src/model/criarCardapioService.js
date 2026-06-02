const { GoogleGenerativeAI } = require("@google/generative-ai");

class CreateNutritionService {

  async getModelWithKey(apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);

    const modelos = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-preview-05-20",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro-latest",
    ];

    for (const nomeModelo of modelos) {
      try {
        const model = genAI.getGenerativeModel({ model: nomeModelo });
        await model.generateContent("ok");
        console.log(`Modelo ${nomeModelo} OK com chave`);
        return model;
      } catch (err) {
        console.warn(`Modelo ${nomeModelo} falhou nessa chave`);
      }
    }

    throw new Error("Nenhum modelo disponível com essa chave.");
  }

  async getModelWithFallback() {
    const apiKeys = [
      process.env.API_KEY,
      process.env.API_KEY2,
    ].filter(Boolean);

    for (const key of apiKeys) {
      try {
        console.log("Tentando chave...");
        const model = await this.getModelWithKey(key);
        return model;
      } catch (err) {
        console.warn("Chave falhou, tentando próxima...");
      }
    }

    throw new Error("Nenhuma API key funcionou.");
  }

  // ─── Busca o cardápio com maior similaridade no banco ────────────────────────
  async buscarMelhorSimilar(data) {
    const { banco } = require("./database");
    const { objective, dietaAtual, gender, level, imc, weight, height } = data;

    try {
      const [rows] = await banco.query(`
        SELECT 
          c.id,
          c.cardapio_texto,
          r.objective,
          r.dietaAtual,
          r.gender,
          r.level,
          r.imc,
          r.weight,
          r.height,
          r.alimentosFavoritos
        FROM cardapio c
        INNER JOIN respostas_formulario r ON r.id = c.respostas_id
        ORDER BY c.id DESC
        LIMIT 100
      `);

      if (rows.length === 0) return null;

      function calcularSimilaridade(entrada, registro) {
        let pontos = 0;
        let total = 0;

        total += 3;
        if ((entrada.objective || "").toLowerCase() === (registro.objective || "").toLowerCase()) pontos += 3;

        total += 2;
        if ((entrada.dietaAtual || "").toLowerCase() === (registro.dietaAtual || "").toLowerCase()) pontos += 2;

        total += 1;
        if ((entrada.gender || "").toLowerCase() === (registro.gender || "").toLowerCase()) pontos += 1;

        total += 1;
        if ((entrada.level || "").toLowerCase() === (registro.level || "").toLowerCase()) pontos += 1;

        const imcA = parseFloat(entrada.imc);
        const imcB = parseFloat(registro.imc);
        if (!isNaN(imcA) && !isNaN(imcB)) {
          total += 1;
          if (Math.abs(imcA - imcB) <= 5) pontos += 1;
        }

        const weightA = parseFloat(entrada.weight);
        const weightB = parseFloat(registro.weight);
        if (!isNaN(weightA) && !isNaN(weightB)) {
          total += 1;
          if (Math.abs(weightA - weightB) <= 10) pontos += 1;
        }

        const heightA = parseFloat(entrada.height);
        const heightB = parseFloat(registro.height);
        if (!isNaN(heightA) && !isNaN(heightB)) {
          total += 1;
          if (Math.abs(heightA - heightB) <= 10) pontos += 1;
        }

        return total > 0 ? (pontos / total) * 100 : 0;
      }

      let melhor = null;
      let melhorScore = -1;

      for (const row of rows) {
        const score = calcularSimilaridade(data, row);
        console.log(`📊 Similaridade fallback com cardápio ID ${row.id}: ${score.toFixed(2)}%`);
        if (score > melhorScore) {
          melhorScore = score;
          melhor = row;
        }
      }

      console.log(`✅ Melhor cardápio para fallback: ID ${melhor?.id} com ${melhorScore.toFixed(2)}%`);
      return melhor;

    } catch (err) {
      console.error("Erro ao buscar cardápio similar (fallback):", err.message);
      return null;
    }
  }

  async execute(data) {
    const { name, weight, height, age, gender, objective, level, imc, alergia, alimentosFavoritos, trabalho, esporte, dietaAtual, rotina, tempoPreparo } = data;

    try {
      const model = await this.getModelWithFallback();

      const alergiaTexto = alergia
        ? `a pessoa possui a seguinte alergia: ${alergia}. O cardapio deve ser feito evitando essa alergia e o campo alergia no json deve conter exatamente esse valor: "${alergia}".`
        : `a pessoa nao possui nenhuma alergia e o campo alergia no json deve vir como "nenhuma".`;

      let alimentosFavoritosArray = [];
      if (alimentosFavoritos) {
        if (Array.isArray(alimentosFavoritos)) {
          alimentosFavoritosArray = alimentosFavoritos;
        } else if (typeof alimentosFavoritos === "string") {
          alimentosFavoritosArray = alimentosFavoritos
            .split(",")
            .map((a) => a.trim())
            .filter((a) => a.length > 0);
        }
      }
      if (alimentosFavoritosArray.length === 0) alimentosFavoritosArray = ["nenhum"];

      const alimentosFavoritosTexto = alimentosFavoritosArray.join(", ");

      const prompt = `[ForcarNovaResposta-${Date.now()}] As informacoes a seguir sao os dados exatos que voce deve utilizar para preencher o JSON. Nao invente, nao altere, e nao crie valores que nao foram passados. Use exatamente estes dados. Crie uma dieta completa para uma pessoa com nome: ${name}, do sexo: ${gender}, com peso atual: ${weight}kg, altura: ${height}, idade ${age} anos, que trabalha como: ${trabalho}, com foco e objetivo em: ${objective}, atualmente nivel de atividade: ${level} e baseado nesse IMC: ${imc || 'nao informado'}, ${alergiaTexto}. A pessoa informou que nao deseja retirar da dieta o(s) seguinte(s) alimento(s): ${alimentosFavoritosTexto}. Atualmente, a pessoa esta${dietaAtual && dietaAtual.toLowerCase() !== 'nao' && dietaAtual.toLowerCase() !== 'nenhuma' ? ` seguindo uma dieta do tipo: ${dietaAtual}` : ' sem seguir nenhuma dieta especifica'}. Sobre a rotina diaria: ${rotina && rotina.toLowerCase() !== 'nao informado' ? rotina : 'Nao informado'}. A pessoa tem o seguinte tempo disponivel para preparar as refeicoes: ${tempoPreparo && tempoPreparo.toLowerCase() !== 'nao informado' ? tempoPreparo : 'Nao informado'}. Analise os horarios declarados na rotina. Posicione as principais refeicoes (exemplo: cafe da manha, almoco, pre-treino) em horarios compativeis com os intervalos livres do trabalho e dos treinos. Nao posicione nenhuma refeicao grande ou com preparo complexo exatamente no inicio ou durante o horario de trabalho declarado. Se houver cardio em jejum, posicione o cafe da manha logo apos esse cardio. Considere sempre os gaps de tempo livres entre atividades. O cardapio DEVE ser elaborado considerando o estilo da dieta atual${dietaAtual && dietaAtual.toLowerCase() !== 'nao' && dietaAtual.toLowerCase() !== 'nenhuma' ? ` (${dietaAtual})` : ''}, respeitando as restricoes e necessidades da pessoa, e incluir um plano alimentar completo para 7 dias consecutivos. Cada dia deve conter ao menos 6 refeicoes equilibradas e diversificadas. ATENCAO OBRIGATORIA SOBRE ALIMENTOS FAVORITOS: O(s) alimento(s) favorito(s) informado(s) (${alimentosFavoritosTexto}) deve(m) obrigatoriamente aparecer em pelo menos 3 dias diferentes ao longo dos 7 dias da semana, em horarios e refeicoes estrategicamente diferentes. A IA deve analisar o perfil da pessoa, os horarios livres, o tipo de alimento e o objetivo para decidir qual o melhor momento de encaixar o alimento favorito ou suas substituicoes. Nao permitir que o alimento favorito apareca sempre no mesmo horario ou na mesma refeicao. Cada dia deve ter o(s) alimento(s) favorito(s) (ou substituicoes) posicionado em um horario diferente dos demais dias, podendo ser por exemplo: um dia no cafe da manha, outro no almoco e outro no lanche da tarde. Se o(s) alimento(s) favorito(s) for(em) prejudicial(is) por causa da alergia ou condicao de saude (${alergia || 'nenhuma'}), substitua por alternativa semelhante e segura, indicando a substituicao dentro da propriedade alimentos_favoritos (ex: ["chocolate(substituido por cacau 70%)"]). Mesmo nesses casos de substituicao, a nova opcao tambem deve aparecer em pelo menos 3 dias diferentes e em horarios variados. Evite incluir alimentos que a pessoa tenha alergia, conforme listado em alergia (${alergia || 'nenhuma'}). Sempre substitua alimentos com contraindicacao por alternativas seguras e nutritivas, indicando a substituicao entre parenteses logo apos o nome do alimento, por exemplo: "amendoim (substituido por sementes de girassol)". Essa substituicao deve ocorrer em todas as refeicoes em que o alimento alergenico apareceria, e deve manter variedade de horarios e dias. Sobre as quantidades: cada alimento listado em todas as refeicoes deve conter sua quantidade exata em gramas, mililitros, unidades ou porcoes. Exemplo de formato correto: "200g de arroz integral", "1 copo (200ml) de suco de laranja", "2 unidades de banana". Leve em conta o tipo de trabalho da pessoa (${trabalho}), o esporte praticado (${esporte || 'nenhum'}) e a rotina descrita (${rotina && rotina.toLowerCase() !== 'nao informado' ? rotina : 'Nao informado'}) para adequar o plano alimentar as demandas energeticas, horarios e tipo de esforco fisico ou mental exigido pela profissao, esporte e rotina. Inclua tambem em cada refeicao uma sugestao de tempero ou condimento natural adequado ao perfil da pessoa, levando em conta a alergia (${alergia || 'nenhuma'}), o objetivo (${objective}), o tipo de trabalho (${trabalho}), o esporte (${esporte || 'nenhum'}) e a dieta atual (${dietaAtual || 'nenhuma'}). Os temperos devem ajudar a melhorar o sabor, a digestao ou o controle da pressao, se aplicavel. Nao use temperos industrializados com alto teor de sodio. Sempre retorne os temperos dentro da array alimentos de cada refeicao, como um item a mais (ex: "tempero: alho e ervas naturais"). Inclua variedade de legumes e verduras ao longo da semana, garantindo pelo menos 3 tipos diferentes de vegetais por dia (ex: folhas verdes, vegetais cruciferos, legumes coloridos). Se o alimento favorito for uma bebida rica em acucar (como refrigerante), limite sua inclusao a no maximo 3 porcoes na semana, preferencialmente distribuidas de forma a nao concentrar mais de 1 porcao no mesmo dia. Inclua fontes saudaveis de gorduras (como azeite de oliva, castanhas, nozes, sementes ou abacate) em ao menos 2 refeicoes por dia, exceto se houver contraindicacao. Garanta que todas as principais refeicoes (cafe da manha, almoco e jantar) contenham pelo menos uma fonte proteica adequada (ex: ovos, carnes, peixes, laticinios, leguminosas). Agora sobre suplementos: Inclua no JSON, dentro da propriedade suplementos, sugestoes adequadas ao perfil da pessoa. Os suplementos devem ser escolhidos com base no objetivo (${objective}), no tipo de esporte praticado (${esporte || 'nenhum'}), no nivel de atividade fisica (${level}), na rotina descrita (${rotina && rotina.toLowerCase() !== 'nao informado' ? rotina : 'Nao informado'}), no tipo de trabalho (${trabalho}), e no tempo disponivel (${tempoPreparo}). Exemplos de suplementos que podem ser considerados (se aplicavel ao caso): Para quem treina academia visando ganho de massa muscular: Whey Protein, Creatina, Maltodextrina, BCAA, entre outros (categoria: suplementos_antes_treino_academia). Para quem faz esportes de resistencia ou luta: Beta-Alanina, Cafeina, Isofonicos, entre outros (categoria: suplementos_antes_treino_esporte). Para uso geral: Multivitaminicos, Vitamina D, Omega 3, entre outros (categoria: suplementos_gerais). Se nao houver informacoes suficientes para indicar suplementos, ou se o perfil da pessoa nao exigir, retorne arrays vazios nas 3 categorias, mas mantenha a estrutura no JSON obrigatoriamente. Nao pule nenhuma categoria de suplementos no JSON final. SOBRE O NOME DO CARDAPIO: Gere um nome criativo e descritivo para este cardapio personalizado, com no maximo 5 palavras, baseado no objetivo (${objective}), no tipo de dieta (${dietaAtual || 'padrao'}), no nivel de atividade (${level}) e no perfil geral da pessoa. Exemplos de bons nomes: "Plano Vegano para Emagrecimento", "Dieta Proteica para Massa", "Cardapio Equilibrado Ativo", "Plano Low Carb Intenso". O nome deve ser unico, inspirador e resumir bem o cardapio gerado. A estrutura do JSON de retorno deve conter obrigatoriamente as seguintes propriedades principais (mesmo que o valor de alguma delas seja "Nao informado"): nome_cardapio (nome criativo gerado pela IA conforme instrucao acima), nome, sexo, idade, altura, peso, objetivo, imc, alergia (igual ao informado ou "nenhuma"), trabalho, esporte, rotina (exatamente como foi informado pela pessoa, mesmo que seja "Nao informado"), alimentos_favoritos (ou substituicoes), dietaAtual (exatamente como foi informado pela pessoa, mesmo que seja "Nao informado"), tempoPreparo (exatamente como foi informado pela pessoa, mesmo que seja "Nao informado"), refeicoes (um array com 7 objetos, cada um representando um dia da semana, contendo as propriedades "nome" (ex: "Segunda", "Terca", etc) e um array de refeicoes com horario, nome e alimentos), suplementos (divididos em: suplementos_antes_treino_esporte, suplementos_antes_treino_academia e suplementos_gerais) Inclua em cada refeicao o campo "calorias" com o total estimado de calorias daquela refeicao (em kcal). Esse valor deve ser numerico e coerente com os alimentos listados. E obrigatorio que o JSON de saida contenha todas essas propriedades. Nao pule nenhuma, mesmo que o valor seja vazio ou "Nao informado". Nao retorne nenhuma observacao alem das passadas no prompt. Nao inclua nenhuma propriedade com acento, nem mesmo em nomes de alimentos.`;

      const response = await model.generateContent(prompt);

      console.log(JSON.stringify(response, null, 2));

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]?.text;

        let jsonString = jsonText;
        jsonString = jsonString.replace(/```json\n?|```/g, "").trim();

        const startIndex = jsonString.indexOf("{");
        const endIndex = jsonString.lastIndexOf("}");
        if (startIndex === -1 || endIndex === -1) {
          console.error("Resposta completa da IA:", jsonText);
          throw new Error("JSON inválido: delimitadores { } não encontrados.");
        }

        jsonString = jsonString.substring(startIndex, endIndex + 1);

        let jsonObject;
        try {
          jsonObject = JSON.parse(jsonString);

          const camposObrigatorios = ["rotina", "dietaAtual", "tempoPreparo"];
          camposObrigatorios.forEach((campo) => {
            if (jsonObject[campo] === undefined) {
              jsonObject[campo] = "Nao informado";
            }
          });
        } catch (err) {
          console.error("Erro ao fazer JSON.parse:", err.message);
          console.log("JSON recebido da IA:", jsonString);
          throw new Error("JSON malformado vindo da IA.");
        }

        const grafico = Array.isArray(jsonObject.refeicoes)
          ? jsonObject.refeicoes.map((dia) => {
              const caloriasTotais =
                dia.refeicoes?.reduce((soma, r) => soma + (r.calorias || 0), 0) || 0;
              return { dia: dia.nome, caloriasTotais };
            })
          : [];

        const nomesCardapio = {
          "ganhar peso": "Plano de Ganho de Massa",
          "perder peso": "Plano de Emagrecimento",
          "emagrecer": "Plano de Emagrecimento",
          "hipertrofia": "Plano de Hipertrofia",
          "definicao": "Plano de Definicao Muscular",
          "saude": "Plano Alimentar Saudavel",
          "resistencia": "Plano para Resistencia",
        };
        const objetivoLower = (jsonObject.objetivo || "").toLowerCase();
        const nomeFallback = Object.entries(nomesCardapio).find(([k]) => objetivoLower.includes(k))?.[1] || "Meu Plano Nutricional";
        const nomeCardapio = jsonObject.nome_cardapio || nomeFallback;

        const result = {
          fallback: false,
          nome_cardapio: nomeCardapio,
          name: jsonObject.nome,
          gender: jsonObject.sexo,
          age: jsonObject.idade,
          height: jsonObject.altura,
          weight: jsonObject.peso,
          objective: jsonObject.objetivo,
          imc: jsonObject.imc,
          alergia: jsonObject.alergia,
          trabalho: jsonObject.trabalho,
          esporte: jsonObject.esporte,
          rotina: jsonObject.rotina,
          dietaAtual: jsonObject.dietaAtual,
          tempoPreparo: jsonObject.tempoPreparo,
          alimentosFavoritos: jsonObject.alimentos_favoritos,
          refeicoes: jsonObject.refeicoes,
          suplementos: jsonObject.suplementos,
          grafico,
        };

        return { data: result };
      }

      throw new Error("Resposta da IA não contém candidatos válidos.");

    } catch (error) {
      // ─── FALLBACK: IA falhou → busca o cardápio mais similar no banco ─────────
      console.error("Erro na IA, ativando fallback do banco:", error.message);

      const cardapioSimilar = await this.buscarMelhorSimilar(data);

      const dadosUsuario = {
        nome:         data.name,
        sexo:         data.gender,
        idade:        data.age,
        altura:       data.height,
        peso:         data.weight,
        objetivo:     data.objective,
        imc:          data.imc,
        alergia:      data.alergia      || "nenhuma",
        trabalho:     data.trabalho     || "Nao informado",
        esporte:      data.esporte      || "Nao informado",
        rotina:       data.rotina       || "Nao informado",
        dietaAtual:   data.dietaAtual   || "Nao informado",
        tempoPreparo: data.tempoPreparo || "Nao informado",
      };

      if (!cardapioSimilar) {
        return {
          data: {
            fallback: true,
            cardapioEncontrado: false,
            mensagem: "Erro ao gerar cardápio. Nenhum cardápio similar encontrado no banco.",
            dadosUsuario,
            nome_cardapio:      null,
            alimentosFavoritos: null,
            refeicoes:          [],
            suplementos:        null,
            grafico:            [],
          }
        };
      }

      let cardapioObj = {};
      try {
        cardapioObj = typeof cardapioSimilar.cardapio_texto === "string"
          ? JSON.parse(cardapioSimilar.cardapio_texto)
          : cardapioSimilar.cardapio_texto;
      } catch (e) {
        console.error("Erro ao parsear cardapio_texto:", e.message);
      }

      let alimentosFavoritosFallback = null;
      if (cardapioSimilar.alimentosFavoritos) {
        try {
          alimentosFavoritosFallback = typeof cardapioSimilar.alimentosFavoritos === "string"
            ? JSON.parse(cardapioSimilar.alimentosFavoritos)
            : cardapioSimilar.alimentosFavoritos;
        } catch {
          alimentosFavoritosFallback = null;
        }
      }

      const refeicoes = cardapioObj.refeicoes || [];

      const grafico = Array.isArray(refeicoes)
        ? refeicoes.map((dia) => ({
            dia: dia.nome,
            caloriasTotais: dia.refeicoes?.reduce((s, r) => s + (r.calorias || 0), 0) || 0,
          }))
        : [];

      return {
        data: {
          fallback: true,
          cardapioEncontrado: true,
          mensagem: "Erro ao gerar cardápio pela IA. Exibindo cardápio similar encontrado.",
          dadosUsuario,
          nome_cardapio:      cardapioObj.nome_cardapio || "Cardápio Similar",
          alimentosFavoritos: alimentosFavoritosFallback,
          refeicoes,
          suplementos:        cardapioObj.suplementos || null,
          grafico,
        }
      };
    }
  }

  async substituirAlimento({ alimento, refeicao, motivo, perfil }) {
    try {
      const model = await this.getModelWithFallback();

      const prompt = `Você é um nutricionista. Substitua o alimento "${alimento}" da refeição "${refeicao}".

Motivo: ${motivo || "não informado"}.
Perfil:
- Objetivo: ${perfil.objetivo || "não informado"}
- Alergia: ${perfil.alergia || "nenhuma"}
- Dieta: ${perfil.dietaAtual || "nenhuma"}

Retorne SOMENTE um JSON válido:
{"substituto": "exemplo aqui"}`;

      const response = await model.generateContent(prompt);

      let texto = response.response.candidates[0]?.content.parts[0]?.text || "";
      texto = texto.replace(/```json\n?|```/g, "").trim();

      const start = texto.indexOf("{");
      const end = texto.lastIndexOf("}");

      if (start === -1 || end === -1) {
        console.error("Resposta IA:", texto);
        throw new Error("JSON inválido");
      }

      texto = texto.substring(start, end + 1);
      const json = JSON.parse(texto);

      return { substituto: json.substituto };

    } catch (error) {
      console.error("Erro no substituirAlimento:", error.message);
      throw new Error("Erro ao gerar substituto.");
    }
  }
}

module.exports = CreateNutritionService;