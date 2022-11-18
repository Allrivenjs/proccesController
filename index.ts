import routes from './routes/routes';

import express, { Request, Response } from 'express';

import cors from 'cors';

import { createServer } from 'http';

import { Server } from 'socket.io';
import { ejecutabe } from './tests/process.test';

const app = express();

const httpServer = createServer(app);

app.use(
  cors({origin: ['http://localhost:5173', 'http://127.0.0.1:5173']})
);

export const io = new Server(httpServer, {
  // options
  cors: {
    origin: ['http://localhost:5173'],
  }
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

// ejecutabe();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

httpServer.listen(4000, () => {
 	console.log('Server on port 4000');
});
