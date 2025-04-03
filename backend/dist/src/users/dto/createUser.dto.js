"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.HandleActivateUserDto = exports.DeleteUserDto = exports.CreateUserDto = void 0;
class CreateUserDto {
    username;
    name;
    password;
    email;
    address;
    phone_number;
}
exports.CreateUserDto = CreateUserDto;
class DeleteUserDto {
    id;
}
exports.DeleteUserDto = DeleteUserDto;
class HandleActivateUserDto {
    id;
    active;
}
exports.HandleActivateUserDto = HandleActivateUserDto;
class UpdateUserDto {
    id;
    username;
    name;
    password;
    email;
    address;
    phone_number;
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=createUser.dto.js.map