import { api } from './api';

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/auth/login', { username, password });
  },
};
