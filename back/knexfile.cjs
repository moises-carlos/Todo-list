require('dotenv').config(); // Carrega as variáveis do .env

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      // A linha abaixo é necessária para conexões remotas com o Render
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './src/db/migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      // A URL do banco de dados será fornecida pelo Render através das variáveis de ambiente.
      connectionString: process.env.DATABASE_URL,
      // A linha abaixo é frequentemente necessária para conexões em produção na Render, Heroku, etc.
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './src/db/migrations'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
