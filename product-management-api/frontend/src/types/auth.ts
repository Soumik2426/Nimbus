export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  user: User;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}