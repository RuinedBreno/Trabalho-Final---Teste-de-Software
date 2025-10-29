const assert = require('chai').assert; 
const expect = require('chai').expect; 
const should = require('chai').should(); 
const sinon = require('sinon'); 

const { 
  createTodo,
  getTodosByUserId,
  markTodoAsCompleted,
  deleteTodo,
} = require('../src/todos'); 

const USER_ID_VALIDO = 10;
const TODO_ID_VALIDO = 50;
const TODO_DATA_VALIDA = { userId: USER_ID_VALIDO, title: 'Testar todas as asserções' };
const TODO_DATA_FALTA_TITULO = { userId: USER_ID_VALIDO };

const MOCK_API_TODOS = [
    { id: 201, title: 'API Todo 1', completed: false },
    { id: 202, title: 'API Todo 2', completed: true },
];

async function fetchTodosFromAPI(httpService) {
    return httpService.get('/todos'); 
}


describe('Testes Unitários e Mockados de Tarefas (TODOs) - Nota 7', () => {

  describe('ASSERT Style', () => {

    it('1.1. createTodo: Deve lançar erro se o título estiver ausente (assert.throws)', () => {
      assert.throws(() => createTodo(TODO_DATA_FALTA_TITULO), Error, 'Dados inválidos para criar a tarefa.');
    });

    it('1.2. getTodosByUserId: O retorno deve ser um array de tarefas (assert.isArray)', () => {
      assert.isArray(getTodosByUserId(USER_ID_VALIDO), 'A função deve retornar um Array.');
    });

    it('1.3. markTodoAsCompleted: O retorno deve ser um objeto (assert.isObject)', () => {
      assert.isObject(markTodoAsCompleted(TODO_ID_VALIDO), 'O resultado deve ser um Objeto.');
    });

    it('1.4. deleteTodo: Deve incluir o status de "sucesso" na resposta (assert.include)', () => {
      assert.include(deleteTodo(TODO_ID_VALIDO), { status: 'sucesso' }, 'O status da remoção deve ser sucesso.');
    });

    it('1.5. createTodo: O ID da nova tarefa deve ser um número (assert.isNumber)', () => {
        const novoTodo = createTodo(TODO_DATA_VALIDA);
        assert.isNumber(novoTodo.id, 'O ID deve ser um número.');
    });
    
    it('1.6. createTodo: A nova tarefa deve ter "completed" como false por padrão (assert.isFalse)', () => {
        const novoTodo = createTodo(TODO_DATA_VALIDA);
        assert.isFalse(novoTodo.completed, 'O status inicial deve ser falso.');
    });
    
    it('1.7. markTodoAsCompleted: A tarefa retornada deve estar concluída (assert.isTrue)', () => {
        const resultado = markTodoAsCompleted(TODO_ID_VALIDO);
        assert.isTrue(resultado.completed, 'A tarefa deve estar marcada como concluída.');
    });

  });
  
  describe('EXPECT Style', () => {

    it('2.1. createTodo: O retorno deve ser um objeto (expect.to.be.a)', () => {
      expect(createTodo(TODO_DATA_VALIDA)).to.be.a('object');
    });

    it('2.2. markTodoAsCompleted: A tarefa deve ter a propriedade "completed" (expect.to.have.property)', () => {
      expect(markTodoAsCompleted(TODO_ID_VALIDO)).to.have.property('completed');
    });

    it('2.3. getTodosByUserId: A lista deve ter 3 tarefas (expect.to.have.lengthOf)', () => {
      expect(getTodosByUserId(USER_ID_VALIDO)).to.have.lengthOf(3);
    });

    it('2.4. deleteTodo: O objeto de status não deve ser nulo (expect.to.not.be.null)', () => {
      expect(deleteTodo(TODO_ID_VALIDO)).to.not.be.null;
    });

    it('2.5. deleteTodo: A mensagem de retorno deve ser exata (expect.to.equal)', () => {
      const mensagemEsperada = `Tarefa com ID ${TODO_ID_VALIDO} foi removida.`;
      expect(deleteTodo(TODO_ID_VALIDO).message).to.equal(mensagemEsperada);
    });
    
    it('2.6. getTodosByUserId: Deve haver pelo menos uma tarefa concluída na lista (expect.to.be.true)', () => {
        const lista = getTodosByUserId(USER_ID_VALIDO);
        const tarefaConcluidaExiste = lista.some(t => t.completed === true);
        expect(tarefaConcluidaExiste).to.be.true;
    });
    
    it('2.7. getTodosByUserId: Deve lançar erro se o ID do usuário não for um número (expect.to.throw)', () => {
        expect(() => getTodosByUserId('ID Invalido')).to.throw('ID do usuário inválido.');
    });
    
    it('2.8. createTodo: O ID gerado deve ser superior a 201 (expect.to.be.above)', () => {
        const novoTodo = createTodo(TODO_DATA_VALIDA);
        expect(novoTodo.id).to.be.above(201);
    });
  });

  
  describe('SHOULD Style', () => {
    
    it('3.1. createTodo: Não deve lançar erro com dados válidos (should.not.throw)', () => {
      (() => createTodo(TODO_DATA_VALIDA)).should.not.throw();
    });

    it('3.2. getTodosByUserId: O retorno deve ser do tipo array (should.be.an)', () => {
      getTodosByUserId(USER_ID_VALIDO).should.be.an('array');
    });

    it('3.3. getTodosByUserId: O retorno deve ter um comprimento de 3 (should.have.lengthOf)', () => {
      getTodosByUserId(USER_ID_VALIDO).should.have.lengthOf(3);
    });
    
    it('3.4. createTodo: A nova tarefa deve ter a propriedade "userId" (should.have.property)', () => {
      createTodo(TODO_DATA_VALIDA).should.have.property('userId');
    });

    it('3.5. markTodoAsCompleted: O status concluído deve ser true (should.equal)', () => {
        markTodoAsCompleted(TODO_ID_VALIDO).completed.should.equal(true);
    });
    
    it('3.6. deleteTodo: Deve lançar erro se o ID da tarefa for nulo (should.throw)', () => {
      (() => deleteTodo(null)).should.throw('ID da tarefa inválido.');
    });
    
    it('3.7. createTodo: O objeto retornado deve conter o título e o userId enviados (should.deep.include)', () => {
      createTodo(TODO_DATA_VALIDA).should.deep.include(TODO_DATA_VALIDA);
    });
  });

  
  describe('Testes Mockados/Stubados com Sinon', () => {
      
      afterEach(() => {
          sinon.restore(); 
      });
      
      it('4.1. Deve simular uma chamada de API bem-sucedida (Status 200) e retornar dados', async () => {
          const dadosMockados = { data: MOCK_API_TODOS, status: 200 };
          
          const stub = sinon.stub().resolves(dadosMockados); 

          const resultado = await fetchTodosFromAPI({ get: stub }); 

          expect(resultado.status).to.equal(200);
          expect(resultado.data).to.have.lengthOf(2);
      });

      it('4.2. Deve simular um erro de servidor 500 (Status 500)', async () => {
          const erroMockado = { error: 'Falha do Servidor', status: 500 };
          
          const stub = sinon.stub().resolves(erroMockado); 

          const resultado = await fetchTodosFromAPI({ get: stub }); 

          expect(resultado.status).to.equal(500);
          expect(resultado).to.have.property('error');
      });

      it('4.3. Deve simular uma resposta vazia da API (Status 200 e Array Vazio)', async () => {
          const dadosVazios = { data: [], status: 200 };
          
          const stub = sinon.stub().resolves(dadosVazios); 

          const resultado = await fetchTodosFromAPI({ get: stub }); 

          resultado.status.should.equal(200);
          resultado.data.should.be.an('array').with.lengthOf(0);
      });

      it('4.4. Deve simular uma falha de conexão (Promise Rejeitada)', async () => {
          const stub = sinon.stub().rejects(new Error('Falha de Rede: Timeout')); 

          try {
              await fetchTodosFromAPI({ get: stub });
              assert.fail('A chamada da API deveria ter lançado um erro.');
          } catch (error) {
              expect(error.message).to.include('Timeout');
          }
      });
      
      it('4.5. Deve garantir que o serviço HTTP foi chamado exatamente uma vez', async () => {
          const stub = sinon.stub().resolves({});

          await fetchTodosFromAPI({ get: stub }); 

          sinon.assert.calledOnce(stub);
      });
  });

});