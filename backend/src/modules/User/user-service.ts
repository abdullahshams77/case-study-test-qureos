import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestDto } from 'src/common/dtos/request.dto';
import { RespDto } from 'src/common/dtos/resp.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(createUserDto: RequestDto<any>) {
    const {
      email
    } = createUserDto.data;

    const respnse = new RespDto({});
    return respnse;
  }
}
