import { HttpException, HttpStatus } from '@nestjs/common'

export class BadRequestException extends HttpException {
    constructor(errorMessage?: string) {
        super({error: errorMessage ? errorMessage : "Bad Request"}, HttpStatus.BAD_REQUEST);
    }
}