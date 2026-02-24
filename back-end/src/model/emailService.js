require('dotenv').config();
const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT, 10);

if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_HOST || !EMAIL_PORT) {
    console.error("Erro: Variáveis de ambiente de e-mail (EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT) não definidas. Verifique seu arquivo .env.");
    process.exit(1); // Sai do processo com um erro
}

// Configura o transporter do Nodemailer
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

/**
 * Envia um e-mail de resposta.
 * @param {string} destinatario
 * @param {string} resposta
 * @param {object} mensagemOriginal
 */
async function enviarEmailResposta(destinatario, resposta, mensagemOriginal) {
    try {
        const info = await transporter.sendMail({
            from: `"Nutrivida" <${EMAIL_USER}>`, // Seu nome de remetente e e-mail
            to: destinatario,
            subject: "De: Contato via site Nutrivida", // Assunto ajustado para não mencionar Mailtrap
            html: `
                <p>Olá ${mensagemOriginal.nome},</p>
                <p>Obrigado pelo seu contato! Aqui está a resposta para sua mensagem:</p>
                <br>
                <div style="background-color: #f2f2f2; padding: 15px; border-radius: 5px;">
                    <p>${resposta}</p>
                </div>
                <br>
                <hr>
                <p style="font-size: 12px; color: #777;">
                    <b>Sua mensagem original:</b><br>
                    <i>"${mensagemOriginal.mensagem}"</i>
                </p>
            `,
        });

        console.log("E-mail enviado com sucesso. ID da Mensagem: %s", info.messageId);
        // A linha abaixo só é relevante para testes com serviços como Ethereal, não para envio real.
        // console.log("URL de visualização (se aplicável): %s", nodemailer.getTestMessageUrl(info));
        return info;
    } catch (error) {
        console.error("Erro ao enviar e-mail via Gmail:", error); // Mensagem de erro ajustada
        throw error;
    }
}

module.exports = { enviarEmailResposta };