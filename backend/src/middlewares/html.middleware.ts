import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HtmlMiddleware implements NestMiddleware {
    constructor() { }
    use(req: Request, res: Response, next: () => void) {
        let requestCompleteUrl = `${req.protocol}://${req.get('Host')}${req.originalUrl}`;
        const isAsset = /\.(css|js|json|png|svg|jpg|jpeg|ttf)$/i.test(requestCompleteUrl); // Regular exp
        if (!requestCompleteUrl.includes('/api') && !isAsset) {
           next();
        } else {
            next();
        }
    }
}
