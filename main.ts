import { Socket } from "socket.io";
import path from "path";
import { Request, Response } from "express";
import { createAdapter } from '@socket.io/redis-adapter';
import './src/infrastructure/worker/messageWorker';
import { createClient } from "redis";
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const {ChatRepository} = require('./src/infrastructure/repository/ChatRepository');
const {UserRepository} = require('./src/infrastructure/repository/UserRepository');
const { ChatDomainService } = require('./src/domain/service/ChatDomainService');
const { UserDomainService } = require('./src/domain/service/UserDomainService');
const { ChatApplicationService } = require('./src/application/service/ChatApplicationService');
const { UserApplicationService } = require('./src/application/service/UserApplicationService');
const { ChatController } = require('./src/infrastructure/controller/ChatController');
const { UserController } = require('./src/infrastructure/controller/UserController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  transports: ["websocket"],
  allowUpgrades: false,
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


const pubClient = createClient();
const subClient = pubClient.duplicate();

async function startServer() {
  await pubClient.connect();
  await subClient.connect();
  io.adapter(createAdapter(pubClient, subClient));
}

const chatRepository = new ChatRepository();
const chatDomainService = new ChatDomainService(chatRepository);
const chatAppService = new ChatApplicationService(chatDomainService);
const chatController = new ChatController(chatAppService);

const userRepository = new UserRepository();
const userDomainService = new UserDomainService(userRepository);
const userAppService = new UserApplicationService(userDomainService);
const userController = new UserController(userAppService);

app.get('/', (req: Request, res: Response) => {
  res.send("chat en tiempo real");
});

io.on('connection', (socket: Socket) => {
  console.log("Cliente conectado usando:", socket.conn.transport.name);

  chatController.handleMessage(socket);
  userController.handleUserConnection(socket);

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

startServer().then(() => {
  server.listen(4000, () => {
    console.log("Servidor escuchando en http://localhost:4000");
  });
}).catch(err => {
  console.error('Error al iniciar el servidor:', err);
});