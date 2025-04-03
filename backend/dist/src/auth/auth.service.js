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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("./errors");
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("../jwt/jwt.service");
const bcrypt = require('bcryptjs');
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async checkAuthString(authString) {
        try {
            const [, data] = authString.split(' ');
            const valid = await this.jwtService.verifyToken(data);
            if (!valid) {
                throw new errors_1.AuthError();
            }
            const user = await this.jwtService.decodeToken(data);
            if (!user) {
                throw new errors_1.AuthError();
            }
            const userValid = await this.usersService.getById(user.id);
            if (!userValid) {
                throw new errors_1.AuthError();
            }
            return user;
        }
        catch (e) {
            throw new errors_1.AuthError();
        }
    }
    async login(loginDto) {
        const user = await this.usersService.getByEmail(loginDto.email);
        if (!user) {
            throw new errors_1.AuthError();
        }
        const valid = await bcrypt.compare(loginDto.password, user.password);
        if (!valid) {
            throw new errors_1.AuthError();
        }
        const token = await this.jwtService.generateToken({ id: user.id });
        user.password = "";
        return {
            user,
            token,
        };
    }
    async register(registerDto) {
        const existingUser = await this.usersService.getByEmail(registerDto.email);
        if (existingUser) {
            throw new errors_1.UserAlreadyExists();
        }
        const user = await this.usersService.createUser(registerDto);
        const token = await this.jwtService.generateToken({ id: user.id });
        return {
            user,
            token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_service_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map