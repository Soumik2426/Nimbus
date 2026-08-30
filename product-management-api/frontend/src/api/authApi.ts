import api from "./axios";
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    UserResponse,
} from "../types/auth";
import type { ApiResponse } from "../types/api";

export const registerUser = async (
  request: RegisterRequest
): Promise<ApiResponse<UserResponse>> => {
  const response = await api.post<ApiResponse<UserResponse>>(
    "/auth/registerUser",
    request
  );

  return response.data;
};

export const loginUser = async (
  request: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    request
  );

  return response.data;
};