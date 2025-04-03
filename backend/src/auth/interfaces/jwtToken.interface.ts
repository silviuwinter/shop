export interface JwtToken {
  userId: string;
}

export interface AuthResponse {
  token: string;
  user: JwtToken;
}