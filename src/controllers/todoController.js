import { TodoService } from '../services/todoService.js';

/**
 * O Controller é responsável por receber as requisições HTTP,
 * processar os dados da requisição (params, body), chamar a camada 
 * de Serviço apropriada e enviar a resposta HTTP (com status e dados).
 */
export const TodoController = {
  /**
   * Lida com a requisição para listar todas as tarefas.
   */
  list: async (req, res) => {
    try {
      const todos = await TodoService.listAllTodos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * Lida com a requisição para criar uma nova tarefa.
   */
  create: async (req, res) => {
    try {
      const newTodo = await TodoService.addNewTodo(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      // Erros de validação do serviço retornam 400 Bad Request
      res.status(400).json({ message: error.message });
    }
  },

  /**
   * Lida com a requisição para atualizar uma tarefa.
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTodo = await TodoService.updateTodo(id, req.body);
      res.status(200).json(updatedTodo);
    } catch (error) {
      // Erros de "não encontrado" do serviço retornam 404 Not Found
      res.status(404).json({ message: error.message });
    }
  },

  /**
   * Lida com a requisição para deletar uma tarefa.
   */
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await TodoService.deleteTodo(id);
      res.status(204).send(); // 204 No Content para sucesso em deleção
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
