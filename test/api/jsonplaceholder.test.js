const { getTodosPosts } = require('../../src/jsonplaceholder');
const expect = chai.expect;

it('1.1. GET /posts: Deve retornar status 200 e uma lista de 100 posts', async () => {
    const res = await getTodosPosts();
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array').with.lengthOf(100);
});