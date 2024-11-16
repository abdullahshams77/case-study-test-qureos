import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';
import { RequestDto } from 'src/common/dtos/request.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { plainToClassFromExist } from 'class-transformer';
import { Any } from 'src/common/dto/any';
import { ALL_APP_ROUTES_CONFIG } from 'src/util/util';
import { catchError } from 'rxjs/operators';
import { GeneralException } from 'src/util/general.exception';

export class RequestResponseInterceptor implements NestInterceptor {
  //INTERCEPTOR_CHANGES
  intercept(context: ExecutionContext, handle: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log('I am interceptor');
    const routeConfig =
      ALL_APP_ROUTES_CONFIG &&
      ALL_APP_ROUTES_CONFIG.find(
        (config) =>
          config.url === request?.route?.path &&
          config.method === request?.method,
      );
    if (routeConfig && routeConfig.refClass) {
      if (request.body) {
        //Intercepting the request
        import(`../common/dtos/request.dtos/${routeConfig.refClass}`)
          .then((module) => {
            let subModule = module[routeConfig.refClass];
            let requestDto: RequestDto<typeof subModule> =
              plainToClassFromExist(
                new RequestDto<{}>(module[routeConfig.refClass]),
                {
                  data: {
                    ...request.body,
                    ...request.params,
                    ...request.query,
                  },
                },
              );
            requestDto.headers = request.headers;
            requestDto.requestCompleteUrl = request.body['requestCompleteUrl'];
            request.body = requestDto;
          })
          .catch((err) => {
            console.log('error');
          });
      }
    } else {
      let requestDto: RequestDto<Any> = plainToClassFromExist(
        new RequestDto<Any>(Any),
        {
          data: {
            ...request.body,
            ...request.params,
            ...request.query,
          },
        },
      );

      requestDto.headers = request.headers;
      requestDto.user = request.body['user'];
      requestDto.requestCompleteUrl = request.body['requestCompleteUrl'];
      requestDto.userId = request.body['nestInterceptorUserId'];
      request.body = requestDto;
    }

    return handle.handle().pipe(
      catchError((error: any) => {
        console.log(error);
        if (error?.response?.error)
          throw new GeneralException(error?.response?.error);
        else if (error.message) throw new GeneralException(error?.message);
        else if (!error?.response) throw new GeneralException(error?._message);
        else throw new GeneralException(error?.response?.error);
      }),
      map((data) => {
        let response: ResponseDto<{}> = {};
        // console.dir(data, { depth: null });
        if (data && data.data && data.data != 'undefined') {
          const _data = typeof data.data === 'object' ? data.data : JSON.parse(data.data);
          response = {
            data: _data,
            messages: [],
          };
          return response;
        }

        //console.log('intercepting the response')
        //console.log(data)
        //This is intercepting the response
        return response;
      }),
    );
  }
}