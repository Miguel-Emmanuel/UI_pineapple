import api from './api';
import { User, AuthResponse } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  
  getUser: async (): Promise<User> => {
    const response = await api.get<{ data: User }>('/auth/me');
    return response.data.data;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};
