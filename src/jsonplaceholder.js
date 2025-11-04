// src/services/jsonplaceholder.js
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

async function getTodosPosts() {
    return chai.request(JSONPLACEHOLDER_URL).get('/posts');
}

module.exports = { getTodosPosts };