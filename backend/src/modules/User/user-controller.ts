import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user-service';
import { RequestDto } from 'src/common/dtos/request.dto';
import { create_user_dto } from 'src/common/dtos/request.dtos/create_user_dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  async createUser(@Body() createUserDto: RequestDto<create_user_dto>) {
    return this.usersService.createUser(createUserDto);
  }

}
