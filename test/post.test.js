const assert = require('chai').assert; // Assert Style
const expect = require('chai').expect; // Expect Style
const should = require('chai').should(); // Should Style (deve ser chamado como função)
const sinon = require('sinon'); // Para os testes Mockados/Stubados

// 1. Importa todas as 7 funções do seu arquivo src/post.js
const { 
    createPost, 
    getAllPosts, 
    updatePost, 
    getPostById, 
    deletePost, 
    getPostsByUserId, 
    associatePostToUser
} = require('../src/post'); 

// Variáveis e Dados de Teste
const POST_DATA_VALIDO = { title: 'Meu Post', body: 'Conteúdo do post.' };
const ID_POST = 15;
const ID_USUARIO = 5;

// Dados mockados para simular a resposta de uma API
const MOCK_API_POSTS = [
    { id: 10, title: 'Mock Post 1' },
    { id: 11, title: 'Mock Post 2' },
];

// Função que simula o serviço que faria a chamada real à API (para ser mockada pelo Sinon)
async function fetchPostsFromAPI(httpService) {
    // Em um cenário real, httpService seria Axios, Fetch, etc.
    return httpService.get('/posts'); 
}


describe('Testes Unitários e Mockados de Posts (Nota 6)', () => {

  // =========================================================================
  // I. TESTES COM ASSERT STYLE (Mínimo 5 Asserts diferentes)
  // =========================================================================
  describe('ASSERT Style', () => {

    // Assert 1: throws (Testa Erro em createPost)
    it('1.1. createPost: Deve lançar erro se o título estiver ausente (assert.throws)', () => {
      assert.throws(() => createPost({ body: 'sem titulo' }), Error, 'Dados inválidos para criar o post.');
    });

    // Assert 2: isArray (Testa getAllPosts)
    it('1.2. getAllPosts: O retorno deve ser um array de posts (assert.isArray)', () => {
      assert.isArray(getAllPosts(), 'A função deve retornar um Array.');
    });

    // Assert 3: deepEqual (Testa updatePost - verifica conteúdo)
    it('1.3. updatePost: Deve retornar o post com o título atualizado (assert.deepEqual)', () => {
      const dadosAtualizados = { title: 'Novo Título' };
      const resultado = updatePost(ID_POST, dadosAtualizados);
      const esperado = { id: ID_POST, title: 'Novo Título' };
      assert.deepEqual(resultado, esperado, 'O objeto atualizado deve corresponder ao esperado.');
    });

    // Assert 4: isObject (Testa getPostById)
    it('1.4. getPostById: O retorno de um post deve ser um objeto (assert.isObject)', () => {
      assert.isObject(getPostById(ID_POST), 'O resultado deve ser um Objeto.');
    });

    // Assert 5: include (Testa deletePost - verifica status)
    it('1.5. deletePost: Deve incluir o status de "sucesso" na resposta (assert.include)', () => {
      assert.include(deletePost(ID_POST), { status: 'sucesso' }, 'O status da remoção deve ser sucesso.');
    });
    
    // Assert 6: strictEqual (Testa getPostsByUserId - verifica tamanho)
    it('1.6. getPostsByUserId: Deve retornar 2 posts (assert.strictEqual)', () => {
        const resultado = getPostsByUserId(ID_USUARIO);
        assert.strictEqual(resultado.length, 2, 'O array deve ter exatamente 2 posts.');
    });

  });

  // =========================================================================
  // II. TESTES COM EXPECT STYLE (Mínimo 5 Expects diferentes)
  // =========================================================================
  describe('EXPECT Style', () => {

    // Expect 1: to.be.a (Testa associatePostToUser - tipo de retorno)
    it('2.1. associatePostToUser: O retorno deve ser um objeto (expect.to.be.a)', () => {
      expect(associatePostToUser(ID_POST, ID_USUARIO)).to.be.a('object');
    });

    // Expect 2: to.have.property (Testa createPost - verifica propriedade)
    it('2.2. createPost: O post criado deve ter a propriedade "body" (expect.to.have.property)', () => {
      const novoPost = createPost(POST_DATA_VALIDO);
      expect(novoPost).to.have.property('body');
    });

    // Expect 3: to.have.lengthOf (Testa getAllPosts - verifica tamanho)
    it('2.3. getAllPosts: A lista completa deve ter 3 posts (expect.to.have.lengthOf)', () => {
      expect(getAllPosts()).to.have.lengthOf(3);
    });

    // Expect 4: to.not.be.null (Testa getPostById - verifica existência)
    it('2.4. getPostById: O post retornado não deve ser nulo (expect.to.not.be.null)', () => {
      expect(getPostById(ID_POST)).to.not.be.null;
    });

    // Expect 5: to.be.true (Testa getPostsByUserId - lógica booleana)
    it('2.5. getPostsByUserId: O primeiro post deve ter o ID de usuário correto (expect.to.be.true)', () => {
      const post = getPostsByUserId(ID_USUARIO)[0];
      expect(post.userId === ID_USUARIO).to.be.true;
    });

    // Expect 6: to.equal (Testa deletePost - verifica mensagem)
    it('2.6. deletePost: A mensagem de retorno deve ser exata (expect.to.equal)', () => {
      const mensagemEsperada = `Post com ID ${ID_POST} foi removido.`;
      expect(deletePost(ID_POST).message).to.equal(mensagemEsperada);
    });
  });

  // =========================================================================
  // III. TESTES COM SHOULD STYLE (Mínimo 5 Shoulds diferentes)
  // =========================================================================
  describe('SHOULD Style', () => {
    
    // Should 1: should.not.throw (Testa createPost - sucesso)
    it('3.1. createPost: Não deve lançar erro com dados válidos (should.not.throw)', () => {
      (() => createPost(POST_DATA_VALIDO)).should.not.throw();
    });

    // Should 2: should.be.an('array') (Testa getPostsByUserId)
    it('3.2. getPostsByUserId: O retorno deve ser do tipo array (should.be.an)', () => {
      getPostsByUserId(ID_USUARIO).should.be.an('array');
    });

    // Should 3: should.have.property (Testa associatePostToUser)
    it('3.3. associatePostToUser: O post associado deve ter a propriedade "userId" (should.have.property)', () => {
      associatePostToUser(ID_POST, ID_USUARIO).should.have.property('userId');
    });
    
    // Should 4: should.be.at.least (Testa getAllPosts)
    it('3.4. getAllPosts: O número de posts deve ser de no mínimo 3 (should.be.at.least)', () => {
        getAllPosts().length.should.be.at.least(3);
    });

    // Should 5: should.equal (Testa getPostById)
    it('3.5. getPostById: O ID do post retornado deve ser igual ao solicitado (should.equal)', () => {
        getPostById(ID_POST).id.should.equal(ID_POST);
    });
    
    // Should 6: should.deep.include (Testa updatePost - verifica propriedades)
    it('3.6. updatePost: O objeto retornado deve conter o ID e o novo corpo (should.deep.include)', () => {
      const updatedBody = 'Corpo Alterado';
      updatePost(ID_POST, { body: updatedBody }).should.deep.include({ id: ID_POST, body: updatedBody });
    });
  });

  // =========================================================================
  // IV. TESTES MOCKADOS/STUBADOS COM SINON (5 Testes exigidos)
  // =========================================================================
  describe('Testes Mockados/Stubados com Sinon', () => {
      
      // Garante que o stub seja restaurado após cada teste
      afterEach(() => {
          sinon.restore(); 
      });
      
      // Teste Mockado 1: Simulação de Sucesso (Status 200)
      it('4.1. Deve simular uma chamada de API bem-sucedida (Status 200) e retornar dados', async () => {
          const dadosMockados = { data: MOCK_API_POSTS, status: 200 };
          
          // Cria um Stub que simula o serviço HTTP e resolve com o dado mockado
          const stub = sinon.stub().resolves(dadosMockados); 

          const resultado = await fetchPostsFromAPI({ get: stub }); 

          // Asserções para o dado mockado
          expect(resultado.status).to.equal(200);
          expect(resultado.data).to.have.lengthOf(2);
          expect(stub.calledOnce).to.be.true; // Verifica se a chamada foi executada
      });

      // Teste Mockado 2: Simulação de Erro de Servidor (Status 500)
      it('4.2. Deve simular um erro de servidor 500 (Status 500)', async () => {
          const erroMockado = { error: 'Falha de Autenticação', status: 500 };
          
          const stub = sinon.stub().resolves(erroMockado); 

          const resultado = await fetchPostsFromAPI({ get: stub }); 

          // Asserções para o erro
          expect(resultado.status).to.equal(500);
          expect(resultado).to.have.property('error');
      });

      // Teste Mockado 3: Simulação de Dados Vazios (Status 200, Array Vazio)
      it('4.3. Deve simular uma resposta vazia da API (Status 200 e Array Vazio)', async () => {
          const dadosVazios = { data: [], status: 200 };
          
          const stub = sinon.stub().resolves(dadosVazios); 

          const resultado = await fetchPostsFromAPI({ get: stub }); 

          // Asserções para o dado vazio
          resultado.status.should.equal(200);
          resultado.data.should.be.an('array').with.lengthOf(0);
      });

      // Teste Mockado 4: Simulação de Timeout/Falha de Rede (Rejeição da Promise)
      it('4.4. Deve simular uma falha de conexão (Promise Rejeitada)', async () => {
          const stub = sinon.stub().rejects(new Error('Falha de Conexão na API')); 

          // Captura a rejeição
          try {
              await fetchPostsFromAPI({ get: stub });
              // Se a execução chegar aqui, o teste falha (erro deveria ter sido lançado)
              assert.fail('A chamada da API deveria ter lançado um erro.');
          } catch (error) {
              // Verifica se a mensagem de erro corresponde ao esperado
              expect(error.message).to.include('Falha de Conexão');
          }
      });
      
      // Teste Mockado 5: Verificação de Chamada (Garantindo que a função foi chamada)
      it('4.5. Deve garantir que o serviço HTTP foi chamado exatamente uma vez', async () => {
          const stub = sinon.stub().resolves({});

          await fetchPostsFromAPI({ get: stub }); 

          // Asserção
          sinon.assert.calledOnce(stub);
      });
  });

});