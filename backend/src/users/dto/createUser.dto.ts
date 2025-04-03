export class CreateUserDto {
  username: string;
  name: string;
  password: string;
  email: string;
  address: string;
  phone_number: string;
}

export class DeleteUserDto {
  id: string;
}

export class HandleActivateUserDto {
  id: string;

  active: boolean;
}

export class UpdateUserDto {
  id: string;
  username: string;
  name: string;
  password: string;
  email: string;
  address: string;
  phone_number: string;
}