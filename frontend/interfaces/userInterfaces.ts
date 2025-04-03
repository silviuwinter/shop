export interface UserDto {
	id: string;
	username: string;
	name: string;
	password: string;
	email: string;
	address: string;
	phone_number: string;
}

export interface AuthStorage {
	user: UserDto;
	token: string;
}