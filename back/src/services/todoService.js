import { TodoModel } from '../models/todoModel.js';

/**
 * O Service contém a lógica de negócio da aplicação.
 * Ele orquestra as operações e atua como uma ponte entre os Controllers e os Models.
 */
export const TodoService = {
  /**
   * Retorna todas as tarefas.
   * @returns {Promise<Array>}
   */
  listAllTodos: async () => {
    return TodoModel.getAll();
  },

  /**
   * Cria uma nova tarefa.
   * @param {{ title: string }} todoData - Dados da nova tarefa.
   * @returns {Promise<Object>}
   */
  addNewTodo: async (todoData) => {
    if (!todoData.title || todoData.title.trim() === '') {
      // Exemplo de regra de negócio simples
      throw new Error('O título da tarefa não pode ser vazio.');
    }
    // Garante que apenas os campos corretos sejam passados para o model
    const todoToCreate = {
      title: todoData.title,
      completed: false,
    };
    return TodoModel.create(todoToCreate);
  },

  /**
   * Atualiza uma tarefa.
   * @param {string} id - O ID da tarefa.
   * @param {{ title?: string, completed?: boolean }} todoData - Dados a serem atualizados.
   * @returns {Promise<Object>}
   */
  updateTodo: async (id, todoData) => {
    const existingTodo = await TodoModel.getById(id);
    if (!existingTodo) {
      throw new Error('Tarefa não encontrada.');
    }
    // Garante que apenas campos permitidos sejam atualizados
    const allowedUpdates = {};
    if (todoData.title !== undefined) {
      allowedUpdates.title = todoData.title;
    }
    if (todoData.completed !== undefined) {
      allowedUpdates.completed = todoData.completed;
    }
    return TodoModel.update(id, allowedUpdates);
  },

  /**
   * Deleta uma tarefa.
   * @param {string} id - O ID da tarefa.
   */
  deleteTodo: async (id) => {
    const existingTodo = await TodoModel.getById(id);
    if (!existingTodo) {
      throw new Error('Tarefa não encontrada.');
    }
    await TodoModel.remove(id);
  }
};
