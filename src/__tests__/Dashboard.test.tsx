import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import api from '../services/api';

vi.mock('../services/api', () => ({
  default: {
    get: vi.fn()
  }
}));

describe('Dashboard', () => {
  it('muestra las estadísticas correctamente', async () => {
    const mockProducts = {
      data: {
        data: [
          { id: 1, nombre: 'Producto 1', stock: 5 },
          { id: 2, nombre: 'Producto 2', stock: 15 },
          { id: 3, nombre: 'Producto 3', stock: 8 }
        ]
      }
    };

    (api.get as any).mockResolvedValueOnce(mockProducts);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Total Productos')).toBeDefined();
      expect(screen.getByText('3')).toBeDefined(); // Total productos
      expect(screen.getByText('2')).toBeDefined(); // Productos bajo stock (< 10)
    });
  });

  it('maneja los errores correctamente', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    (api.get as any).mockRejectedValueOnce(new Error('Error de API'));

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    consoleError.mockRestore();
  });
});
