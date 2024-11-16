// src/middleware/json-response.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JsonResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set headers to ensure response is JSON
    res.setHeader('Content-Type', 'application/json');
    
    // Override res.json to ensure it always sends JSON
    // res.json = function (body) {
    //   res.setHeader('Content-Type', 'application/json');
    //   return res.send(JSON.parse(JSON.stringify(body)));
    // };

    next();
  }
}
