import { Module } from '@nestjs/common';
import { UsersService } from './user-service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../../schemas/user.schema';
import { UsersController } from './user-controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ], 
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}