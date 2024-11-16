import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/modules/User/user-service";
import { GeneralException } from "src/util/general.exception";

@Injectable()
export class UserVerifyMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let requestCompleteUrl = `${req.protocol}://${req.get("Host")}${
      req.originalUrl
    }`;
    if (req.headers["userid"] && req.headers["userid"].toString()) {
      const user: any = await this.usersService.getUserById(
        req.headers["userid"].toString()
      );

      if (!user) {
        const error = new GeneralException();
        next(error);
      }
      else  {
        req.body = {
            ...req.body,
            ...req.params,
            ...req.query,
            requestCompleteUrl: requestCompleteUrl,
            user: { ...user, _id: user?._id?.toString() },
          };
    
          next();
      }

     
    } else {
      const error = new UnauthorizedException();
      next(error);
    }
  }
}
