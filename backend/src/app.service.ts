import { Injectable } from '@nestjs/common';
import { RequestDto } from './common/dtos/request.dto';
import { ResponseDto } from './common/dtos/response.dto';
import { AnyResponseDto } from './common/dtos/response.dtos/any.response.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from production';
  }
  getTestData(reqDto: RequestDto<{}>): ResponseDto<AnyResponseDto> {
    const resp: ResponseDto<AnyResponseDto> = {
      data: {
        operationStatus: 'DONE',
      },
    };
    return resp;
  }
  postExample(reqDto: RequestDto<any>): ResponseDto<AnyResponseDto> {
    const resp: ResponseDto<AnyResponseDto> = {
      data: {
        operationStatus: 'DONE',
      },
    };
    return resp;
  }
}
