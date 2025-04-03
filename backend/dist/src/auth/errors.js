"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRequestTokenInvalid = exports.UnauthorizedError = exports.UserAlreadyExists = exports.AuthError = void 0;
const errors_1 = require("../errors");
const common_1 = require("@nestjs/common");
class AuthError extends errors_1.CustomError {
    constructor() {
        super('Authentication Failed', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.AuthError = AuthError;
class UserAlreadyExists extends errors_1.CustomError {
    constructor() {
        super('User with that email already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.UserAlreadyExists = UserAlreadyExists;
class UnauthorizedError extends errors_1.CustomError {
    constructor() {
        super('Unauthorized!', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class AuthRequestTokenInvalid extends errors_1.CustomError {
    constructor() {
        super('The request Token is Invalid!', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.AuthRequestTokenInvalid = AuthRequestTokenInvalid;
//# sourceMappingURL=errors.js.map