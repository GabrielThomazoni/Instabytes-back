import express from "express"; // Importa o framework Express para criar a API.
import multer from "multer"; // Importa o Multer para lidar com requisições multipart/form-data (envio de arquivos).
import cors from "cors";
import { listarPosts, refreshNewPost, sendNewPost, upImg } from "../controllers/postsController.js"; // Importa as funções para lidar com requisições de posts do arquivo postsController.js.

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200 
}
// Configura as opções de armazenamento do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Define o diretório de destino para os arquivos enviados.
    cb(null, 'uploads/'); // Define o diretório de destino como 'uploads/' dentro do diretório do projeto.
  },
  filename: function (req, file, cb) { // Define como os arquivos enviados serão nomeados.
    cb(null, file.originalname); // Utiliza o nome original do arquivo enviado.
  }
});

// Cria uma instância do Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com a configuração 'storage' e define o diretório de destino como './uploads' (opcional se usar storage).

// Define uma função para configurar as rotas da aplicação Express
const routes = (app) => {
  // Middlewares
  app.use(express.json()); // Habilita o parse de dados JSON nos corpos das requisições.
  app.use(cors(corsOptions));

  // Rotas
  app.get("/posts", listarPosts); // Define uma rota GET para "/posts" que chama a função listarPosts do controlador.
  app.post("/posts", sendNewPost); // Define uma rota POST para "/posts" que chama a função sendNewPost do controlador.
  app.post("/upload", upload.single("image"), upImg); // Define uma rota POST para "/upload" que utiliza o middleware 'upload.single("image")' para lidar com o envio de um único arquivo com o nome de campo "image" e então chama a função upImg do controlador.
  app.put("/upload/:id", refreshNewPost);
};

export default routes; // Exporta a função 'routes' como o default.