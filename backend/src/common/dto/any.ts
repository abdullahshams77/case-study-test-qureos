import { IsString, IsOptional } from 'class-validator';

export class Any {
    @IsString()
    @IsOptional()
    id : string
}