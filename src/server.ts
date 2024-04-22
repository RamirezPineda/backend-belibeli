import express, { type Router, type Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { PATH_PREFIX } from '@common/constants';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app: Express;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;

    this.app = express();
    this.port = port;
    this.routes = routes;
  }

  public async start(): Promise<void> {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('dev'));

    //* Routes
    this.app.use(PATH_PREFIX, this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server ready on https://localhost:${this.port} 🚀`);
    });
  }
}
