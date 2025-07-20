import { api } from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  permissions?: string[];
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

export const deleteUser = async (
  userId: number
): Promise<{ success: boolean; data: User }> => {
  return api.delete<{ success: boolean; data: User }>(`/users/${userId}`);
};

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; data: User }> => {
  return api.post<{ success: boolean; data: User }>('/users', user);
};

export const updateUser = async (
  userId: number,
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; data: User }> => {
  return api.put<{ success: boolean; data: User }>(`/users/${userId}`, user);
};

export const getUserPermissions = async (userId: number): Promise<string[]> => {
  const response = await api.get<{ success: boolean; data: string[] }>(
    `/users/${userId}/permissions`
  );
  return response.data;
};

export const updateUserPermissions = async (
  userId: number,
  permissions: string[]
): Promise<{ success: boolean; data: string[] }> => {
  return api.put(`/users/${userId}/permissions`, { permissions });
};
