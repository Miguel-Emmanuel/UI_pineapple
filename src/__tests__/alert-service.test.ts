import { describe, it, expect, vi, beforeEach } from 'vitest';
import { alertService } from '../services/alert';
import Swal from 'sweetalert2';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
  },
}));

describe('Alert Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería mostrar mensaje de éxito', () => {
    const message = 'Operación exitosa';
    alertService.success(message);
    
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      showConfirmButton: false,
      timer: 1500
    });
  });

  it('debería mostrar mensaje de error', () => {
    const message = 'Ha ocurrido un error';
    alertService.error(message);
    
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  });

  it('debería mostrar confirmación', async () => {
    const message = '¿Está seguro?';
    const result = await alertService.confirm(message);
    
    expect(Swal.fire).toHaveBeenCalledWith({
      title: '¿Estás seguro?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });
    
    expect(result).toBe(true);
  });

  it('debería mostrar errores de validación', () => {
    const errors = {
      nombre: ['El nombre es requerido'],
      precio: ['El precio debe ser mayor a 0']
    };
    
    alertService.validationErrors(errors);
    
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error de validación',
      text: 'El nombre es requerido\nEl precio debe ser mayor a 0',
    });
  });
});
