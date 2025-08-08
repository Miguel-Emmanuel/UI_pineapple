export interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  descripcion?: string;
  imagen_url?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface DashboardStats {
  totalProducts: number;
}
