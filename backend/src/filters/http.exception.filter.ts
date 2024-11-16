import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from 'src/common/dtos/response.dto';

//HTTP_EXCEPTION_FILTER_CHANGES
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const responseDto: ResponseDto<{}> = {
            error: {
                //code: exception.message,
                message: exception.getResponse()["error"],
                statusCode: status
            }
        }
        response
            .status(status)
            .json(responseDto);
    }
}
// statusCode: status,
// message: exception.message,
// error: exception.getResponse()["error"]
// //timestamp: new Date().toISOString(),
// //path: request.url,