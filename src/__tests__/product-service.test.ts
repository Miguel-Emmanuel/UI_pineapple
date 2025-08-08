import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../services/api';
import { Product } from '../types';

vi.mock('../services/api');

describe('Product Service Integration', () => {
  const mockProduct: Product = {
    id: 1,
    nombre: 'Test Product',
    precio: 100,
    stock: 10,
    descripcion: 'Test Description'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería obtener la lista de productos', async () => {
    const mockResponse = { data: { data: [mockProduct] } };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const response = await api.get<{ data: Product[] }>('/productos');
    expect(response.data.data).toHaveLength(1);
    expect(response.data.data[0]).toEqual(mockProduct);
    expect(api.get).toHaveBeenCalledWith('/productos');
  });

  it('debería crear un nuevo producto', async () => {
    const mockResponse = { data: { data: mockProduct } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const formData = new FormData();
    formData.append('nombre', mockProduct.nombre);
    formData.append('precio', mockProduct.precio.toString());
    formData.append('stock', mockProduct.stock.toString());
    formData.append('descripcion', mockProduct.descripcion || '');

    const response = await api.post('/productos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    expect(response.data.data).toEqual(mockProduct);
    expect(api.post).toHaveBeenCalledWith('/productos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  });

  it('debería actualizar un producto existente', async () => {
    const mockResponse = { data: { data: mockProduct } };
    (api.put as any).mockResolvedValueOnce(mockResponse);

    const formData = new FormData();
    formData.append('nombre', mockProduct.nombre);
    formData.append('precio', mockProduct.precio.toString());
    formData.append('stock', mockProduct.stock.toString());
    formData.append('descripcion', mockProduct.descripcion || '');

    const response = await api.put(`/productos/${mockProduct.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    expect(response.data.data).toEqual(mockProduct);
    expect(api.put).toHaveBeenCalledWith(`/productos/${mockProduct.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  });

  it('debería eliminar un producto', async () => {
    const mockResponse = { data: { message: 'Producto eliminado' } };
    (api.delete as any).mockResolvedValueOnce(mockResponse);

    const response = await api.delete(`/productos/${mockProduct.id}`);
    expect(response.data.message).toBe('Producto eliminado');
    expect(api.delete).toHaveBeenCalledWith(`/productos/${mockProduct.id}`);
  });
});
