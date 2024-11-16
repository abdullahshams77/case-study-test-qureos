import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './user-service';
import { RequestDto } from 'src/common/dtos/request.dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  async createUser(@Body() createUserDto: RequestDto<any>) {
    return this.usersService.createUser(createUserDto);
  }

}
