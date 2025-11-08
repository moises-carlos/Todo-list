import knex from 'knex';
import knexfile from '../../knexfile.cjs';

// Para este projeto, usaremos diretamente a configuração de 'development',
// já que ela aponta para o banco de dados do Render.
// Em um projeto maior, a escolha poderia ser dinâmica baseada em process.env.NODE_ENV.
const db = knex(knexfile.development);

export default db;
