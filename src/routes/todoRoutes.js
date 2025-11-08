import express from 'express';
import { TodoController } from '../controllers/todoController.js';

const router = express.Router();

// Define as rotas e as associa aos métodos do Controller.
// Ex: Uma requisição GET para '/' será gerenciada por TodoController.list
router.get('/', TodoController.list);
router.post('/', TodoController.create);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

export default router;
