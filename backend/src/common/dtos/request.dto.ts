
import { IsOptional, ValidateNested } from 'class-validator';
import { Type, Exclude } from 'class-transformer';

export class RequestDto<T> {
    @Exclude()
    private type: Function;

    @IsOptional()
    userId?: number

    @IsOptional()
    user?: any

    @IsOptional()
    headers?: {

    }

    @IsOptional()
    requestCompleteUrl?: string

    @IsOptional()
    @ValidateNested()
    @Type(options => {
        return (options.newObject as RequestDto<T>).type;
    })
    data?: T

    constructor(type: Function) {
        this.type = type;
    }
}