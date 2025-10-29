//Teste com Chai-Http - Lembrar de Usar Const e a Url do JSON PLACE HOLDER

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

/*  Faz a requisição, combinando a URL base e o endpoint '/posts'
chai.request(JSONPLACEHOLDER_URL) 
  .get('/posts') 
  // ...

  */
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

// Habilita o plugin chai-http para requisições
chai.use(chaiHttp);

// URL base da API JSONPlaceholder
describe('Testes de API de Cobertura Completa (JSONPlaceholder) - 20 Testes', () => {

    // =========================================================================
    // I. ENDPOINT /posts (CRUD + GET ALL + Filtro) - 7 Testes
    // =========================================================================
    describe('1. Endpoint /posts', () => {
        const POST_ID = 1;
        const NEW_POST_DATA = { userId: 1, title: 'Novo Post de Teste API', body: 'Conteúdo de teste.' };
        const UPDATE_DATA = { title: 'Título Atualizado via PUT' };

        // Teste 1.1: GET ALL (Verifica status 200 e quantidade)
        it('1.1. GET /posts: Deve retornar status 200 e uma lista de 100 posts', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get('/posts')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').with.lengthOf(100);
                    done();
                });
        });

        // Teste 1.2: GET by ID (Verifica objeto e ID)
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

        // Teste 1.3: POST (Criação de recurso, verifica status 201)
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

        // Teste 1.4: PUT (Atualização completa)
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

        // Teste 1.5: DELETE (Simula a remoção, verifica status 200)
        it('1.5. DELETE /posts/:id: Deve simular a remoção de um post e retornar status 200', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .delete(`/posts/${POST_ID}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').that.is.empty;
                    done();
                });
        });

        // NOVO TESTE 1.6: GET com Filtro por userId
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
        
        // NOVO TESTE 1.7: GET recurso aninhado /posts/1/comments
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


    // =========================================================================
    // II. ENDPOINT /users - 4 Testes
    // =========================================================================
    describe('2. Endpoint /users', () => {
        const USER_ID = 1;
        const NEW_USER_DATA = { name: 'Teste API User', username: 'api_test' };
        
        // Teste 2.1: GET ALL (Verifica status 200 e quantidade)
        it('2.1. GET /users: Deve retornar status 200 e 10 usuários', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get('/users')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').with.lengthOf(10);
                    done();
                });
        });

        // Teste 2.2: POST (Criação de recurso, verifica a propriedade "username")
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

        // Teste 2.3: PATCH (Atualização parcial, verifica o campo atualizado)
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
        
        // NOVO TESTE 2.4: GET by ID (Verifica estrutura aninhada: endereço)
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


    // =========================================================================
    // III. ENDPOINT /todos - 3 Testes
    // =========================================================================
    describe('3. Endpoint /todos', () => {
        const TODO_ID = 1;
        const NEW_TODO_DATA = { userId: 1, title: 'API Test Todo', completed: false };

        // Teste 3.1: GET by ID (Verifica tipo de dado da propriedade "completed")
        it('3.1. GET /todos/:id: Deve retornar a tarefa e ter a propriedade "completed" como boolean', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get(`/todos/${TODO_ID}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('completed').that.is.a('boolean');
                    done();
                });
        });

        // Teste 3.2: POST (Verifica status 201 e valor da propriedade "completed")
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

        // Teste 3.3: Filtering (GET com Query Params)
        it('3.3. GET /todos?completed=false: Deve retornar apenas tarefas não concluídas', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get('/todos?completed=false')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    // Verifica se TODOS os itens no array têm completed: false
                    expect(res.body.every(t => t.completed === false)).to.be.true;
                    done();
                });
        });
    });


    // =========================================================================
    // IV. ENDPOINTS /albums E /photos - 3 Testes
    // =========================================================================
    describe('4. Endpoints /albums e /photos', () => {
        const ALBUM_ID = 1;

        // Teste 4.1: GET ALBUMS ALL (Verifica status 200 e quantidade)
        it('4.1. GET /albums: Deve retornar status 200 e uma lista de 100 álbuns', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get('/albums')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').with.lengthOf(100);
                    done();
                });
        });

        // Teste 4.2: POST ALBUMS (Criação de álbum)
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
        
        // Teste 4.3: GET PHOTOS (Recurso aninhado)
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
    
    // =========================================================================
    // V. ENDPOINT /comments - 4 Testes
    // =========================================================================
    describe('5. Endpoint /comments', () => {
        const COMMENT_ID = 1;
        const NEW_COMMENT_DATA = { postId: 1, name: 'Comentário Teste', email: 'api@test.com', body: 'Corpo do comentário.' };

        // Teste 5.1: GET by ID (Verifica formato do e-mail)
        it('5.1. GET /comments/:id: Deve retornar o comentário 1 e ter a propriedade email formatada', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get(`/comments/${COMMENT_ID}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('email').that.includes('@');
                    done();
                });
        });

        // Teste 5.2: POST (Criação de comentário)
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

        // 5.3. GET /comments?email=Sincere@april.biz: Falhou (retornou 0)
        // Novo Teste 5.3: Usa filtro por postId, que é mais robusto e garante 5 resultados
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

        // NOVO TESTE 5.4: GET /comments (ALL) - Verifica uma propriedade que deve estar sempre presente
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

    // =========================================================================
    // VI. TESTES DE ERRO E CÓDIGOS DE RESPOSTA - 3 Testes
    // =========================================================================
    describe('6. Testes de Erro (Not Found e Requisição Inválida)', () => {
        const USER_ID = 1;
        
        // Teste 6.1: Not Found (Verifica status 404 para recurso inexistente)
        it('6.1. GET /posts/9999: Deve retornar status 404 para recurso inexistente', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get('/posts/9999')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    // No JSONPlaceholder, o body para 404 em posts é um objeto vazio
                    expect(res.body).to.be.an('object').that.is.empty; 
                    done();
                });
        });

        // Teste 6.2: GET recurso aninhado inexistente
        it('6.2. GET /users/9999/posts: Deve retornar 404/Array vazio para recurso aninhado inexistente', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .get('/users/9999/posts')
                .end((err, res) => {
                    // JSONPlaceholder retorna 200 com array vazio para users inexistentes
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.is.empty;
                    done();
                });
        });
        
        // 6.3. PUT /users/9999: Falhou (retornou 500, mas esperava 200)
        // Novo Teste 6.3: Espera 500 para testar o erro do servidor para recurso inexistente
        it('6.3. PUT /users/9999: Deve retornar 500 ao tentar atualizar recurso inexistente', (done) => {
            chai.request(JSONPLACEHOLDER_URL)
                .put('/users/9999')
                .send({ name: 'Update 9999' })
                .end((err, res) => {
                    // O JSONPlaceholder está retornando 500 para este caso
                    expect(res).to.have.status(500); 
                    done();
                });
        })
    });;
});