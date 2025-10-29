function createTodo(todoData) {
  if (!todoData || !todoData.userId || !todoData.title) {
    throw new Error('Dados inválidos para criar a tarefa.');
  }

  const newTodo = {
    id: Math.floor(Math.random() * 100) + 201, // Gera um ID aleatório acima de 200
    completed: false, // Por padrão, uma nova tarefa não está completa
    ...todoData,
  };

  return newTodo;
}

function getTodosByUserId(userId) {
  if (!userId || typeof userId !== 'number') {
    throw new Error('ID do usuário inválido.');
  }
  return [
    { id: 1, userId: userId, title: 'Fazer compras', completed: false },
    { id: 2, userId: userId, title: 'Estudar testes', completed: true },
    { id: 3, userId: userId, title: 'Lavar o carro', completed: false },
  ];
}

function markTodoAsCompleted(todoId) {
  if (!todoId) {
    throw new Error('ID da tarefa inválido.');
  }
  return {
    id: todoId,
    userId: 1, 
    title: 'Tarefa que foi concluída',
    completed: true,
  };
}

function deleteTodo(todoId) {
  if (!todoId) {
    throw new Error('ID da tarefa inválido.');
  }

  return {
    status: 'sucesso',
    message: `Tarefa com ID ${todoId} foi removida.`,
  };
}

/* Filtra posts por uma palavra-chave presente no título. */
function filterPostsByKeyword(postsList, keyword) {
  if (!Array.isArray(postsList) || typeof keyword !== 'string' || keyword.length === 0) {
    throw new Error('Lista de posts ou palavra-chave inválida para filtro.');
  }

  const normalizedKeyword = keyword.toLowerCase();

  return postsList.filter(post => 
    post.title && post.title.toLowerCase().includes(normalizedKeyword)
  );
}

module.exports = {
  createPost,
  associatePostToUser,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
  filterPostsByKeyword,
};