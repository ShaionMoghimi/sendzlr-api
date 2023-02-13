import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';

const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server });
// const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
    ws.send(`Hello you sent -> ${message}`);
  });

  console.log('Connection established');
  ws.send('Hi there, I am a websocket server');
});

server.listen(process.env.PORT || 8999, 'localhost', () => {
  console.log(`Server started on port ${server.address().port}`);
  console.log(`http://${server.address().address}:${server.address().port}`);
});