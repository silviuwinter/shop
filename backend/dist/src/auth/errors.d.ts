import { CustomError } from '../errors';
export declare class AuthError extends CustomError {
    constructor();
}
export declare class UserAlreadyExists extends CustomError {
    constructor();
}
export declare class UnauthorizedError extends CustomError {
    constructor();
}
export declare class AuthRequestTokenInvalid extends CustomError {
    constructor();
}
