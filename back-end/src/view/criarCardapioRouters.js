const express = require('express');
const router = express.Router();
const CreateNutritionController = require('../model/criarCardapioService');

// ======================================================
//  POST - GERAR CARDÁPIO
// ======================================================
router.post("/CardapioCriado", async (req, res) => {
  try {
    const {
      name, weight, height, age, gender, objective, level,
      imc, alergia, alimentosFavoritos, trabalho, esporte,
      dietaAtual, rotina, tempoPreparo
    } = req.body;

    const createNutrition = new CreateNutritionController();

    const nutrition = await createNutrition.execute({
      name,
      weight,
      height,
      age,
      gender,
      objective,
      level,
      imc,
      alergia,
      alimentosFavoritos,
      trabalho,
      esporte,
      dietaAtual,
      rotina,
      tempoPreparo
    });

    res.status(200).send(nutrition);

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro ao gerar plano nutricional" });
  }
});

// ======================================================
//  GET - CARDÁPIO DE TESTE (FIXO)
// ======================================================
router.get("/CardapioTeste", async (req, res) => {

  const responseText = `{
    "nome": "Lucas",
    "sexo": "sss",
    "idade": 19,
    "altura": 1.75,
    "peso": 68,
    "objetivo": "emagrecer",
    "refeicoes": [
      {
        "horario": "08:00",
        "nome": "Cafe da Manha",
        "alimentos": [
          "1 fatia de pao integral",
          "1 ovo cozido",
          "1 banana",
          "200ml de leite desnatado"
        ]
      },
      {
        "horario": "10:00",
        "nome": "Lanche da Manha",
        "alimentos": [
          "1 iogurte desnatado",
          "1 maça"
        ]
      },
      {
        "horario": "12:00",
        "nome": "Almoco",
        "alimentos": [
          "100g de carne grelhada (frango ou peixe)",
          "1 concha de arroz integral",
          "Salada de folhas verdes com tomate e cenoura",
          "1 colher de sopa de azeite de oliva"
        ]
      },
      {
        "horario": "15:00",
        "nome": "Lanche da Tarde",
        "alimentos": [
          "1 iogurte grego",
          "1 punhado de castanhas"
        ]
      },
      {
        "horario": "19:00",
        "nome": "Jantar",
        "alimentos": [
          "150g de carne magra grelhada ou peixe",
          "1 xícara de brócolis cozido",
          "1 batata doce cozida"
        ]
      },
      {
        "horario": "21:00",
        "nome": "Lanche da Noite",
        "alimentos": [
          "1 xícara de chá de camomila"
        ]
      }
    ],
    "suplementos": [
      "Proteína do soro do leite",
      "Ômega 3"
    ]
  }`;

  try {
    // JSON direto (sem markdown)
    const jsonObject = JSON.parse(responseText);
    res.json({ data: jsonObject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao processar JSON' });
  }
});

module.exports = router;
