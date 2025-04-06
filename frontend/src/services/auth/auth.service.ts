import { $api } from '../api';
import { AuthResponse, LoginRequest, RegisterRequest } from './dto/auth.dtos';

// login and register requests to the server

export class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    // sends login data to the server and gets back user info
    const response = await $api.post<AuthResponse>('/auth/login', data); // makes a POST request to the login endpoint
    return response.data; // returns server's response
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    // sends register data to the server and gets back user info
    const response = await $api.post<AuthResponse>('/auth/register', data); // makes a POST request to the register endpoint
    return response.data; // returns server's response
  }
}