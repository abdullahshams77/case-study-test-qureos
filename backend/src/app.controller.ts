import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestDto } from './common/dtos/request.dto';
import { ResponseDto } from './common/dtos/response.dto';
import { AnyResponseDto } from './common/dtos/response.dtos/any.response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test')
  async getTestData(
    @Body() reqDto: RequestDto<{}>,
  ): Promise<ResponseDto<AnyResponseDto>> {
    return this.appService.getTestData(reqDto);
  }
  @Post('example')
  async postExample(
    @Body() reqDto: RequestDto<any>,
  ): Promise<ResponseDto<AnyResponseDto>> {
    return this.appService.postExample(reqDto);
  }
}
