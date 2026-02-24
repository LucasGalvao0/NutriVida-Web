const mysql = require("mysql2/promise");

const dotenv = require("dotenv");

dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT || 3306;  // Defina um valor padrão para a porta

const banco = mysql.createPool({
  host: db_host,
  user: db_user,
  password: db_pass,
  database: db_name,
  port: db_port,  // A porta do banco
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificando a conexão
const checkConnection = async () => {
  try {
    const connection = await banco.getConnection();  // Utiliza o pool para obter uma conexão
    await connection.ping(); // Testa se o banco está respondendo
    connection.release();    // Libera a conexão de volta ao pool
    return true;
  } catch (error) {
    console.error(`Erro ao conectar ao banco de dados: ${db_name}, \n falha`, error.message);
    return false;
  }
};

module.exports = { checkConnection, banco };
