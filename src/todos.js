/*
Create (Criar):

    createTodo(todoData): Função para adicionar uma nova tarefa.

Read (Ler):

    getTodosByUserId(userId): Função para listar as tarefas de um usuário.

Update (Atualizar):

    markTodoAsCompleted(todoId): Função para marcar uma tarefa como concluída.

Delete (Deletar):

    deleteTodo(todoId): Função para excluir uma tarefa.

*/

/**
 * Adiciona uma nova tarefa para um usuário.
 * Em uma aplicação real, faria uma requisição POST para a API.
 *
 * @param {object} todoData - O objeto com os dados da tarefa (ex: { userId: 1, title: 'Nova tarefa', completed: false }).
 * @returns {object} O objeto da tarefa criada com um ID simulado.
 */
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

/**
 * Lista todas as tarefas de um usuário específico.
 * Em uma aplicação real, faria uma requisição GET para /users/{userId}/todos.
 *
 * @param {number} userId - O ID do usuário.
 * @returns {Array} Um array com as tarefas do usuário.
 */
function getTodosByUserId(userId) {
  if (!userId || typeof userId !== 'number') {
    throw new Error('ID do usuário inválido.');
  }

  // Simula o retorno de uma lista de tarefas para um usuário
  return [
    { id: 1, userId: userId, title: 'Fazer compras', completed: false },
    { id: 2, userId: userId, title: 'Estudar testes', completed: true },
    { id: 3, userId: userId, title: 'Lavar o carro', completed: false },
  ];
}

/**
 * Marca uma tarefa como concluída.
 * Em uma aplicação real, faria uma requisição PATCH ou PUT para /todos/{todoId}.
 *
 * @param {number} todoId - O ID da tarefa a ser marcada como concluída.
 * @returns {object} O objeto da tarefa atualizada.
 */
function markTodoAsCompleted(todoId) {
  if (!todoId) {
    throw new Error('ID da tarefa inválido.');
  }

  // Simula a atualização do status da tarefa
  return {
    id: todoId,
    userId: 1, // userId de exemplo
    title: 'Tarefa que foi concluída',
    completed: true,
  };
}

/**
 * Exclui uma tarefa.
 * Em uma aplicação real, faria uma requisição DELETE para /todos/{todoId}.
 *
 * @param {number} todoId - O ID da tarefa a ser excluída.
 * @returns {object} Uma mensagem de confirmação.
 */
function deleteTodo(todoId) {
  if (!todoId) {
    throw new Error('ID da tarefa inválido.');
  }

  return {
    status: 'sucesso',
    message: `Tarefa com ID ${todoId} foi removida.`,
  };
}

// Exporta as funções
module.exports = {
  createTodo,
  getTodosByUserId,
  markTodoAsCompleted,
  deleteTodo,
};