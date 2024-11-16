import {  IsNotEmpty, IsEmail } from 'class-validator';

export class create_user_dto {
    @IsNotEmpty()
    @IsEmail()
    email : string
}
