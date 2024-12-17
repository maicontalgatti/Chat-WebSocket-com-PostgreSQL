const express = require('express');
const WebSocket = require('ws');
const { Client } = require('pg'); // Cliente PostgreSQL
const os = require('os'); // Para obter o nome da máquina

// Configuração do servidor PostgreSQL
const dbClient = new Client({
  host: '192.168.3.229',
  port: 5432,
  database: 'chatdb',
  user: 'postgres', // Substitua com seu nome de usuário do PostgreSQL
  password: 'masterkey', // Substitua com sua senha
});

dbClient.connect();

// Configuração do servidor WebSocket
const wss = new WebSocket.Server({ host: '192.168.3.221', port: 1000 });

wss.on('connection', ws => {
  // Obtém o nome da máquina do cliente a partir do IP
  const clientIp = ws._socket.remoteAddress;
  
  // Tenta obter o nome da máquina usando a resolução reversa do DNS (não garantido)
  const clientHost = os.hostname(); // Nome da máquina local

  console.log(`Cliente ${clientHost} (${clientIp}) conectado!`);

  // Envia todas as mensagens armazenadas para o novo cliente
  dbClient.query('SELECT * FROM messages ORDER BY timestamp ASC', (err, res) => {
    if (err) {
      console.error('Erro ao consultar mensagens:', err);
      return;
    }

    res.rows.forEach(row => {
      ws.send(JSON.stringify({ serverMessage: `${row.name}: ${row.message}` }));
    });
  });

  ws.on('message', message => {
    console.log('Mensagem recebida:', message);

    try {
      const parsedMessage = JSON.parse(message);
      
      // Armazena a mensagem no banco de dados
      const insertQuery = 'INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING *';
      dbClient.query(insertQuery, [parsedMessage.name, parsedMessage.message], (err, res) => {
        if (err) {
          console.error('Erro ao inserir mensagem no banco:', err);
          return;
        }

        // Formata a resposta para todos os clientes conectados
        const response = {
          serverMessage: `${parsedMessage.name}: ${parsedMessage.message}`
        };

        // Broadcast: Envia a mensagem para todos os clientes conectados
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(response));
          }
        });
      });
    } catch (error) {
      console.error("Erro ao processar mensagem recebida:", error);

      // Envia mensagem de erro apenas para o cliente que enviou
      ws.send(JSON.stringify({ serverMessage: "Erro: Mensagem inválida recebida pelo servidor" }));
    }
  });

  ws.on('close', () => console.log(`Cliente ${clientHost} (${clientIp}) desconectado!`));
});

console.log('Servidor WebSocket rodando na rede local em ws://192.168.3.221:1000');
