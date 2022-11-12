import routes from "./routes/routes";
import express, { Request, Response } from 'express';
import {ejecutable} from "./tests/process.test";

import http from 'http';

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  // options
});

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });

  socket.on('hello', () => {
    console.log('hello world');
  });
});

ejecutable();

app.get('/', (request: Request, res: Response) => {
  res.json({ hello: 'world' });
});


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(routes);
//
httpServer.listen(3000, () => {
 	console.log('Server on port 3000');
});
