import {  IsNotEmpty, IsEmail } from 'class-validator';

export class user_dto {
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    password: string
    
}
