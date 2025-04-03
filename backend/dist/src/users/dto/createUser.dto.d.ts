export declare class CreateUserDto {
    username: string;
    name: string;
    password: string;
    email: string;
    address: string;
    phone_number: string;
}
export declare class DeleteUserDto {
    id: string;
}
export declare class HandleActivateUserDto {
    id: string;
    active: boolean;
}
export declare class UpdateUserDto {
    id: string;
    username: string;
    name: string;
    password: string;
    email: string;
    address: string;
    phone_number: string;
}
