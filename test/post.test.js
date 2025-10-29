const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const sinon = require('sinon');

const { 
    createPost, 
    getAllPosts, 
    updatePost, 
    getPostById, 
    deletePost, 
    getPostsByUserId, 
    associatePostToUser
} = require('../src/post'); 

const POST_DATA_VALIDO = { title: 'Meu Post', body: 'Conteúdo do post.' };
const ID_POST = 15;
const ID_USUARIO = 5;

const MOCK_API_POSTS = [
    { id: 10, title: 'Mock Post 1' },
    { id: 11, title: 'Mock Post 2' },
];

async function fetchPostsFromAPI(httpService) {
    return httpService.get('/posts'); 
}

describe('Testes Unitários e Mockados de Posts (Nota 6)', () => {

  describe('ASSERT Style', () => {
    it('1.1. createPost: Deve lançar erro se o título estiver ausente (assert.throws)', () => {
      assert.throws(() => createPost({ body: 'sem titulo' }), Error, 'Dados inválidos para criar o post.');
    });

    it('1.2. getAllPosts: O retorno deve ser um array de posts (assert.isArray)', () => {
      assert.isArray(getAllPosts(), 'A função deve retornar um Array.');
    });

    it('1.3. updatePost: Deve retornar o post com o título atualizado (assert.deepEqual)', () => {
      const dadosAtualizados = { title: 'Novo Título' };
      const resultado = updatePost(ID_POST, dadosAtualizados);
      const esperado = { id: ID_POST, title: 'Novo Título' };
      assert.deepEqual(resultado, esperado, 'O objeto atualizado deve corresponder ao esperado.');
    });

    it('1.4. getPostById: O retorno de um post deve ser um objeto (assert.isObject)', () => {
      assert.isObject(getPostById(ID_POST), 'O resultado deve ser um Objeto.');
    });

    it('1.5. deletePost: Deve incluir o status de "sucesso" na resposta (assert.include)', () => {
      assert.include(deletePost(ID_POST), { status: 'sucesso' }, 'O status da remoção deve ser sucesso.');
    });
    
    it('1.6. getPostsByUserId: Deve retornar 2 posts (assert.strictEqual)', () => {
        const resultado = getPostsByUserId(ID_USUARIO);
        assert.strictEqual(resultado.length, 2, 'O array deve ter exatamente 2 posts.');
    });
  });

  describe('EXPECT Style', () => {
    it('2.1. associatePostToUser: O retorno deve ser um objeto (expect.to.be.a)', () => {
      expect(associatePostToUser(ID_POST, ID_USUARIO)).to.be.a('object');
    });

    it('2.2. createPost: O post criado deve ter a propriedade "body" (expect.to.have.property)', () => {
      const novoPost = createPost(POST_DATA_VALIDO);
      expect(novoPost).to.have.property('body');
    });

    it('2.3. getAllPosts: A lista completa deve ter 3 posts (expect.to.have.lengthOf)', () => {
      expect(getAllPosts()).to.have.lengthOf(3);
    });

    it('2.4. getPostById: O post retornado não deve ser nulo (expect.to.not.be.null)', () => {
      expect(getPostById(ID_POST)).to.not.be.null;
    });

    it('2.5. getPostsByUserId: O primeiro post deve ter o ID de usuário correto (expect.to.be.true)', () => {
      const post = getPostsByUserId(ID_USUARIO)[0];
      expect(post.userId === ID_USUARIO).to.be.true;
    });

    it('2.6. deletePost: A mensagem de retorno deve ser exata (expect.to.equal)', () => {
      const mensagemEsperada = `Post com ID ${ID_POST} foi removido.`;
      expect(deletePost(ID_POST).message).to.equal(mensagemEsperada);
    });
  });

  describe('SHOULD Style', () => {
    it('3.1. createPost: Não deve lançar erro com dados válidos (should.not.throw)', () => {
      (() => createPost(POST_DATA_VALIDO)).should.not.throw();
    });

    it('3.2. getPostsByUserId: O retorno deve ser do tipo array (should.be.an)', () => {
      getPostsByUserId(ID_USUARIO).should.be.an('array');
    });

    it('3.3. associatePostToUser: O post associado deve ter a propriedade "userId" (should.have.property)', () => {
      associatePostToUser(ID_POST, ID_USUARIO).should.have.property('userId');
    });
    
    it('3.4. getAllPosts: O número de posts deve ser de no mínimo 3 (should.be.at.least)', () => {
        getAllPosts().length.should.be.at.least(3);
    });

    it('3.5. getPostById: O ID do post retornado deve ser igual ao solicitado (should.equal)', () => {
        getPostById(ID_POST).id.should.equal(ID_POST);
    });
    
    it('3.6. updatePost: O objeto retornado deve conter o ID e o novo corpo (should.deep.include)', () => {
      const updatedBody = 'Corpo Alterado';
      updatePost(ID_POST, { body: updatedBody }).should.deep.include({ id: ID_POST, body: updatedBody });
    });
  });

  describe('Testes Mockados/Stubados com Sinon', () => {
      afterEach(() => {
          sinon.restore(); 
      });
      
      it('4.1. Deve simular uma chamada de API bem-sucedida (Status 200) e retornar dados', async () => {
          const dadosMockados = { data: MOCK_API_POSTS, status: 200 };
          const stub = sinon.stub().resolves(dadosMockados); 
          const resultado = await fetchPostsFromAPI({ get: stub }); 
          expect(resultado.status).to.equal(200);
          expect(resultado.data).to.have.lengthOf(2);
          expect(stub.calledOnce).to.be.true;
      });

      it('4.2. Deve simular um erro de servidor 500 (Status 500)', async () => {
          const erroMockado = { error: 'Falha de Autenticação', status: 500 };
          const stub = sinon.stub().resolves(erroMockado); 
          const resultado = await fetchPostsFromAPI({ get: stub }); 
          expect(resultado.status).to.equal(500);
          expect(resultado).to.have.property('error');
      });

      it('4.3. Deve simular uma resposta vazia da API (Status 200 e Array Vazio)', async () => {
          const dadosVazios = { data: [], status: 200 };
          const stub = sinon.stub().resolves(dadosVazios); 
          const resultado = await fetchPostsFromAPI({ get: stub }); 
          resultado.status.should.equal(200);
          resultado.data.should.be.an('array').with.lengthOf(0);
      });

      it('4.4. Deve simular uma falha de conexão (Promise Rejeitada)', async () => {
          const stub = sinon.stub().rejects(new Error('Falha de Conexão na API')); 
          try {
              await fetchPostsFromAPI({ get: stub });
              assert.fail('A chamada da API deveria ter lançado um erro.');
          } catch (error) {
              expect(error.message).to.include('Falha de Conexão');
          }
      });
      
      it('4.5. Deve garantir que o serviço HTTP foi chamado exatamente uma vez', async () => {
          const stub = sinon.stub().resolves({});
          await fetchPostsFromAPI({ get: stub }); 
          sinon.assert.calledOnce(stub);
      });
  });
});
