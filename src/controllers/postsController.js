import fs from "fs";
import { getAllPosts, createNewPost, refreshPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Define uma rota GET para a URL "/posts".
export async function listarPosts(req, res) {
  // Chama a função para obter todos os posts.
  const posts = await getAllPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e o array de posts no formato JSON.
  res.status(200).json(posts);
}

// Define uma rota POST para criar um novo post.
export async function sendNewPost(req, res) {
  // Obtém o novo post do corpo da requisição.
  const newPost = req.body;
  try {
    // Chama a função para criar o novo post.
    const createdPost = await createNewPost(newPost);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON.
    res.status(200).json(createdPost);
  } catch (error) {
    // Imprime o erro no console.
    console.error(error.message);
    // Envia uma resposta HTTP com status 500 (erro do servidor) e uma mensagem de erro no formato JSON.
    res.status(500).json({ "Erro": "Falha na requisição!" });
  }
}

// Define uma rota POST para fazer upload de uma imagem e criar um novo post.
export async function upImg(req, res) {
  // Cria um novo objeto de post com a descrição, URL da imagem e alt text.
  const newPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  try {
    // Chama a função para criar o novo post.
    const createdPost = await createNewPost(newPost);
    // Cria o novo nome do arquivo da imagem com o ID do post inserido.
    const imgRefresh = `uploads/${createdPost.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome.
    fs.renameSync(req.file.path, imgRefresh);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON.
    res.status(200).json(createdPost);
  } catch (error) {
    // Imprime o erro no console.
    console.error(error.message);
    // Envia uma resposta HTTP com status 500 (erro do servidor) e uma mensagem de erro no formato JSON.
    res.status(500).json({ "Erro": "Falha na requisição!" });
  }
}

// Define uma rota POST para criar um novo post.
export async function refreshNewPost(req, res) {
  // Obtém o novo post do corpo da requisição.
  const id = req.params.id;
  const imgUrl = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer)
    const postRefresh = {
      imgUrl: imgUrl,
      descricao: descricao,
      alt: req.body.alt
    }
    // Chama a função para criar o novo post.
    const createdPost = await refreshPost(id, postRefresh);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON.
    res.status(200).json(createdPost);
  } catch (error) {
    // Imprime o erro no console.
    console.error(error.message);
    // Envia uma resposta HTTP com status 500 (erro do servidor) e uma mensagem de erro no formato JSON.
    res.status(500).json({ "Erro": "Falha na requisição!!" });
  }
}