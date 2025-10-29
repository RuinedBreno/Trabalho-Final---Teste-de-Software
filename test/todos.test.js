const assert = require('chai').assert; // Assert Style
const expect = require('chai').expect; // Expect Style
const should = require('chai').should(); // Should Style
const sinon = require('sinon'); // Para os testes Mockados/Stubados

// 1. Importa as funções do seu arquivo src/todo.js
const { 
  createTodo,
  getTodosByUserId,
  markTodoAsCompleted,
  deleteTodo,
  // filterPostsByKeyword - Ignorado por ser um post-function no arquivo de todo
} = require('../src/todos'); 

// Variáveis e Dados de Teste
const USER_ID_VALIDO = 10;
const TODO_ID_VALIDO = 50;
const TODO_DATA_VALIDA = { userId: USER_ID_VALIDO, title: 'Testar todas as asserções' };
const TODO_DATA_FALTA_TITULO = { userId: USER_ID_VALIDO };

// Dados mockados para simular a resposta de uma API
const MOCK_API_TODOS = [
    { id: 201, title: 'API Todo 1', completed: false },
    { id: 202, title: 'API Todo 2', completed: true },
];

// Função auxiliar (a ser mockada) que simula o serviço HTTP
async function fetchTodosFromAPI(httpService) {
    // Simula uma chamada GET /todos
    return httpService.get('/todos'); 
}


describe('Testes Unitários e Mockados de Tarefas (TODOs) - Nota 7', () => {

  // =========================================================================
  // I. TESTES COM ASSERT STYLE (7 Asserts diferentes)
  // =========================================================================
  describe('ASSERT Style', () => {

    // Assert 1: throws (Testa Erro em createTodo)
    it('1.1. createTodo: Deve lançar erro se o título estiver ausente (assert.throws)', () => {
      assert.throws(() => createTodo(TODO_DATA_FALTA_TITULO), Error, 'Dados inválidos para criar a tarefa.');
    });

    // Assert 2: isArray (Testa getTodosByUserId)
    it('1.2. getTodosByUserId: O retorno deve ser um array de tarefas (assert.isArray)', () => {
      assert.isArray(getTodosByUserId(USER_ID_VALIDO), 'A função deve retornar um Array.');
    });

    // Assert 3: isObject (Testa markTodoAsCompleted)
    it('1.3. markTodoAsCompleted: O retorno deve ser um objeto (assert.isObject)', () => {
      assert.isObject(markTodoAsCompleted(TODO_ID_VALIDO), 'O resultado deve ser um Objeto.');
    });

    // Assert 4: include (Testa deleteTodo - verifica status)
    it('1.4. deleteTodo: Deve incluir o status de "sucesso" na resposta (assert.include)', () => {
      assert.include(deleteTodo(TODO_ID_VALIDO), { status: 'sucesso' }, 'O status da remoção deve ser sucesso.');
    });

    // Assert 5: isNumber (Testa createTodo - ID)
    it('1.5. createTodo: O ID da nova tarefa deve ser um número (assert.isNumber)', () => {
        const novoTodo = createTodo(TODO_DATA_VALIDA);
        assert.isNumber(novoTodo.id, 'O ID deve ser um número.');
    });
    
    // Assert 6: isFalse (Testa createTodo - completed padrão)
    it('1.6. createTodo: A nova tarefa deve ter "completed" como false por padrão (assert.isFalse)', () => {
        const novoTodo = createTodo(TODO_DATA_VALIDA);
        assert.isFalse(novoTodo.completed, 'O status inicial deve ser falso.');
    });
    
    // Assert 7: isTrue (Testa markTodoAsCompleted)
    it('1.7. markTodoAsCompleted: A tarefa retornada deve estar concluída (assert.isTrue)', () => {
        const resultado = markTodoAsCompleted(TODO_ID_VALIDO);
        assert.isTrue(resultado.completed, 'A tarefa deve estar marcada como concluída.');
    });

  });
  
  // =========================================================================
  // II. TESTES COM EXPECT STYLE (8 Expects diferentes)
  // =========================================================================
  describe('EXPECT Style', () => {

    // Expect 1: to.be.a (Testa createTodo - tipo de retorno)
    it('2.1. createTodo: O retorno deve ser um objeto (expect.to.be.a)', () => {
      expect(createTodo(TODO_DATA_VALIDA)).to.be.a('object');
    });

    // Expect 2: to.have.property (Testa markTodoAsCompleted - verifica propriedade)
    it('2.2. markTodoAsCompleted: A tarefa deve ter a propriedade "completed" (expect.to.have.property)', () => {
      expect(markTodoAsCompleted(TODO_ID_VALIDO)).to.have.property('completed');
    });

    // Expect 3: to.have.lengthOf (Testa getTodosByUserId - verifica tamanho)
    it('2.3. getTodosByUserId: A lista deve ter 3 tarefas (expect.to.have.lengthOf)', () => {
      expect(getTodosByUserId(USER_ID_VALIDO)).to.have.lengthOf(3);
    });

    // Expect 4: to.not.be.null (Testa deleteTodo - verifica existência)
    it('2.4. deleteTodo: O objeto de status não deve ser nulo (expect.to.not.be.null)', () => {
      expect(deleteTodo(TODO_ID_VALIDO)).to.not.be.null;
    });

    // Expect 5: to.equal (Testa deleteTodo - verifica mensagem)
    it('2.5. deleteTodo: A mensagem de retorno deve ser exata (expect.to.equal)', () => {
      const mensagemEsperada = `Tarefa com ID ${TODO_ID_VALIDO} foi removida.`;
      expect(deleteTodo(TODO_ID_VALIDO).message).to.equal(mensagemEsperada);
    });
    
    // Expect 6: to.be.true (Testa se a tarefa é concluída)
    it('2.6. getTodosByUserId: Deve haver pelo menos uma tarefa concluída na lista (expect.to.be.true)', () => {
        const lista = getTodosByUserId(USER_ID_VALIDO);
        const tarefaConcluidaExiste = lista.some(t => t.completed === true);
        expect(tarefaConcluidaExiste).to.be.true;
    });
    
    // Expect 7: to.throw (Testa getTodosByUserId com ID inválido)
    it('2.7. getTodosByUserId: Deve lançar erro se o ID do usuário não for um número (expect.to.throw)', () => {
        expect(() => getTodosByUserId('ID Invalido')).to.throw('ID do usuário inválido.');
    });
    
    // Expect 8: to.be.above (Testa ID gerado)
    it('2.8. createTodo: O ID gerado deve ser superior a 201 (expect.to.be.above)', () => {
        const novoTodo = createTodo(TODO_DATA_VALIDA);
        expect(novoTodo.id).to.be.above(201);
    });
  });

  
  // =========================================================================
  // III. TESTES COM SHOULD STYLE (7 Shoulds diferentes)
  // =========================================================================
  describe('SHOULD Style', () => {
    
    // Should 1: should.not.throw (Testa createTodo - sucesso)
    it('3.1. createTodo: Não deve lançar erro com dados válidos (should.not.throw)', () => {
      (() => createTodo(TODO_DATA_VALIDA)).should.not.throw();
    });

    // Should 2: should.be.an('array') (Testa getTodosByUserId)
    it('3.2. getTodosByUserId: O retorno deve ser do tipo array (should.be.an)', () => {
      getTodosByUserId(USER_ID_VALIDO).should.be.an('array');
    });

    // Should 3: should.have.lengthOf (Testa getTodosByUserId)
    it('3.3. getTodosByUserId: O retorno deve ter um comprimento de 3 (should.have.lengthOf)', () => {
      getTodosByUserId(USER_ID_VALIDO).should.have.lengthOf(3);
    });
    
    // Should 4: should.have.property (Testa createTodo)
    it('3.4. createTodo: A nova tarefa deve ter a propriedade "userId" (should.have.property)', () => {
      createTodo(TODO_DATA_VALIDA).should.have.property('userId');
    });

    // Should 5: should.equal (Testa markTodoAsCompleted - completed)
    it('3.5. markTodoAsCompleted: O status concluído deve ser true (should.equal)', () => {
        markTodoAsCompleted(TODO_ID_VALIDO).completed.should.equal(true);
    });
    
    // Should 6: should.throw (Testa deleteTodo - erro)
    it('3.6. deleteTodo: Deve lançar erro se o ID da tarefa for nulo (should.throw)', () => {
      (() => deleteTodo(null)).should.throw('ID da tarefa inválido.');
    });
    
    // Should 7: should.deep.include (Testa createTodo - verifica input)
    it('3.7. createTodo: O objeto retornado deve conter o título e o userId enviados (should.deep.include)', () => {
      createTodo(TODO_DATA_VALIDA).should.deep.include(TODO_DATA_VALIDA);
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
          const dadosMockados = { data: MOCK_API_TODOS, status: 200 };
          
          // Cria um Stub que simula o serviço HTTP e resolve com o dado mockado
          const stub = sinon.stub().resolves(dadosMockados); 

          const resultado = await fetchTodosFromAPI({ get: stub }); 

          // Asserções para o dado mockado
          expect(resultado.status).to.equal(200);
          expect(resultado.data).to.have.lengthOf(2);
      });

      // Teste Mockado 2: Simulação de Erro de Servidor (Status 500)
      it('4.2. Deve simular um erro de servidor 500 (Status 500)', async () => {
          const erroMockado = { error: 'Falha do Servidor', status: 500 };
          
          const stub = sinon.stub().resolves(erroMockado); 

          const resultado = await fetchTodosFromAPI({ get: stub }); 

          // Asserções para o erro
          expect(resultado.status).to.equal(500);
          expect(resultado).to.have.property('error');
      });

      // Teste Mockado 3: Simulação de Dados Vazios (Status 200, Array Vazio)
      it('4.3. Deve simular uma resposta vazia da API (Status 200 e Array Vazio)', async () => {
          const dadosVazios = { data: [], status: 200 };
          
          const stub = sinon.stub().resolves(dadosVazios); 

          const resultado = await fetchTodosFromAPI({ get: stub }); 

          resultado.status.should.equal(200);
          resultado.data.should.be.an('array').with.lengthOf(0);
      });

      // Teste Mockado 4: Simulação de Rejeição (Falha de Rede/Timeout)
      it('4.4. Deve simular uma falha de conexão (Promise Rejeitada)', async () => {
          const stub = sinon.stub().rejects(new Error('Falha de Rede: Timeout')); 

          // Captura a rejeição
          try {
              await fetchTodosFromAPI({ get: stub });
              // Se a execução chegar aqui, o teste falha (erro deveria ter sido lançado)
              assert.fail('A chamada da API deveria ter lançado um erro.');
          } catch (error) {
              // Verifica se a mensagem de erro corresponde ao esperado
              expect(error.message).to.include('Timeout');
          }
      });
      
      // Teste Mockado 5: Verificação de Chamada (Garantindo que a função foi chamada)
      it('4.5. Deve garantir que o serviço HTTP foi chamado exatamente uma vez', async () => {
          const stub = sinon.stub().resolves({});

          await fetchTodosFromAPI({ get: stub }); 

          // Asserção Sinon
          sinon.assert.calledOnce(stub);
      });
  });

});