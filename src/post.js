    /*
Create (Criar):

    createPost(postData): Função para criar um novo post "fake" (falso).

associatePostToUser(postId, userId): Função para associar uma publicação a um usuário.

Read (Ler):

    getAllPosts(): Função para listar todos os posts.

    getPostById(postId): Função para buscar um post pelo ID.

    getPostsByUserId(userId): Função para listar todos os posts de um usuário específico.

Update (Atualizar):

    updatePost(postId, updatedData): Função para editar o conteúdo de um post.

Delete (Deletar):

    deletePost(postId): Função para excluir um post.
    
    */

/**
 * Cria um novo post "fake".
 * Em uma aplicação real, isso faria uma requisição POST para a API.
 *
 * @param {object} postData - O objeto contendo os dados do novo post (ex: { title: '...', body: '...' }).
 * @returns {object} O objeto do post criado com um ID simulado.
 */
function createPost(postData) {
  if (!postData || !postData.title || !postData.body) {
    throw new Error('Dados inválidos para criar o post.');
  }

  const newPost = {
    id: Math.floor(Math.random() * 100) + 101, // Gera um ID aleatório acima de 100
    ...postData,
  };

  return newPost;
}

/**
 * Associa uma publicação a um usuário.
 * Em uma aplicação real, isso poderia envolver atualizar o post com um `userId`.
 *
 * @param {number} postId - O ID do post a ser associado.
 * @param {number} userId - O ID do usuário ao qual o post será associado.
 * @returns {object} O objeto do post com o `userId` associado.
 */
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

/**
 * Lista todos os posts.
 * Em uma aplicação real, faria uma requisição GET para /posts.
 *
 * @returns {Array} Um array de objetos de posts.
 */
function getAllPosts() {
  // Simula o retorno de uma lista de posts
  return [
    { id: 1, userId: 1, title: 'Post 1', body: '...' },
    { id: 2, userId: 1, title: 'Post 2', body: '...' },
    { id: 3, userId: 2, title: 'Post 3', body: '...' },
  ];
}

/**
 * Busca um post específico pelo seu ID.
 * Em uma aplicação real, faria uma requisição GET para /posts/{postId}.
 *
 * @param {number} postId - O ID do post a ser buscado.
 * @returns {object|null} O objeto do post encontrado ou null se não for encontrado.
 */
function getPostById(postId) {
  if (!postId || typeof postId !== 'number') {
    throw new Error('ID do post inválido.');
  }

  // Simula a busca de um post específico
  return {
    id: postId,
    userId: 1,
    title: `Post com ID ${postId}`,
    body: 'Este é o corpo do post.',
  };
}

/**
 * Lista todos os posts de um usuário específico.
 * Em uma aplicação real, faria uma requisição GET para /users/{userId}/posts.
 *
 * @param {number} userId - O ID do usuário.
 * @returns {Array} Um array de posts do usuário.
 */
function getPostsByUserId(userId) {
  if (!userId || typeof userId !== 'number') {
    throw new Error('ID do usuário inválido.');
  }

  // Simula a filtragem de posts por usuário
  return [
    { id: 1, userId: userId, title: 'Primeiro post do usuário', body: '...' },
    { id: 2, userId: userId, title: 'Segundo post do usuário', body: '...' },
  ];
}

/**
 * Edita o conteúdo de um post.
 * Em uma aplicação real, faria uma requisição PUT ou PATCH para /posts/{postId}.
 *
 * @param {number} postId - O ID do post a ser atualizado.
 * @param {object} updatedData - Os dados a serem atualizados (ex: { title: '...', body: '...' }).
 * @returns {object} O objeto do post atualizado.
 */
function updatePost(postId, updatedData) {
  if (!postId || !updatedData) {
    throw new Error('Dados para atualização inválidos.');
  }

  // Simula a atualização, retornando o post com os dados mesclados
  return {
    id: postId,
    ...updatedData,
  };
}

/**
 * Exclui um post.
 * Em uma aplicação real, faria uma requisição DELETE para /posts/{postId}.
 *
 * @param {number} postId - O ID do post a ser excluído.
 * @returns {object} Uma mensagem de confirmação.
 */
function deletePost(postId) {
  if (!postId) {
    throw new Error('ID do post inválido.');
  }

  return {
    status: 'sucesso',
    message: `Post com ID ${postId} foi removido.`,
  };
}

// Exporta todas as funções
module.exports = {
  createPost,
  associatePostToUser,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
};