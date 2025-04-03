"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const common_1 = require("@nestjs/common");
class CustomError extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=errors.js.map