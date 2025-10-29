/* Adiciona um novo comentário a um post específico. */
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

function countTotalComments(commentsList, authorUsername) {
  if (!Array.isArray(commentsList) || typeof authorUsername !== 'string' || authorUsername.length === 0) {
    // Esse erro pode ser capturado pelo assert.throws
    throw new Error('Lista de comentários ou nome de usuário do autor inválido.');
  }

  let count = 0;
  for (const comment of commentsList) {
    if (comment.username && comment.username.toLowerCase() === authorUsername.toLowerCase()) {
      count++;
    }
  }
  return count;
}

// Lembre-se de exportar a nova função!
module.exports = {
  addCommentToPost,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  countTotalComments, // <-- Adicione aqui
};

// Exporta as funções para que possam ser usadas em outros arquivos, como os de teste
module.exports = {
  addCommentToPost,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  countTotalComments
};