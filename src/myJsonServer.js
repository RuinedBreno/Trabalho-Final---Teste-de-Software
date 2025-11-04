const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const BASE_URL = 'https://my-json-server.typicode.com/RuinedBreno/Trabalho-Final---Teste-de-Software';


async function getAllServerPosts() {
    return chai.request(BASE_URL).get('/posts');
}

async function getServerPostById(id) {
    return chai.request(BASE_URL).get(`/posts/${id}`);
}

async function createServerPost(newPostData) {
    return chai.request(BASE_URL).post('/posts').send(newPostData);
}

async function deleteServerPost(id) {
    return chai.request(BASE_URL).delete(`/posts/${id}`);
}

async function getServerUserById(id) {
    return chai.request(BASE_URL).get(`/users/${id}`);
}

async function getAllServerUsers() {
    return chai.request(BASE_URL).get('/users');
}

async function patchServerUser(id, updateData) {
    return chai.request(BASE_URL).patch(`/users/${id}`).send(updateData);
}

async function getCommentsByPostId(postId) {
    return chai.request(BASE_URL).get(`/comments?postId=${postId}`);
}

async function createServerComment(newCommentData) {
    return chai.request(BASE_URL).post('/comments').send(newCommentData);
}

async function getNestedCommentsByPostId(postId) {
    return chai.request(BASE_URL).get(`/posts/${postId}/comments`);
}

async function getUsersByFilter(key, value) {
    return chai.request(BASE_URL).get(`/users?${key}=${value}`);
}

module.exports = {
    getAllServerPosts,
    getServerPostById,
    createServerPost,
    deleteServerPost,
    getAllServerUsers,
    patchServerUser,
    getCommentsByPostId,
    createServerComment,
    getNestedCommentsByPostId,
    getUsersByFilter,
    getServerUserById
};
