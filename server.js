import express from "express"; // Importa o framework Express, que será a base da nossa aplicação web.

import routes from "./src/routes/postsRoutes.js";// Importa as rotas definidas no arquivo postsRoutes.js.

//Criação de base de dados local, não mais utilizada
//const posts = [
//    {
//        id: 1,
//        descricao: "Foto de um gato sério",
//        imagem: "https://placecats.com/millie/300/150"
//    },
//    {
//        id: 2,
//        descricao: "Gato ronronando em uma caixa de papelão",
//        imagem: "https://placecats.com/neo/400/300"
//    },
//    {
//        id: 3,
//        descricao: "Gato preto com olhos brilhantes",
//        imagem: "https://placecats.com/g/250/250"
//    },
//    {
//        id: 4,
//        descricao: "Gato tigrado brincando com um novelo de lã",
//        imagem: "https://placecats.com/350/250"
//    },
//    {
//        id: 5,
//        descricao: "Gato branco tomando sol",
//        imagem: "https://placecats.com/300/200"
//    }
//];

const app = express();// Cria uma nova aplicação Express, que será o ponto de partida para configurar todas as rotas e funcionalidades da sua aplicação.

app.use(express.static("uploads")) // Configura um diretório público para servir arquivos estáticos. Nesse caso, o diretório 'uploads' será acessível diretamente pelo navegador. Por exemplo, se você tiver uma imagem dentro da pasta 'uploads', ela poderá ser acessada através da URL http://seu-site.com/imagem.jpg.

routes(app);
// Chama a função 'routes' que foi importada (./src/routes/postsRoutes.js), passando a instância do Express como argumento.

app.listen(3000, () => {console.log("Servidor ouvindo...")}); // Inicia o servidor na porta 3000 e exibe uma mensagem no console.

//Função para pegar ID quando estávamos usando base de dados local
//function buscarIDPost(id) {
//	return posts.findIndex((post) => {
//		return post.id === Number(id);
//	})
//}

//app.get("/posts", async (req, res) => {
//    const index = buscarIDPost(req.params.id);
//    const posts = await getAllPosts();
//    res.status(200).json(posts);
//});
