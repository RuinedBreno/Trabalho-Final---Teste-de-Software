const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Testes de API de Cobertura Completa (JSONPlaceholder) - 20 Testes', () => {
  describe('1. Endpoint /posts', () => {
    const POST_ID = 1;
    const NEW_POST_DATA = { userId: 1, title: 'Novo Post de Teste API', body: 'Conteúdo de teste.' };
    const UPDATE_DATA = { title: 'Título Atualizado via PUT' };

    it('1.1. GET /posts: Deve retornar status 200 e uma lista de 100 posts', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/posts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(100);
          done();
        });
    });

    it('1.2. GET /posts/:id: Deve retornar o post com ID 1 e status 200', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get(`/posts/${POST_ID}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id', POST_ID);
          done();
        });
    });

    it('1.3. POST /posts: Deve criar um novo post e retornar status 201', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .post('/posts')
        .send(NEW_POST_DATA)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title', NEW_POST_DATA.title);
          expect(res.body).to.have.property('id').that.is.a('number');
          done();
        });
    });

    it('1.4. PUT /posts/:id: Deve atualizar um post existente e retornar status 200', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .put(`/posts/${POST_ID}`)
        .send(UPDATE_DATA)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('title', UPDATE_DATA.title);
          expect(res.body).to.have.property('id', POST_ID);
          done();
        });
    });

    it('1.5. DELETE /posts/:id: Deve simular a remoção de um post e retornar status 200', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .delete(`/posts/${POST_ID}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object').that.is.empty;
          done();
        });
    });

    it('1.6. GET /posts?userId=2: Deve retornar apenas posts do usuário com ID 2 (Verifica ID)', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/posts?userId=2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(10);
          expect(res.body.every(p => p.userId === 2)).to.be.true;
          done();
        });
    });

    it('1.7. GET /posts/1/comments: Deve retornar a lista de comentários do post 1 (5 comentários)', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/posts/1/comments')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(5);
          expect(res.body[0]).to.have.property('postId', 1);
          done();
        });
    });
  });

  describe('2. Endpoint /users', () => {
    const USER_ID = 1;
    const NEW_USER_DATA = { name: 'Teste API User', username: 'api_test' };

    it('2.1. GET /users: Deve retornar status 200 e 10 usuários', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(10);
          done();
        });
    });

    it('2.2. POST /users: Deve criar um novo usuário e retornar status 201', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .post('/users')
        .send(NEW_USER_DATA)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('username', NEW_USER_DATA.username);
          done();
        });
    });

    it('2.3. PATCH /users/:id: Deve permitir a atualização parcial (PATCH) do e-mail', (done) => {
      const updateEmail = { email: 'new.email@patch.com' };
      chai.request(JSONPLACEHOLDER_URL)
        .patch(`/users/${USER_ID}`)
        .send(updateEmail)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('email', updateEmail.email);
          done();
        });
    });

    it('2.4. GET /users/:id: Deve ter a propriedade de endereço aninhada (street)', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get(`/users/${USER_ID}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.nested.property('address.street');
          done();
        });
    });
  });

  describe('3. Endpoint /todos', () => {
    const TODO_ID = 1;
    const NEW_TODO_DATA = { userId: 1, title: 'API Test Todo', completed: false };

    it('3.1. GET /todos/:id: Deve retornar a tarefa e ter a propriedade "completed" como boolean', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get(`/todos/${TODO_ID}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('completed').that.is.a('boolean');
          done();
        });
    });

    it('3.2. POST /todos: Deve criar uma nova tarefa e ter completed=false', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .post('/todos')
        .send(NEW_TODO_DATA)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.completed).to.be.false;
          done();
        });
    });

    it('3.3. GET /todos?completed=false: Deve retornar apenas tarefas não concluídas', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/todos?completed=false')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.every(t => t.completed === false)).to.be.true;
          done();
        });
    });
  });

  describe('4. Endpoints /albums e /photos', () => {
    const ALBUM_ID = 1;

    it('4.1. GET /albums: Deve retornar status 200 e uma lista de 100 álbuns', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/albums')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(100);
          done();
        });
    });

    it('4.2. POST /albums: Deve criar um novo álbum e retornar status 201', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .post('/albums')
        .send({ userId: 1, title: 'Novo Álbum API' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('title', 'Novo Álbum API');
          done();
        });
    });

    it('4.3. GET /albums/:id/photos: Deve retornar as fotos do álbum 1 e a propriedade "url"', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get(`/albums/${ALBUM_ID}/photos`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('url').that.includes('http');
          done();
        });
    });
  });

  describe('5. Endpoint /comments', () => {
    const COMMENT_ID = 1;
    const NEW_COMMENT_DATA = { postId: 1, name: 'Comentário Teste', email: 'api@test.com', body: 'Corpo do comentário.' };

    it('5.1. GET /comments/:id: Deve retornar o comentário 1 e ter a propriedade email formatada', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get(`/comments/${COMMENT_ID}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('email').that.includes('@');
          done();
        });
    });

    it('5.2. POST /comments: Deve criar um novo comentário e retornar status 201', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .post('/comments')
        .send(NEW_COMMENT_DATA)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('body', NEW_COMMENT_DATA.body);
          done();
        });
    });

    it('5.3. GET /comments?postId=2: Deve retornar 5 comentários associados ao Post ID 2', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/comments?postId=2')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(5);
          expect(res.body.every(c => c.postId === 2)).to.be.true;
          done();
        });
    });

    it('5.4. GET /comments: Deve retornar todos os 500 comentários', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/comments')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(500);
          expect(res.body[0]).to.have.property('postId');
          done();
        });
    });
  });

  describe('6. Testes de Erro (Not Found e Requisição Inválida)', () => {
    const USER_ID = 1;

    it('6.1. GET /posts/9999: Deve retornar status 404 para recurso inexistente', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/posts/9999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object').that.is.empty;
          done();
        });
    });

    it('6.2. GET /users/9999/posts: Deve retornar 404/Array vazio para recurso aninhado inexistente', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .get('/users/9999/posts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;
          done();
        });
    });

    it('6.3. PUT /users/9999: Deve retornar 500 ao tentar atualizar recurso inexistente', (done) => {
      chai.request(JSONPLACEHOLDER_URL)
        .put('/users/9999')
        .send({ name: 'Update 9999' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });
});
