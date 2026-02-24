const { banco } = require("./database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.JWT_SECRET || "seusegredoaqui";

const Login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 🧍‍♂️ Verifica na tabela de USUÁRIOS
    const [usuarios] = await banco.query(
      "SELECT id, nome_usuario AS nome, email, senha FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuarios.length > 0) {
      const usuario = usuarios[0];

      // Compara senha com bcrypt
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ message: "E-mail ou senha inválidos." });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: "usuario",
        },
        secret,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login de usuário realizado com sucesso!",
        token,
        id: usuario.id,
        nome: usuario.nome,
        tipo: "usuario",
      });
    }

    // Verifica na tabela de NUTRICIONISTAS
    const [nutricionistas] = await banco.query(
      "SELECT id, nome, email, senha FROM nutricionistas WHERE email = ?",
      [email]
    );

    if (nutricionistas.length > 0) {
      const nutri = nutricionistas[0];

      // Compara senha com bcrypt
      const senhaCorreta = await bcrypt.compare(senha, nutri.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ message: "E-mail ou senha inválidos." });
      }

      const token = jwt.sign(
        {
          id: nutri.id,
          nome: nutri.nome,
          email: nutri.email,
          tipo: "nutricionista",
        },
        secret,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login de nutricionista realizado com sucesso!",
        token,
        id: nutri.id,
        nome: nutri.nome,
        tipo: "nutricionista",
      });
    }

    // Se nenhum encontrado
    return res.status(401).json({ message: "E-mail ou senha inválidos." });

  } catch (error) {
    console.error("Erro ao realizar login:", error.message);
    return res.status(500).json({ message: "Erro interno no login." });
  }
};

module.exports = { Login };
