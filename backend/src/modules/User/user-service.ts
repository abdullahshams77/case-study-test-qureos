import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RequestDto } from "src/common/dtos/request.dto";
import { RespDto } from "src/common/dtos/resp.dto";
import { create_user_dto } from "src/common/dtos/request.dtos/create_user_dto";

@Injectable()
export class UsersService {
  async getUser(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: RequestDto<create_user_dto>) {
    const { email } = createUserDto.data;

    const existingUser = await this.getUser(email);

    if (!existingUser) {
      const newUser = new this.userModel({
        email: email,
      });
      const user = await newUser.save();
      const respnse = new RespDto(user);
      return respnse;
    } else {
      const respnse = new RespDto(existingUser);
      return respnse;
    }
  }
}
