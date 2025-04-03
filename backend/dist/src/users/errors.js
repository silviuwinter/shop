"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameAlreadyExists = exports.UserAlreadyExists = exports.UserNotFoundError = void 0;
const errors_1 = require("../errors");
const common_1 = require("@nestjs/common");
class UserNotFoundError extends errors_1.CustomError {
    constructor() {
        super('User with that data was not found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserNotFoundError = UserNotFoundError;
class UserAlreadyExists extends errors_1.CustomError {
    constructor() {
        super('User with that email already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.UserAlreadyExists = UserAlreadyExists;
class UsernameAlreadyExists extends errors_1.CustomError {
    constructor() {
        super('Username already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.UsernameAlreadyExists = UsernameAlreadyExists;
//# sourceMappingURL=errors.js.map