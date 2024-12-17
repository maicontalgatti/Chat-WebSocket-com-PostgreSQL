# Chat-WebSocket-com-PostgreSQL
Este projeto é uma aplicação de chat em tempo real utilizando WebSocket para comunicação bidirecional e PostgreSQL para armazenar as mensagens trocadas entre os usuários.


## Tecnologias Utilizadas
Node.js (para o servidor e WebSocket)
Express (framework para o servidor HTTP)
ws (biblioteca WebSocket)
PostgreSQL (banco de dados para armazenar mensagens)
HTML/JavaScript (para o frontend do cliente)
## Requisitos
Antes de iniciar o projeto, é necessário ter as seguintes ferramentas instaladas:

Node.js e npm
PostgreSQL
## Configuração do Banco de Dados
Crie o banco de dados no PostgreSQL:

Conecte-se ao PostgreSQL e execute os seguintes comandos SQL:

sql
    
    Copiar código
    CREATE DATABASE chatdb;
    Crie a tabela messages dentro do banco chatdb:

sql 

    CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
Verifique a conexão com o banco de dados:

Certifique-se de que o banco de dados está acessível e em funcionamento no IP (seu ip)9 e na porta 5432 (ajuste conforme necessário).

## Instalação e Execução do Servidor
Clone o repositório ou baixe os arquivos do projeto:

bash
 
    git clone https://github.com/seu-usuario/chat-websocket.git
    cd chat-websocket
Instale as dependências:

No diretório do projeto, execute o comando:
 
    npm install
    
Configure o arquivo server.js:

Certifique-se de que as configurações de PostgreSQL no arquivo server.js estão corretas (host, usuário, senha, etc.).

Inicie o servidor:

Execute o servidor Node.js com o comando:

    node server.js
O servidor WebSocket estará rodando em ws://(seu ip):1000.

## Executando o Cliente (Frontend)
Abra o arquivo index.html:

Você pode abrir o arquivo diretamente no navegador para testar a aplicação.

Servir o arquivo HTML (opcional):

Caso prefira, você pode usar um servidor HTTP simples para servir o arquivo HTML. Para isso, instale o http-server:
 

    npm install -g http-server
    http-server . -p 8080
Agora, acesse a aplicação no navegador em http://localhost:8080.

## Como Testar o Chat
Abra múltiplas abas ou janelas do navegador e acesse o frontend (arquivo index.html).
Preencha o nome e envie mensagens.
Verifique o funcionamento:
As mensagens enviadas devem ser transmitidas em tempo real para todas as abas/janelas abertas.
As mensagens serão armazenadas no banco de dados PostgreSQL na tabela messages.
## Estrutura do Projeto
 
    chat-websocket/
    ├── server.js               # Código do servidor Node.js com WebSocket
    ├── index.html              # Frontend do chat (HTML)
    └── README.md               # Este arquivo
## Contribuindo
Se você deseja contribuir para o projeto, siga as etapas abaixo:

Faça um fork deste repositório.
Crie uma nova branch (git checkout -b feature-nome-da-feature).
Faça suas alterações.
Envie um pull request com uma descrição clara das mudanças.
Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

