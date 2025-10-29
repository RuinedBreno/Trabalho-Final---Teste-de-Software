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

function getAllUsers() {
  // Simula o retorno de uma lista de usuários
  return [
    { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
    { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
    { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net' },
  ];
}

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

function filterUsersByName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Nome para filtro inválido.');
  }

  const allUsers = getAllUsers();
  return allUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
}

function updateUser(userId, updatedData) {
  if (!userId || !updatedData) {
    throw new Error('Dados para atualização inválidos.');
  }

  return {
    id: userId,
    ...updatedData,
  };
}

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