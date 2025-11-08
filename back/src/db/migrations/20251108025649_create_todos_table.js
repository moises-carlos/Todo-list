/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('todos', function(table) {
    table.increments('id').primary(); // Chave primária auto-incrementável
    table.string('title').notNullable(); // Título da tarefa, não pode ser nulo
    table.boolean('completed').notNullable().defaultTo(false); // Status, padrão é falso
    table.timestamps(true, true); // Cria colunas created_at e updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
