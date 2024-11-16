import { HttpException, HttpStatus } from '@nestjs/common'

export class InternalServerErrorException extends HttpException {
    constructor() {
        super({error: "Internal Server Error"}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}