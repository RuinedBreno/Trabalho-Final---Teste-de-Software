# teste-software-n2
Destinado ao trabalho da nota N2 da disciplina de teste de software

Dica: desinstala o chai
e instala o chai
npm install chai@4.3.7 chai-http@4.3.0 --save-dev

Projeto de Testes em Node.js - Miniaplicativo de Rede Social

Este projeto foi desenvolvido como parte de um trabalho acadêmico com foco na aplicação de testes unitários, de API e de integração em um ambiente Node.js. O tema é um "Miniaplicativo de Rede Social / Blog", utilizando as APIs do JSONPlaceholder e My JSON Server como base.

🎯 Objetivos do Projeto

    Desenvolver um projeto Node.js com estrutura de pastas definida. 

Criar funções simples para permitir a aplicação de diferentes tipos de testes. 

Aplicar testes unitários, de API e de integração com Mocha, Chai, Sinon e Chai-http. 

Demonstrar o uso de assert, expect e should do Chai. 

🛠️ Ferramentas Utilizadas

    Node.js: Ambiente de execução do JavaScript.

    Mocha: Framework para execução dos testes. 

Chai: Biblioteca de asserções para verificação dos resultados. 

Sinon: Biblioteca para criar mocks e stubs. 

Chai-http: Plugin para o Chai para testes de requisições HTTP. 

Insomnia: Ferramenta para testes manuais de API. 

🚀 Como Configurar e Instalar

Pré-requisitos

    Node.js instalado.

    Git instalado.

Passos de Instalação

    Clone o repositório:
```
git clone <URL-DO-SEU-REPOSITORIO>
cd <NOME-DO-PROJETO>
```


Inicialize um projeto npm (caso ainda não tenha sido feito):

```
npm init -y
```

Instale as dependências de desenvolvimento necessárias:
```
    npm install chai@4.3.7 chai-http@4.3.0 --save-dev
```
⚙️ Estrutura do Projeto

A estrutura de pastas principal do projeto é a seguinte:
```
/
├── src/         # Contém o código-fonte (funções a serem testadas) [cite: 13]
│   ├── users.js
│   ├── posts.js
│   ├── comments.js
│   └── todos.js
├── test/        # Contém os arquivos de teste [cite: 14]
├── .gitignore   # Arquivos a serem ignorados pelo Git
└── package.json # Configurações do projeto e dependências
```

▶️ Como Executar os Testes

Para executar todos os testes definidos na pasta test/, utilize o seguinte comando. É necessário configurar o script test no seu arquivo package.json para que ele execute o Mocha. 

```
npm test

```