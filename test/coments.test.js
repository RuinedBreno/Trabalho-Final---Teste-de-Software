const assert = require('chai').assert; // Assert Style
const expect = require('chai').expect; // Expect Style
const should = require('chai').should(); // Should Style
const sinon = require('sinon'); // Para os testes Mockados/Stubados

// Importa as funções que estão no seu arquivo src/coments.js
const { 
  addCommentToPost, 
  getCommentsByPostId, 
  updateComment, 
  deleteComment,
  countTotalComments
} = require('../src/coments'); 

// Variáveis e Dados de Teste
const POST_ID_VALIDO = 101;
const COMENTARIO_FALSO = { body: 'Novo comentário de teste', username: 'Tester' };
const ID_COMENTARIO = 50;
const LISTA_MOCK_COMENTARIOS = [
  { id: 1, username: "maria_comenta" },
  { id: 2, username: "joao_silva" },
  { id: 3, username: "maria_comenta" },
  { id: 4, username: "ana_lima" },
];

// Uma função fake que será usada no teste mockado para simular uma chamada HTTP
// Esta função precisa ser criada para ser "mockável" pelo Sinon
async function mockableHttpCall() {
    // Em um cenário real, aqui seria feita uma chamada de API usando fetch ou axios.
    // Para o teste, ela é apenas um placeholder.
    return new Promise(resolve => resolve({ data: LISTA_MOCK_COMENTARIOS, status: 200 }));
}


describe('Testes Unitários e Mockados', () => {

  // =========================================================================
  // I. TESTES COM ASSERT STYLE (5 Asserts diferentes exigidos)
  // =========================================================================
  describe('ASSERT Style (Validação do Resultado)', () => {

    // Assert 1: throws (addCommentToPost)
    it('1.1. addCommentToPost: Deve lançar erro se o corpo estiver ausente (assert.throws)', () => {
      assert.throws(() => addCommentToPost(POST_ID_VALIDO, { author: 'Sem corpo' }), Error, 'Dados inválidos para adicionar comentário.');
    });

    // Assert 2: isArray (getCommentsByPostId)
    it('1.2. getCommentsByPostId: O retorno deve ser um array (assert.isArray)', () => {
      const resultado = getCommentsByPostId(POST_ID_VALIDO);
      assert.isArray(resultado, 'A função deve retornar um Array de comentários.');
    });

    // Assert 3: deepEqual (updateComment)
    it('1.3. updateComment: Deve retornar o objeto com o novo texto (assert.deepEqual)', () => {
      const novoTexto = 'Texto atualizado via assert';
      const resultado = updateComment(ID_COMENTARIO, novoTexto);
      const esperado = { id: ID_COMENTARIO, body: novoTexto };
      assert.deepEqual(resultado, esperado, 'O objeto retornado deve ser exatamente igual ao esperado.');
    });

    // Assert 4: include (deleteComment)
    it('1.4. deleteComment: Deve incluir a mensagem de "sucesso" na resposta (assert.include)', () => {
      const resultado = deleteComment(ID_COMENTARIO);
      assert.include(resultado, { status: 'sucesso' }, 'O status da remoção deve ser sucesso.');
    });

    // Assert 5: isNumber (countTotalComments)
    it('1.5. countTotalComments: O resultado da contagem deve ser um número (assert.isNumber)', () => {
        const resultado = countTotalComments(LISTA_MOCK_COMENTARIOS, 'maria_comenta');
        assert.isNumber(resultado, 'O valor de retorno deve ser um número.');
    });

  });

  // =========================================================================
  // II. TESTES COM EXPECT STYLE (5 Expects diferentes exigidos)
  // =========================================================================
  describe('EXPECT Style (Validação do Resultado)', () => {
    
    // Expect 1: to.be.true (getCommentsByPostId)
    it('2.1. getCommentsByPostId: Deve retornar um array com mais de 0 itens (expect.to.be.true)', () => {
      const resultado = getCommentsByPostId(POST_ID_VALIDO);
      expect(resultado.length > 0).to.be.true; 
    });

    // Expect 2: to.have.property (addCommentToPost)
    it('2.2. addCommentToPost: O resultado deve ter a propriedade "postId" (expect.to.have.property)', () => {
      const novoComentario = addCommentToPost(POST_ID_VALIDO, COMENTARIO_FALSO);
      expect(novoComentario).to.have.property('postId').that.is.a('number');
    });

    // Expect 3: to.have.lengthOf (getCommentsByPostId)
    it('2.3. getCommentsByPostId: Deve retornar 2 comentários (expect.to.have.lengthOf)', () => {
      const resultado = getCommentsByPostId(POST_ID_VALIDO);
      expect(resultado).to.have.lengthOf(2);
    });

    // Expect 4: to.equal (deleteComment)
    it('2.4. deleteComment: O status deve ser "sucesso" (expect.to.equal)', () => {
      const resultado = deleteComment(ID_COMENTARIO);
      expect(resultado.status).to.equal('sucesso');
    });

    // Expect 5: to.be.below (countTotalComments)
    it('2.5. countTotalComments: A contagem deve ser menor que 5 (expect.to.be.below)', () => {
        const resultado = countTotalComments(LISTA_MOCK_COMENTARIOS, 'maria_comenta');
        expect(resultado).to.be.below(5);
    });
  });

  // =========================================================================
  // III. TESTES COM SHOULD STYLE (5 Shoulds diferentes exigidos)
  // =========================================================================
  describe('SHOULD Style (Validação do Resultado)', () => {
    
    // Should 1: .should.be.an('object') (deleteComment)
    it('3.1. deleteComment: A resposta deve ser um objeto (should.be.an)', () => {
      const resultado = deleteComment(ID_COMENTARIO);
      resultado.should.be.an('object');
    });

    // Should 2: .should.have.length.of (getCommentsByPostId)
    it('3.2. getCommentsByPostId: O retorno deve ter um comprimento de 2 (should.have.length.of)', () => {
      getCommentsByPostId(POST_ID_VALIDO).should.have.lengthOf(2);
    });
    
    // Should 3: .should.equal (updateComment)
    it('3.3. updateComment: O ID do comentário retornado deve ser 50 (should.equal)', () => {
      const resultado = updateComment(ID_COMENTARIO, 'novo texto');
      resultado.id.should.equal(50);
    });

    // Should 4: .should.not.throw (getCommentsByPostId - Sucesso)
    it('3.4. getCommentsByPostId: Não deve lançar erro com ID válido (should.not.throw)', () => {
      (() => getCommentsByPostId(POST_ID_VALIDO)).should.not.throw();
    });
    
    // Should 5: .should.deep.include (addCommentToPost)
    it('3.5. addCommentToPost: Deve incluir as informações enviadas (should.deep.include)', () => {
        const novoComentario = addCommentToPost(POST_ID_VALIDO, COMENTARIO_FALSO);
        novoComentario.should.deep.include(COMENTARIO_FALSO); 
    });
  });

  // =========================================================================
  // IV. TESTES MOCKADOS/STUBADOS COM SINON (5 Testes exigidos)
  // =========================================================================
  describe('Testes Mockados/Stubados com Sinon (Simulando API)', () => {
      
      // Hook para garantir que o stub seja removido/restaurado após cada teste
      afterEach(() => {
          sinon.restore(); 
      });
      
      // Teste Mockado 1: Simulação de Sucesso (Status 200)
      it('4.1. Deve simular uma chamada de API bem-sucedida (Status 200)', async () => {
          const dadosMockados = { data: LISTA_MOCK_COMENTARIOS, status: 200 };
          
          // Cria um Stub para a função que faria a chamada de API e a força a retornar o dado mockado
          const stub = sinon.stub().resolves(dadosMockados); 

          const resultado = await stub(); // Chama a função "mockada"

          // Asserções para o dado mockado
          expect(resultado.status).to.equal(200);
          expect(resultado.data).to.have.lengthOf(4);
          expect(stub.calledOnce).to.be.true; // Verifica se o stub foi executado
      });

      // Teste Mockado 2: Simulação de Erro de Servidor (Status 500)
      it('4.2. Deve simular um erro de servidor 500 (Status 500)', async () => {
          const erroMockado = { error: 'Erro de Servidor', status: 500 };
          
          const stub = sinon.stub().resolves(erroMockado); 

          const resultado = await stub(); 

          // Asserções para o erro
          expect(resultado.status).to.equal(500);
          expect(resultado).to.have.property('error', 'Erro de Servidor');
      });

      // Teste Mockado 3: Verificação de Argumentos (Simulando o endpoint)
      it('4.3. Deve verificar se o stub foi chamado com o argumento correto (Endpoint /comments)', async () => {
          const stub = sinon.stub().resolves({ status: 200, data: [] });

          // Chama o stub, simulando a passagem do endpoint
          await stub('/comments'); 

          // Asserções
          expect(stub.calledWith('/comments')).to.be.true;
          stub.args[0][0].should.be.a('string'); // O primeiro argumento deve ser uma string
      });

      // Teste Mockado 4: Simulação de Timeout/Falha na Rede (Rejeição)
      it('4.4. Deve simular uma falha de conexão ou timeout (Promise Rejeitada)', async () => {
          const stub = sinon.stub().rejects(new Error('Network Timeout')); 

          // Captura a rejeição
          try {
              await stub();
              // Se chegar aqui, o teste falha, pois o erro deveria ter sido lançado
              assert.fail('A função deveria ter lançado um erro.');
          } catch (error) {
              // Verifica se o erro lançado corresponde ao esperado
              expect(error.message).to.equal('Network Timeout');
          }
      });
      
      // Teste Mockado 5: Verificação de Chamada (Simulando uma função de log)
      it('4.5. Deve verificar se uma função de log foi chamada após o sucesso', async () => {
          const logSpy = sinon.spy(); // Cria um Spy para rastrear chamadas
          const stub = sinon.stub().resolves({ status: 200, data: [] });

          await stub(); // Executa o serviço
          logSpy(); // Executa o log que aconteceria depois

          // Asserções
          // Verifica se o Spy (função de log) foi chamado após o stub (serviço)
          expect(logSpy.calledAfter(stub)).to.be.true; 
          expect(logSpy.calledOnce).to.be.true;
      });
  });

});