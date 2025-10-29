const { create } = require("combined-stream"); // Mantido, embora não usado, para fidelidade.

function createPost(postData) {
  if (!postData || !postData.title || !postData.body) {
    throw new Error('Dados inválidos para criar o post.');
  }

  const newPost = {
    id: Math.floor(Math.random() * 100) + 101, // Gera um ID aleatório acima de 100
    ...postData,
  };

  return newPost;
} // <<--- CORREÇÃO 1: Faltava o fechamento desta função.

function associatePostToUser(postId, userId) {
  if (!postId || !userId) {
    throw new Error('IDs do post e do usuário são obrigatórios.');
  }

  // Simula a busca de um post e a adição do userId a ele
  return {
    id: postId,
    title: 'Título do Post Existente',
    body: 'Corpo do post...',
    userId: userId,
  };
}

function getAllPosts() {
  return [
    { id: 1, userId: 1, title: 'Post 1', body: '...' },
    { id: 2, userId: 1, title: 'Post 2', body: '...' },
    { id: 3, userId: 2, title: 'Post 3', body: '...' },
  ];
}

function getPostById(postId) {
  if (!postId || typeof postId !== 'number') {
    throw new Error('ID do post inválido.');
  }

  return {
    id: postId,
    userId: 1,
    title: `Post com ID ${postId}`,
    body: 'Este é o corpo do post.',
  };
}

function getPostsByUserId(userId) {
  if (!userId || typeof userId !== 'number') {
    throw new Error('ID do usuário inválido.');
  }
  return [
    { id: 1, userId: userId, title: 'Primeiro post do usuário', body: '...' },
    { id: 2, userId: userId, title: 'Segundo post do usuário', body: '...' },
  ];
}

function updatePost(postId, updatedData) {
  if (!postId || !updatedData) {
    throw new Error('Dados para atualização inválidos.');
  }
  return {
    id: postId,
    ...updatedData,
  };
}

function deletePost(postId) {
  if (!postId) {
    throw new Error('ID do post inválido.');
  }

  return {
    status: 'sucesso',
    message: `Post com ID ${postId} foi removido.`,
  };
}

module.exports = {
  createPost,
  associatePostToUser,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
};