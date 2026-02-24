// back-end/src/app.js
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const mercadopago = require("mercadopago");
const { checkConnection } = require('./model/database');
const rotasUsuarios = require('./view/usuariosRouters');
const rotasContatos = require('./view/contatosRouters');
const rotasAuth = require('./view/authRouters');
const rotasConsultorios = require('./view/consultoriosRouters');
const rotasAgendamentos = require('./view/agendamentoRouters');
const criarCardapioRotas = require('./view/criarCardapioRouters');
const rotasNutricionista = require('./view/nutricionistaRouters');
const salvarCardapioRouters = require("./view/salvarCardapioRouters");
const salvarRespostasRouters = require("./view/salvarRespostaRouters");

// Carrega variáveis do .env
dotenv.config();

// Inicializa o app
const app = express();
const Port = process.env.APP_PORT || 4500;

// Middleware
app.use(express.json());

app.use(cors());

// Configuração da sessão (necessária para o Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo_fallback',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Ajuste se usar HTTPS
}));

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuração do Passport com Google
require('./view/googleAuth');

// Servir arquivos estáticos da pasta front-end
app.use(express.static(path.join(__dirname, '../../front-end')));

// Verificar a conexão com o banco de dados
(async () => {
  const isDbConnected = await checkConnection();
  if (isDbConnected) {
    console.log("Servidor Banco de Dados - OK ...");
  } else {
    console.error("Falha na conexão com o banco de dados!");
  }
})();

// Rota de teste
app.get("/", (req, res) => {
  res.send({ message: "Servidor rodando!" });
});

// Rotas principais
app.use("/usuarios", rotasUsuarios);
app.use("/auth", rotasAuth);
app.use("/contatos", rotasContatos);

// Rota para o login com o Google
app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Escopos necessários para pegar as informações do Google
    prompt: 'select_account' // Força a escolha da conta do Google toda vez
  })
);

// Callback do Google após login
// back-end/src/routes.js ou server.js
app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const { id, nome_usuario, email } = req.user;

    // Redireciona para a página de sucesso com os dados via query
    res.redirect(`http://localhost:3000/googleSuccess.html?id=${id}&nome_usuario=${encodeURIComponent(nome_usuario)}&email=${encodeURIComponent(email)}`);
  }
);


// Página de falha
app.get("/auth/google/failure", (req, res) => {
  res.send("Falha no login com o Google.");
});






app.use(cors({
 
}));


mercadopago.configure({
  access_token: "TEST-3795022885879010-111307-5bed7f8dacf6034ae8c1e0498d0af000-1190022787" // coloque o seu token completo aqui
})

app.post("/criar-preferencia", async (req, res) => {
  try {
    const { title, price } = req.body;

    const preference = {
      items: [
        {
          title: title || "Produto Exemplo",
          quantity: 1,
          unit_price: parseFloat(price) || 100.00
        }
      ],
      
      back_urls: {
        success: "http://localhost:3000/sucesso",
        failure: "http://localhost:3000/falha",
        pending: "http://localhost:3000/pendente"
      },
      // auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use("/consultorios", rotasConsultorios);
app.use('/agendamentos', rotasAgendamentos);
app.use('/cardapio', criarCardapioRotas);
app.use("/salvarCardapio", salvarCardapioRouters);
app.use("/respostas", salvarRespostasRouters);
app.use('/nutricionistas', rotasNutricionista);

// Inicia o servidor
app.listen(Port, () => {
  console.log(`Servidor rodando na porta: ${Port}`);
});
