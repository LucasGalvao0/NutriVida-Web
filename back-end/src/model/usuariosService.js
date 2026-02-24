const express = require('express');
const { banco } = require("./database");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const rs_user = process.env.RS_USER;
const rs_pass = process.env.RS_PASS;
const rs_host = process.env.RS_HOST;
const rs_port = process.env.RS_PORT;

const GetAll = async (request, response) => {
    try {
        const data = await banco.query('SELECT * FROM usuarios');
        response.status(200).send(data[0]);    
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"});
    }    
};

const GetById = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        response.status(200).send(data[0]);    
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"});
    }    
};

const Erase = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await banco.query('DELETE FROM usuarios WHERE id = ?', [id]);
        response.status(204).send(data[0]);    
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        response.status(401).send({"message": "Falha ao executar a ação!"});
    } 
};

const Put = async (request, response) => {
    try {
        const id = request.params.id;
        const payload = request.body;

        // Criptografa a nova senha se ela foi enviada
        let senhaCriptografada = null;
        if (payload.senha) {
            senhaCriptografada = await bcrypt.hash(payload.senha, 10);
        }

        const queryText = 'UPDATE usuarios SET nome_usuario = ?, senha = ?, email = ? WHERE id = ?';
        const values = [payload.nome_usuario, senhaCriptografada || payload.senha, payload.email, id];

        const res = await banco.query(queryText, values);

        response.status(203).send(res[0]);   
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        response.status(403).send({"message": "Falha ao executar a ação!"});
    } 
};

const Post = async (request, response) => {
  try {
    const payload = request.body;

    // Verifica se já existe um usuário com esse e-mail
    const [usuariosExistentes] = await banco.query('SELECT * FROM usuarios WHERE email = ?', [payload.email]);

    if (usuariosExistentes.length > 0) {
      return response.status(409).send({ message: "Este e-mail já está cadastrado." });
    }

    // Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(payload.senha, 10);

    const queryText = 'INSERT INTO usuarios (nome_usuario, senha, email) VALUES (?, ?, ?)';
    const values = [payload.nome_usuario, senhaCriptografada, payload.email];  
    const resInsert = await banco.query(queryText, values);

    // Pega o id inserido
    const insertId = resInsert[0].insertId;

    // Busca o usuário recém-criado (sem senha)
    const [usuarioCriado] = await banco.query('SELECT id, nome_usuario, email FROM usuarios WHERE id = ?', [insertId]);

    // Retorna o usuário criado
    response.status(201).json(usuarioCriado[0]);    

  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    response.status(500).send({ message: "Falha ao executar a ação!" });
  } 
};


const SolicitarResetSenha = async (request, response) => {
    const { email } = request.body;

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_HOST = process.env.EMAIL_HOST;
    const EMAIL_PORT = parseInt(process.env.EMAIL_PORT, 10); 
    
    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_HOST || !EMAIL_PORT) {
        console.error("Erro: Variáveis de ambiente de e-mail (EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT) não definidas. Verifique seu arquivo .env.");
    }

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_PORT === 465, 
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const [usuarios] = await banco.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (usuarios.length === 0) {
            return response.status(200).send({
                message: "Se o e-mail estiver cadastrado, o token foi enviado."
            });
        }

        const usuario = usuarios[0];

        if (!usuario.senha) {
            return response.status(403).send({
                message: "Conta criada via Google. Não é possível redefinir a senha."
            });
        }

        const token = crypto.randomBytes(3).toString("hex").toUpperCase(); 
        const expira = new Date(Date.now() + 3600000); // 1 hora


        await banco.query(
            'UPDATE usuarios SET reset_token = ?, reset_token_expira = ? WHERE email = ?',
            [token, expira, email]
        );

        try {
            const nomeUsuario = usuario.nome_usuario || email;
            const mailOptions = {
                from: `"NutriVida" <${EMAIL_USER}>`, 
                to: email,
                subject: "Redefinição de Senha - NutriVida",
                html: `
                    <p>Olá ${nomeUsuario},</p>
                    <p>Você solicitou uma redefinição de senha para sua conta.</p>
                    <p>Seu código de redefinição é: <strong>${token}</strong></p>
                    <p>Este código é válido por 1 hora.</p>
                    <p>Se você não solicitou esta redefinição, ignore este e-mail.</p>
                    <p>Atenciosamente,<br>Equipe NutriVida</p>
                `,
            };

            await transporter.sendMail(mailOptions);
            console.log(`E-mail de redefinição enviado com sucesso para ${email}`);
        } catch (emailError) {
            console.error(`Falha ao enviar e-mail de redefinição para ${email}:`, emailError.message);
        }

        response.status(200).send({
            message: "Se o e-mail estiver cadastrado, o token foi enviado."
        });

    } catch (error) {
        console.error("Erro ao solicitar redefinição:", error.message);
        response.status(500).send({ message: "Erro ao processar a solicitação." });
    }
};

const RedefinirSenha = async (request, response) => {
    const { token, novaSenha } = request.body;

    try {
        const sql = 'SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expira > NOW()';
        const [rows] = await banco.query(sql, [token]);

        if (rows.length === 0) {
            return response.status(400).send({ message: "Token inválido ou expirado." });
        }

        if (rows[0].google_id) {
          return response.status(400).send({
            message: "Esta conta foi criada com login do Google. Não é possível redefinir a senha."
          });
        }

        const userId = rows[0].id;

        // Criptografa a nova senha antes de salvar
        const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

        const updateSql = 'UPDATE usuarios SET senha = ?, reset_token = NULL, reset_token_expira = NULL WHERE id = ?';
        await banco.query(updateSql, [senhaCriptografada, userId]);

        response.status(200).send({ message: "Senha atualizada com sucesso!" });
    } catch (error) {
        console.error("Erro ao redefinir senha:", error.message);
        response.status(500).send({ message: "Erro ao redefinir a senha." });
    }
};


// 🔐 Função opcional de login com bcrypt
const Login = async (request, response) => {
    const { email, senha } = request.body;

    try {
        const [usuarios] = await banco.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (usuarios.length === 0) {
            return response.status(401).send({ message: "E-mail ou senha incorretos." });
        }

        const usuario = usuarios[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return response.status(401).send({ message: "E-mail ou senha incorretos." });
        }

        response.status(200).send({ message: "Login realizado com sucesso!", usuario });
    } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        response.status(500).send({ message: "Erro ao fazer login." });
    }
};


module.exports = {
  GetAll,
  GetById,
  Erase,
  Post,
  Put,
  SolicitarResetSenha,
  RedefinirSenha,
  Login
};
