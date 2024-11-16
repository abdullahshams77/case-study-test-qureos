import { HttpException, HttpStatus } from '@nestjs/common'

export class GeneralException extends HttpException {
    constructor(errorMessage?: string) {
        super({error: errorMessage ? errorMessage : "Some Error occured"}, HttpStatus.OK);
    }
}