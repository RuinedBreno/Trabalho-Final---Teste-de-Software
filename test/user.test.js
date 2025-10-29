const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const sinon = require('sinon');

const { 
  createUser,
  getAllUsers,
  getUserById,
  filterUsersByName,
  updateUser,
  deleteUser,
} = require('../src/user'); 

const USER_DATA_VALIDO = { name: 'João da Silva', email: 'joao@teste.com' };
const ID_USUARIO = 4;
const USUARIOS_MOCK = [
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' },
    { id: 3, name: 'Carlos', email: 'carlos@test.com' },
];

const MOCK_API_USER = [{ id: 99, name: 'Mock User' }];

async function fetchUserFromAPI(httpService) {
    return httpService.get('/users'); 
}

describe('Testes Unitários e Mockados de Usuários (Nota 6)', () => {

  describe('ASSERT Style', () => {
    it('1.1. createUser: Deve lançar erro se o e-mail estiver ausente (assert.throws)', () => {
      assert.throws(() => createUser({ name: 'Sem email' }), Error, 'Dados inválidos para criar o usuário.');
    });

    it('1.2. getAllUsers: O retorno deve ser um array de usuários (assert.isArray)', () => {
      assert.isArray(getAllUsers(), 'A função deve retornar um Array.');
    });

    it('1.3. updateUser: Deve retornar o objeto com o nome atualizado (assert.deepEqual)', () => {
      const dadosAtualizados = { name: 'Novo Nome' };
      const resultado = updateUser(ID_USUARIO, dadosAtualizados);
      const esperado = { id: ID_USUARIO, name: 'Novo Nome' };
      assert.deepEqual(resultado, esperado, 'O objeto atualizado deve corresponder ao esperado.');
    });

    it('1.4. deleteUser: Deve incluir o status de "sucesso" na resposta (assert.include)', () => {
      assert.include(deleteUser(ID_USUARIO), { status: 'sucesso' }, 'O status da remoção deve ser sucesso.');
    });

    it('1.5. getUserById: O retorno de um usuário deve ser um objeto (assert.isObject)', () => {
      assert.isObject(getUserById(ID_USUARIO), 'O resultado deve ser um Objeto.');
    });
    
    it('1.6. filterUsersByName: A busca por "Leanne" deve retornar 1 usuário (assert.strictEqual)', () => {
        const resultado = filterUsersByName('Leanne');
        assert.strictEqual(resultado.length, 1, 'A busca deve retornar exatamente 1 usuário.');
    });
  });

  describe('EXPECT Style', () => {
    it('2.1. filterUsersByName: O retorno deve ser um array (expect.to.be.a)', () => {
      expect(filterUsersByName('Bauch')).to.be.a('array');
    });

    it('2.2. createUser: O usuário criado deve ter a propriedade "email" (expect.to.have.property)', () => {
      const novoUsuario = createUser(USER_DATA_VALIDO);
      expect(novoUsuario).to.have.property('email');
    });

    it('2.3. getAllUsers: A lista completa deve ter 3 usuários (expect.to.have.lengthOf)', () => {
      expect(getAllUsers()).to.have.lengthOf(3);
    });

    it('2.4. getUserById: O usuário retornado não deve ser nulo (expect.to.not.be.null)', () => {
      expect(getUserById(ID_USUARIO)).to.not.be.null;
    });

    it('2.5. filterUsersByName: O nome do primeiro usuário deve incluir "lee" (ignora case)', () => {
      const filteredUsers = filterUsersByName('Leanne');
      expect(filteredUsers).to.be.an('array').with.length.at.least(1); 
      expect(filteredUsers[0].name.toLowerCase()).to.include('leanne');
    });

    it('2.6. deleteUser: A mensagem de retorno deve ser exata (expect.to.equal)', () => {
      const mensagemEsperada = `Usuário com ID ${ID_USUARIO} foi removido.`;
      expect(deleteUser(ID_USUARIO).message).to.equal(mensagemEsperada);
    });
  });

  describe('SHOULD Style', () => {
    it('3.1. createUser: Não deve lançar erro com dados válidos (should.not.throw)', () => {
      (() => createUser(USER_DATA_VALIDO)).should.not.throw();
    });

    it('3.2. getAllUsers: O retorno deve ser do tipo array (should.be.an)', () => {
      getAllUsers().should.be.an('array');
    });

    it('3.3. updateUser: O objeto retornado deve ter a propriedade "id" (should.have.property)', () => {
      updateUser(ID_USUARIO, { name: 'Novo' }).should.have.property('id');
    });
    
    it('3.4. getAllUsers: O número de usuários deve ser de no mínimo 3 (should.be.at.least)', () => {
        getAllUsers().length.should.be.at.least(3);
    });

    it('3.5. getUserById: O ID do usuário retornado deve ser igual ao solicitado (should.equal)', () => {
        getUserById(ID_USUARIO).id.should.equal(ID_USUARIO);
    });
    
    it('3.6. filterUsersByName: Deve retornar o usuário "Leanne Graham" (should.deep.include)', () => {
        const usuarioEsperado = { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' };
        filterUsersByName('leanne').should.deep.include(usuarioEsperado);
    });
  });

  describe('Testes Mockados/Stubados com Sinon', () => {
      afterEach(() => {
          sinon.restore(); 
      });
      
      it('4.1. Deve simular uma chamada de API bem-sucedida (Status 200)', async () => {
          const dadosMockados = { data: MOCK_API_USER, status: 200 };
          const stub = sinon.stub().resolves(dadosMockados); 
          const resultado = await fetchUserFromAPI({ get: stub }); 
          expect(resultado.status).to.equal(200);
          expect(resultado.data).to.have.lengthOf(1);
          expect(stub.calledOnce).to.be.true;
      });

      it('4.2. Deve simular uma chamada com falha 404 (Usuário não encontrado)', async () => {
          const erroMockado = { error: 'Not Found', status: 404 };
          const stub = sinon.stub().resolves(erroMockado); 
          const resultado = await fetchUserFromAPI({ get: stub }); 
          expect(resultado.status).to.equal(404);
          expect(resultado).to.have.property('error', 'Not Found');
      });

      it('4.3. Deve verificar se o stub foi chamado com o argumento correto (Endpoint /users)', async () => {
          const stub = sinon.stub().resolves({});
          await fetchUserFromAPI({ get: stub }); 
          expect(stub.calledWith('/users')).to.be.true;
      });

      it('4.4. Deve simular uma resposta com array vazio (Status 200 e Array Vazio)', async () => {
          const dadosVazios = { data: [], status: 200 };
          const stub = sinon.stub().resolves(dadosVazios); 
          const resultado = await fetchUserFromAPI({ get: stub }); 
          resultado.status.should.equal(200);
          resultado.data.should.be.an('array').with.lengthOf(0);
      });
      
      it('4.5. Deve simular uma falha de rede/conexão (Promise Rejeitada)', async () => {
          const stub = sinon.stub().rejects(new Error('Conexão recusada pelo servidor.')); 
          try {
              await fetchUserFromAPI({ get: stub });
              assert.fail('A função deveria ter lançado um erro.');
          } catch (error) {
              expect(error.message).to.include('Conexão recusada');
          }
      });
  });

});
