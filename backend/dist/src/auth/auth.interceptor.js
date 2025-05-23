"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInterceptor = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("./errors");
const auth_service_1 = require("./auth.service");
let AuthInterceptor = class AuthInterceptor {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async intercept(context, next) {
        try {
            const request = context.switchToHttp().getRequest();
            const authString = request.headers['authorization'];
            if (!authString) {
                console.log('No auth string');
                throw new errors_1.UnauthorizedError();
            }
            request.user = await this.authService.checkAuthString(authString);
        }
        catch (e) {
            throw new errors_1.UnauthorizedError();
        }
        return next.handle();
    }
};
exports.AuthInterceptor = AuthInterceptor;
exports.AuthInterceptor = AuthInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthInterceptor);
//# sourceMappingURL=auth.interceptor.js.map