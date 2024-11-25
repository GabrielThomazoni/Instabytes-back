import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/mongoConfig.js"; // Importa a função que estabelecerá a conexão com o banco de dados MongoDB.

// Chama a função para conectar ao banco, utilizando a string de conexão obtida da variável de ambiente. A variável 'conexao' armazena a conexão estabelecida.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); 

// Função assíncrona para obter todos os posts do banco de dados.
export async function getAllPosts() {
    const mongo = conexao.db("instabytes_imersao_back"); // Seleciona o banco de dados específico dentro da conexão.
    const colecao = mongo.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray(); // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
}

export async function createNewPost(newPost) {
    const mongo = conexao.db("instabytes_imersao_back");// Seleciona o banco de dados específico dentro da conexão.
    const colecao = mongo.collection("posts");// Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.insertOne(newPost);// Insere um novo conteúdo (newPost) na coleção "posts".
}

export async function refreshPost(id, refreshPost) {
    const mongo = conexao.db("instabytes_imersao_back");// Seleciona o banco de dados específico dentro da conexão.
    const colecao = mongo.collection("posts");// Seleciona a coleção "posts" dentro do banco de dados.
    // console.log(id); Tive um erro com o id (dizia que estava undfined), achei o erro, escrevi param ao invés de params. :')
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: refreshPost})// Insere um novo conteúdo (newPost) na coleção "posts".
}