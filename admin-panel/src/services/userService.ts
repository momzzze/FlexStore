import { api } from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface PaginatedUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export const getUsers = async (
  page = 1,
  limit = 10
): Promise<PaginatedUsersResponse> => {
  return api.get<PaginatedUsersResponse>(`/users?page=${page}&limit=${limit}`);
};
