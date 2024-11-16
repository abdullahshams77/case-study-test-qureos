// no-cache.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class NoCacheMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set Cache-Control: no-cache header
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');

    // Continue with the next middleware or route handler
    next();
  }
}
