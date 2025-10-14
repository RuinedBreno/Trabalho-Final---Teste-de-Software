/*
Create (Criar):

    createUser(userData): Função para criar um novo usuário.

Read (Ler):

    getAllUsers(): Função para buscar todos os usuários.

    getUserById(userId): Função para buscar um usuário específico pelo seu ID.

    filterUsersByName(name): Função para filtrar usuários por nome.

Update (Atualizar):

    updateUser(userId, updatedData): Função para atualizar as informações de um usuário.

Delete (Deletar):

    deleteUser(userId): Função para remover um usuário.

*/

/**
 * Cria um novo usuário.
 * Em uma aplicação real, faria uma requisição POST para a API.
 *
 * @param {object} userData - O objeto com os dados do usuário (ex: { name: '...', email: '...' }).
 * @returns {object} O objeto do usuário criado com um ID simulado.
 */
function createUser(userData) {
  if (!userData || !userData.name || !userData.email) {
    throw new Error('Dados inválidos para criar o usuário.');
  }

  const newUser = {
    id: Math.floor(Math.random() * 10) + 11, // Gera um ID aleatório acima de 10
    ...userData,
  };

  return newUser;
}

/**
 * Busca todos os usuários.
 * Em uma aplicação real, faria uma requisição GET para /users.
 *
 * @returns {Array} Um array com objetos de usuários.
 */
function getAllUsers() {
  // Simula o retorno de uma lista de usuários
  return [
    { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
    { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
    { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net' },
  ];
}

/**
 * Busca um usuário específico pelo seu ID.
 * Em uma aplicação real, faria uma requisição GET para /users/{userId}.
 *
 * @param {number} userId - O ID do usuário a ser buscado.
 * @returns {object|null} O objeto do usuário encontrado ou null.
 */
function getUserById(userId) {
  if (!userId || typeof userId !== 'number') {
    throw new Error('ID do usuário inválido.');
  }

  // Simula a busca de um usuário
  return {
    id: userId,
    name: 'Nome do Usuário de Teste',
    email: 'teste@exemplo.com',
  };
}

/**
 * Filtra usuários por nome.
 * Em uma aplicação real, poderia fazer uma requisição GET para /users?name={name}.
 *
 * @param {string} name - O nome (ou parte do nome) a ser filtrado.
 * @returns {Array} Um array de usuários que correspondem ao filtro.
 */
function filterUsersByName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Nome para filtro inválido.');
  }

  const allUsers = getAllUsers();
  return allUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
}

/**
 * Atualiza as informações de um usuário.
 * Em uma aplicação real, faria uma requisição PUT ou PATCH para /users/{userId}.
 *
 * @param {number} userId - O ID do usuário a ser atualizado.
 * @param {object} updatedData - Os dados a serem atualizados.
 * @returns {object} O objeto do usuário com as informações atualizadas.
 */
function updateUser(userId, updatedData) {
  if (!userId || !updatedData) {
    throw new Error('Dados para atualização inválidos.');
  }

  return {
    id: userId,
    ...updatedData,
  };
}

/**
 * Remove um usuário.
 * Em uma aplicação real, faria uma requisição DELETE para /users/{userId}.
 *
 * @param {number} userId - O ID do usuário a ser removido.
 * @returns {object} Uma mensagem de confirmação.
 */
function deleteUser(userId) {
  if (!userId) {
    throw new Error('ID do usuário inválido.');
  }

  return {
    status: 'sucesso',
    message: `Usuário com ID ${userId} foi removido.`,
  };
}

// Exporta as funções
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  filterUsersByName,
  updateUser,
  deleteUser,
};