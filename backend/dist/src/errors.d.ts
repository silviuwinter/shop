import { HttpException } from '@nestjs/common';
export declare class CustomError extends HttpException {
    constructor(message: string, status: number);
}
