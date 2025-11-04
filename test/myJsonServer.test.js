//Lembrar de criar um repositorio no GitHub com o projeto para testar -
//Pesquisar depois como? 

const chai = require('chai');
const expect = chai.expect;   
const axios = require('axios');

const myjsonserver = axios.create({
  baseURL: 'https://my-json-server.typicode.com/RuinedBreno/Trabalho-Final---Teste-de-Software'
});


const {
    getAllServerPosts,
    getServerPostById,
    createServerPost,
    deleteServerPost,
    getAllServerUsers,
    patchServerUser,
    getCommentsByPostId,
    createServerComment, 
    getNestedCommentsByPostId,
    getUsersByFilter,
    getServerUserById
} = require('../src/myJsonServer.js');

describe('teste de integração', () => {
    const NEW_POST_DATA = { title: 'Post Criado no Teste', author: 'API-TEST', body: 'Conteúdo de teste.' };
    let createdPostId;

    describe('1. CRUD de Posts', () => {

        it('9.1. GET /posts: Deve retornar status 200 e a lista inicial de posts', async () => {
            const res = await getAllServerPosts();
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(2);
        });

        it('9.2. GET /posts/:id: Deve retornar o post com ID 1 e o autor "User1"', async () => {
            const res = await getServerPostById(1);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', 1);
            expect(res.body).to.have.property('author', 'User1');
        });

        it('9.3. POST /posts: Deve criar um novo post e retornar o objeto criado com um novo ID', async () => {
            const res = await createServerPost(NEW_POST_DATA);
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('title', NEW_POST_DATA.title);
            expect(res.body).to.have.property('id').that.is.a('number');
            
            createdPostId = res.body.id; 
        });
        
    it('9.4. GET /posts/:id: Deve retornar 404 para um ID que não existe', async () => {
    // Busca um ID que certamente não está no seu db.json inicial (ex: 9999).
    const res = await getServerPostById(9999); 
    
    // A asserção é que o servidor retornará 404 para algo que não existe.
    expect(res).to.have.status(404);
}).timeout(5000); // FIM DO TESTE 9.5
    });


    describe('2. Testes de Usuários', () => {
        const USER_ID = 1;
        
        it('9.6. GET /users: Deve retornar a lista de usuários com status 200', async () => {
            const res = await getAllServerUsers();
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
        });

        it('9.7. PATCH /users/:id: Deve atualizar o nome do usuário 1 e manter o email', async () => {
            const updateName = { name: 'Breno Atualizado' };
            const res = await patchServerUser(USER_ID, updateName);

          
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', updateName.name);
            expect(res.body).to.have.property('email', 'breno@exemplo.com'); 
        });

        it('9.8. GET /users/:id: Deve verificar a estrutura básica do usuário', async () => {
            const res = await getServerUserById(USER_ID);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('email');
        });

       it('9.9. GET /users: Deve retornar um array vazio se o recurso não tiver dados', async () => {
            const res = await getUsersByFilter('name', 'NaoExiste'); 
            
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').that.is.empty;
        });
    });


    describe('3. Testes de Comentários', () => {

        it('9.10. GET /comments?postId=1: Deve retornar apenas comentários do Post ID 1', async () => {
            const res = await getCommentsByPostId(1);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').with.lengthOf(1); 
            expect(res.body[0]).to.have.property('postId', 1);
        });

        it('9.12. POST /comments: Deve criar um novo comentário e validar o corpo', async () => {
            const newComment = { body: 'Novo Teste Comentário', postId: 1 };
            const res = await createServerComment(newComment); // OK, chama a função de serviço
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('body', newComment.body);
        });

        it('9.13. GET /posts/1/comments: Deve suportar o endpoint aninhado (posts/id/comments)', async () => {
            const res = await getNestedCommentsByPostId(1); // OK, chama a função de serviço

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('postId', 1);
        });

        it('9.14. GET /users: Deve retornar um array vazio se o recurso não tiver dados', async () => {
            // CORREÇÃO: Chamar a função de serviço (9.14 é um teste repetido, ajuste a numeração)
            const res = await getUsersByFilter('name', 'NaoExiste'); 

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').that.is.empty;
        });
    });
});