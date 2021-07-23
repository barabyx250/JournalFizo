import * as express from 'express';
import * as socketIo from 'socket.io';
import { ChatEvent } from './constants';
import { ChatMessage } from './types';
import { createServer, Server } from 'http';
import { RequestManager } from './request-manager';
var cors = require('cors');
import jwt = require('express-jwt');
import jsonwebtoken = require('jsonwebtoken');

export class ChatServer {
  public static readonly PORT: number = 8080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor () {
    this._app = express();
    this.port = process.env.PORT || ChatServer.PORT;
    this._app.use(cors());
    this._app.options('*', cors());
    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  private initSocket (): void {
    this.io = socketIo(this.server);
  }

  private listen (): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on(ChatEvent.CONNECT, (socket: any) => {
      console.log('Connected client on port %s.', this.port);

      RequestManager.on(socket, this.io);

      socket.on(ChatEvent.DISCONNECT, () => {
        console.log('Client disconnected');
      });
    });

    const jwtSecret = 'secret123';
    this._app.get('/jwt', (req, res) => {
      const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);
      res.cookie('token', token, { httpOnly: true });
      res.json({ token });
    });
    this._app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));
  }

  public getApp(): express.Application {
    return this._app;
  }
}
