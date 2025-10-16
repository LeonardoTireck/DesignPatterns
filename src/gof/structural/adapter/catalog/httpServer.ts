import express, { Handler, NextFunction, Request, Response } from "express";
import Hapi from "@hapi/hapi";

export default interface HttpServer {
  register(method: string, url: string, handler: Function): Promise<void>;
  listen(port: number): Promise<void>;
}

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
  }
  async register(method: string, url: string, handler: Handler): Promise<void> {
    this.app[method](
      url.replace(/\{|}/g, ""),
      async function (req: Request, res: Response, next: NextFunction) {
        const output = await handler(req, res, next);
        if (!output) next();
        res.json(output);
      },
    );
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port);
    console.log(`Listening on port ${port} via Express`);
  }
}

export class HapiAdapter implements HttpServer {
  server: Hapi.Server;

  constructor() {
    this.server = Hapi.server({});
  }
  async register(method: any, url: string, handler: Function): Promise<void> {
    this.server.route({
      method,
      path: url.replace(/\:/g, ""),
      handler: async function (request, response) {
        const output = await handler(request, response);
        return output;
      },
    });
  }
  async listen(port: number): Promise<void> {
    this.server.settings.port = port;
    this.server.start();
    console.log(`Listening on port ${port} via Hapi`);
  }
}
