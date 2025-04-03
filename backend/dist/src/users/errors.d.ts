import { CustomError } from 'src/errors';
export declare class UserNotFoundError extends CustomError {
    constructor();
}
export declare class UserAlreadyExists extends CustomError {
    constructor();
}
export declare class UsernameAlreadyExists extends CustomError {
    constructor();
}
