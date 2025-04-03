import { $api } from '../api';
import { AuthResponse, LoginRequest, RegisterRequest } from './dto/auth.dtos';

export class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await $api.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await $api.post<AuthResponse>('/auth/register', data);
    return response.data;
  }
}
