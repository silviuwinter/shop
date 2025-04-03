"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponse = exports.UserDto = exports.RegisterDto = exports.LoginDto = void 0;
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
class RegisterDto {
    name;
    email;
    password;
    username;
    address;
}
exports.RegisterDto = RegisterDto;
class UserDto {
    id;
    username;
}
exports.UserDto = UserDto;
class AuthResponse {
    user;
    token;
}
exports.AuthResponse = AuthResponse;
//# sourceMappingURL=login.dto.js.map