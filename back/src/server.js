import 'dotenv/config'; // Carrega .env no início de tudo
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
// Habilita o pre-flight do CORS para todas as rotas
app.options('*', cors());
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logger de requisições, como pedido no trabalho

// Rota principal da API, seguindo o padrão /api/v1/recurso
app.use('/api/v1/todos', todoRoutes);

// Rota raiz para um health check simples
app.get('/', (req, res) => {
  res.send('API de Tarefas está no ar e funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
