
export class ResponseDto<T> {
    data?: T
    error? : {
        code? : string,
        message : string,
        statusCode : number
    }
    messages? : {
        code :  string,
        message : string
    }[]
}