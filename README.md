# Trabalho-Final---Teste-de-Software
Projeto de Teste de Software Nota 2 - Versão Final

# teste-software-n2
Destinado ao trabalho da nota N2 da disciplina de teste de software

Dica: desinstala o chai
e instala o chai
npm install chai@4.3.7 chai-http@4.3.0 --save-dev

# Teste de Software - Trabalho N2

Este repositório contém o projeto desenvolvido para a avaliação N2 da disciplina de Teste de Software.

## 📝 Descrição do Projeto

O projeto consiste em um "Miniaplicativo de Rede Social / Blog" desenvolvido em Node.js, com o objetivo principal de aplicar um conjunto robusto de testes unitários, de API e de integração. As funcionalidades foram criadas de forma simples, focando na sua testabilidade, e utilizam como base as APIs do JSONPlaceholder e My JSON Server.

## 🎯 Objetivos Principais

- Desenvolver um projeto Node.js com uma estrutura de pastas bem definida. 

- Criar funções simples que sirvam como base para a aplicação de diversos tipos de testes. 

- Aplicar testes unitários, de API e de integração utilizando o ecossistema Mocha e Chai. 

- Demonstrar o uso prático das diferentes sintaxes de asserção do Chai: assert, expect e should. 

## 🚀 Guia de Instalação e Configuração

Siga os passos abaixo para configurar o ambiente e executar o projeto.

### Pré-requisitos

- Node.js: Certifique-se de que o Node.js está instalado.

- Git: Certifique-se de que o Git está instalado.

### Passos para Instalação

Clone o Repositório
Abra seu terminal, navegue até o diretório onde deseja salvar o projeto e execute o comando:

```
git clone https://github.com/sophialberton/teste-software-n2.git
cd teste-software-n2
```

### Inicialize o Projeto

```
npm init -y
```
### Instale as Dependências
Execute o comando abaixo para instalar as ferramentas de teste necessárias.

    ⚠️ Dica Importante de Compatibilidade
    Para evitar conflitos de versão entre as bibliotecas, é recomendado instalar estas versões específicas:

```
    npm install mocha sinon chai@4.3.7 chai-http@4.3.0 --save-dev
```
## 🛠️ Ferramentas Utilizadas

- Node.js: Ambiente de execução do código JavaScript no servidor.

- Mocha: Framework que organiza e executa os testes.

- Chai: Biblioteca de asserções que verifica se os resultados são os esperados.

- Sinon: Biblioteca para a criação de mocks e stubs, essencial para isolar funções em testes.

- Chai-http: Plugin que integra o Chai a requisições HTTP para testes de API.

- Insomnia: Ferramenta visual para executar e depurar requisições de API manualmente.

## 📁 Estrutura do Projeto

O projeto está organizado da seguinte forma para separar claramente o código-fonte dos testes:
```
/
├── src/          # Contém o código-fonte (funções a serem testadas) [cite: 13]
│   ├── users.js
│   ├── posts.js
│   ├── comments.js
│   └── todos.js
├── test/         # Contém os arquivos de teste [cite: 14]
├── .gitignore    # Arquivos e pastas ignorados pelo Git
└── package.json  # Configurações do projeto e dependências
```

## ▶️ Como Executar os Testes

Para rodar o conjunto de testes, certifique-se de que seu package.json possui o script test configurado para executar o Mocha.

Exemplo de configuração no package.json:
```
JSON

"scripts": {
  "test": "mocha"
}
```

Com o script configurado, execute o seguinte comando no terminal:

```
npm test
```

Este comando irá executar todos os arquivos de teste localizados na pasta test/ e exibir os resultados no console.