/*
Create (Criar):

    addCommentToPost(postId, commentData): Função para adicionar um novo comentário a um post.

Read (Ler):

    getCommentsByPostId(postId): Função para listar todos os comentários de um post específico.

Update (Atualizar):

    updateComment(commentId, updatedText): Função para editar o texto de um comentário.

Delete (Deletar):

    deleteComment(commentId): Função para remover um comentário.
*/

/**
 * Adiciona um novo comentário a um post específico.
 * Em uma aplicação real, isso faria uma requisição POST para a API.
 *
 * @param {number} postId - O ID do post onde o comentário será adicionado.
 * @param {object} commentData - O objeto contendo os dados do novo comentário (ex: { title: '...', body: '...', email: '...' }).
 * @returns {object} O objeto do comentário criado.
 */
function addCommentToPost(postId, commentData) {
  // Simulação: Validação simples dos dados de entrada
  if (!postId || !commentData || !commentData.body) {
    throw new Error('Dados inválidos para adicionar comentário.');
  }

  // Simulação: Retorna um novo objeto de comentário com um ID fake
  const newComment = {
    id: Math.floor(Math.random() * 1000) + 501, // Gera um ID aleatório
    postId: postId,
    ...commentData,
  };

  return newComment;
}

/**
 * Lista todos os comentários de um post específico.
 * Em uma aplicação real, faria uma requisição GET para a API (ex: /posts/{postId}/comments).
 *
 * @param {number} postId - O ID do post do qual os comentários serão listados.
 * @returns {Array} Um array de objetos de comentários.
 */
function getCommentsByPostId(postId) {
  // Simulação: Validação do ID do post
  if (!postId || typeof postId !== 'number') {
    throw new Error('ID do post inválido.');
  }

  // Simulação: Retorna uma lista de comentários fake para fins de teste
  return [
    { id: 1, postId: postId, body: 'Este é o primeiro comentário.' },
    { id: 2, postId: postId, body: 'Este é o segundo comentário.' },
  ];
}

/**
 * Edita o texto de um comentário existente.
 * Em uma aplicação real, faria uma requisição PUT ou PATCH para a API (ex: /comments/{commentId}).
 *
 * @param {number} commentId - O ID do comentário a ser atualizado.
 * @param {string} updatedText - O novo texto do corpo do comentário.
 * @returns {object} O objeto do comentário atualizado.
 */
function updateComment(commentId, updatedText) {
  // Simulação: Validação dos dados
  if (!commentId || !updatedText) {
    throw new Error('ID do comentário ou texto de atualização inválido.');
  }

  // Simulação: Retorna o comentário com o corpo atualizado
  return {
    id: commentId,
    body: updatedText,
    // ...outras propriedades do comentário
  };
}

/**
 * Remove um comentário específico.
 * Em uma aplicação real, faria uma requisição DELETE para a API (ex: /comments/{commentId}).
 *
 * @param {number} commentId - O ID do comentário a ser removido.
 * @returns {object} Uma mensagem de confirmação.
 */
function deleteComment(commentId) {
  // Simulação: Validação do ID
  if (!commentId) {
    throw new Error('ID do comentário inválido.');
  }

  // Simulação: Retorna um status de sucesso
  return {
    status: 'sucesso',
    message: `Comentário com ID ${commentId} foi removido.`,
  };
}

// Exporta as funções para que possam ser usadas em outros arquivos, como os de teste
module.exports = {
  addCommentToPost,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};