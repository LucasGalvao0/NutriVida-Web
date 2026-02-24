// back-end/src/googleAuth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { banco } = require('../model/database'); // Importando o pool de conexões

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const googleId = profile.id;
    const nome = profile.displayName;
    const email = profile.emails[0].value;

    // Verifica se o usuário já existe
    const [rows] = await banco.query(
      "SELECT * FROM usuarios WHERE googleId = ?",
      [googleId]
    );

    if (rows.length > 0) {
      return done(null, rows[0]); // Retorna o usuário já existente
    }

    // Se não existir, insere o novo usuário no banco
    await banco.query(
      "INSERT INTO usuarios (googleId, nome_usuario, email) VALUES (?, ?, ?)",
      [googleId, nome, email]
    );

    // Recupera o usuário recém-criado
    const [novoRows] = await banco.query(
      "SELECT * FROM usuarios WHERE googleId = ?",
      [googleId]
    );

    return done(null, novoRows[0]);

  } catch (err) {
    console.error("Erro durante autenticação Google:", err);
    return done(err, null);
  }
}));
