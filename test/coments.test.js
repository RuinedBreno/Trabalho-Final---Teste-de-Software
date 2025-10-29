const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const sinon = require('sinon');

const { 
  addCommentToPost, 
  getCommentsByPostId, 
  updateComment, 
  deleteComment,
  countTotalComments
} = require('../src/coments'); 

const POST_ID_VALIDO = 101;
const COMENTARIO_FALSO = { body: 'Novo comentário de teste', username: 'Tester' };
const ID_COMENTARIO = 50;
const LISTA_MOCK_COMENTARIOS = [
  { id: 1, username: "maria_comenta" },
  { id: 2, username: "joao_silva" },
  { id: 3, username: "maria_comenta" },
  { id: 4, username: "ana_lima" },
];

async function mockableHttpCall() {
  return new Promise(resolve => resolve({ data: LISTA_MOCK_COMENTARIOS, status: 200 }));
}

describe('Testes Unitários e Mockados', () => {
  describe('ASSERT Style (Validação do Resultado)', () => {
    it('1.1. addCommentToPost: Deve lançar erro se o corpo estiver ausente (assert.throws)', () => {
      assert.throws(() => addCommentToPost(POST_ID_VALIDO, { author: 'Sem corpo' }), Error, 'Dados inválidos para adicionar comentário.');
    });

    it('1.2. getCommentsByPostId: O retorno deve ser um array (assert.isArray)', () => {
      const resultado = getCommentsByPostId(POST_ID_VALIDO);
      assert.isArray(resultado, 'A função deve retornar um Array de comentários.');
    });

    it('1.3. updateComment: Deve retornar o objeto com o novo texto (assert.deepEqual)', () => {
      const novoTexto = 'Texto atualizado via assert';
      const resultado = updateComment(ID_COMENTARIO, novoTexto);
      const esperado = { id: ID_COMENTARIO, body: novoTexto };
      assert.deepEqual(resultado, esperado, 'O objeto retornado deve ser exatamente igual ao esperado.');
    });

    it('1.4. deleteComment: Deve incluir a mensagem de "sucesso" na resposta (assert.include)', () => {
      const resultado = deleteComment(ID_COMENTARIO);
      assert.include(resultado, { status: 'sucesso' }, 'O status da remoção deve ser sucesso.');
    });

    it('1.5. countTotalComments: O resultado da contagem deve ser um número (assert.isNumber)', () => {
      const resultado = countTotalComments(LISTA_MOCK_COMENTARIOS, 'maria_comenta');
      assert.isNumber(resultado, 'O valor de retorno deve ser um número.');
    });
  });

  describe('EXPECT Style (Validação do Resultado)', () => {
    it('2.1. getCommentsByPostId: Deve retornar um array com mais de 0 itens (expect.to.be.true)', () => {
      const resultado = getCommentsByPostId(POST_ID_VALIDO);
      expect(resultado.length > 0).to.be.true; 
    });

    it('2.2. addCommentToPost: O resultado deve ter a propriedade "postId" (expect.to.have.property)', () => {
      const novoComentario = addCommentToPost(POST_ID_VALIDO, COMENTARIO_FALSO);
      expect(novoComentario).to.have.property('postId').that.is.a('number');
    });

    it('2.3. getCommentsByPostId: Deve retornar 2 comentários (expect.to.have.lengthOf)', () => {
      const resultado = getCommentsByPostId(POST_ID_VALIDO);
      expect(resultado).to.have.lengthOf(2);
    });

    it('2.4. deleteComment: O status deve ser "sucesso" (expect.to.equal)', () => {
      const resultado = deleteComment(ID_COMENTARIO);
      expect(resultado.status).to.equal('sucesso');
    });

    it('2.5. countTotalComments: A contagem deve ser menor que 5 (expect.to.be.below)', () => {
      const resultado = countTotalComments(LISTA_MOCK_COMENTARIOS, 'maria_comenta');
      expect(resultado).to.be.below(5);
    });
  });

  describe('SHOULD Style (Validação do Resultado)', () => {
    it('3.1. deleteComment: A resposta deve ser um objeto (should.be.an)', () => {
      const resultado = deleteComment(ID_COMENTARIO);
      resultado.should.be.an('object');
    });

    it('3.2. getCommentsByPostId: O retorno deve ter um comprimento de 2 (should.have.length.of)', () => {
      getCommentsByPostId(POST_ID_VALIDO).should.have.lengthOf(2);
    });
    
    it('3.3. updateComment: O ID do comentário retornado deve ser 50 (should.equal)', () => {
      const resultado = updateComment(ID_COMENTARIO, 'novo texto');
      resultado.id.should.equal(50);
    });

    it('3.4. getCommentsByPostId: Não deve lançar erro com ID válido (should.not.throw)', () => {
      (() => getCommentsByPostId(POST_ID_VALIDO)).should.not.throw();
    });
    
    it('3.5. addCommentToPost: Deve incluir as informações enviadas (should.deep.include)', () => {
      const novoComentario = addCommentToPost(POST_ID_VALIDO, COMENTARIO_FALSO);
      novoComentario.should.deep.include(COMENTARIO_FALSO); 
    });
  });

  describe('Testes Mockados/Stubados com Sinon (Simulando API)', () => {
    afterEach(() => {
      sinon.restore(); 
    });
      
    it('4.1. Deve simular uma chamada de API bem-sucedida (Status 200)', async () => {
      const dadosMockados = { data: LISTA_MOCK_COMENTARIOS, status: 200 };
      const stub = sinon.stub().resolves(dadosMockados); 
      const resultado = await stub(); 
      expect(resultado.status).to.equal(200);
      expect(resultado.data).to.have.lengthOf(4);
      expect(stub.calledOnce).to.be.true;
    });

    it('4.2. Deve simular um erro de servidor 500 (Status 500)', async () => {
      const erroMockado = { error: 'Erro de Servidor', status: 500 };
      const stub = sinon.stub().resolves(erroMockado); 
      const resultado = await stub(); 
      expect(resultado.status).to.equal(500);
      expect(resultado).to.have.property('error', 'Erro de Servidor');
    });

    it('4.3. Deve verificar se o stub foi chamado com o argumento correto (Endpoint /comments)', async () => {
      const stub = sinon.stub().resolves({ status: 200, data: [] });
      await stub('/comments'); 
      expect(stub.calledWith('/comments')).to.be.true;
      stub.args[0][0].should.be.a('string');
    });

    it('4.4. Deve simular uma falha de conexão ou timeout (Promise Rejeitada)', async () => {
      const stub = sinon.stub().rejects(new Error('Network Timeout')); 
      try {
        await stub();
        assert.fail('A função deveria ter lançado um erro.');
      } catch (error) {
        expect(error.message).to.equal('Network Timeout');
      }
    });
      
    it('4.5. Deve verificar se uma função de log foi chamada após o sucesso', async () => {
      const logSpy = sinon.spy();
      const stub = sinon.stub().resolves({ status: 200, data: [] });
      await stub();
      logSpy();
      expect(logSpy.calledAfter(stub)).to.be.true; 
      expect(logSpy.calledOnce).to.be.true;
    });
  });
});
