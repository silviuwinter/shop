import { UserDto } from "../../../../interfaces/userInterfaces";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  username: string;
  address: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto
}