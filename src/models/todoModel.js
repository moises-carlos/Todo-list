import db from '../config/database.js';

const TABLE_NAME = 'todos';

/**
 * O Model é responsável pela interação direta com o banco de dados.
 */
export const TodoModel = {
  /**
   * Busca todas as tarefas no banco de dados.
   * @returns {Promise<Array>} Uma lista de tarefas.
   */
  getAll: async () => {
    return db(TABLE_NAME).select('*').orderBy('id', 'asc');
  },

  /**
   * Busca uma tarefa pelo seu ID.
   * @param {number} id - O ID da tarefa.
   * @returns {Promise<Object|undefined>} A tarefa encontrada ou undefined.
   */
  getById: async (id) => {
    return db(TABLE_NAME).where({ id }).first();
  },

  /**
   * Cria uma nova tarefa.
   * @param {Object} todoData - Os dados da tarefa (ex: { title: 'Nova Tarefa' }).
   * @returns {Promise<Object>} A tarefa recém-criada.
   */
  create: async (todoData) => {
    const [newTodo] = await db(TABLE_NAME).insert(todoData).returning('*');
    return newTodo;
  },

  /**
   * Atualiza uma tarefa existente.
   * @param {number} id - O ID da tarefa a ser atualizada.
   * @param {Object} todoData - Os novos dados da tarefa (ex: { completed: true }).
   * @returns {Promise<Object>} A tarefa atualizada.
   */
  update: async (id, todoData) => {
    const [updatedTodo] = await db(TABLE_NAME).where({ id }).update(todoData).returning('*');
    return updatedTodo;
  },

  /**
   * Remove uma tarefa do banco de dados.
   * @param {number} id - O ID da tarefa a ser removida.
   * @returns {Promise<number>} O número de linhas removidas (deve ser 1).
   */
  remove: async (id) => {
    return db(TABLE_NAME).where({ id }).del();
  }
};
