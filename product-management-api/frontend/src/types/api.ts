export interface ApiError {
  status: number;
  message: string;
  subErrors?: Record<string, string>;
}

export interface ApiResponse<T> {
  timestamp: string;
  data: T;
  message: string;
  error: ApiError | null;
}