"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("./errors");
const db_1 = require("../../db");
const bcrypt = require('bcryptjs');
let UsersService = class UsersService {
    async createUser(data) {
        const password = bcrypt.hashSync(data.password, 10);
        return db_1.prisma.user.create({
            data: {
                ...data,
                password,
                username: data.username,
                address: data.address,
                cart: {},
            }
        });
    }
    async getById(id) {
        const user = await db_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new errors_1.UserNotFoundError();
        }
        return user;
    }
    async getByEmail(email) {
        return db_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async getByUsername(username) {
        return db_1.prisma.user.findFirst({
            where: {
                username,
            },
        });
    }
    async updateUser(id, data) {
        const user = await db_1.prisma.user.update({
            where: {
                id,
            },
            data,
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map