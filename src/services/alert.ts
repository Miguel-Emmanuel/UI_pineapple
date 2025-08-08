import Swal from 'sweetalert2';

interface ValidationErrors {
  [key: string]: string[];
}

export const alertService = {
  success: (message: string): void => {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'swal2-popup',
      },
      background: '#ffffff',
      width: 'auto',
      padding: '2em',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    });
  },

  error: (message: string): void => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-confirm-button',
      },
      confirmButtonColor: '#4f46e5',
      background: '#ffffff',
      width: 'auto',
      padding: '2em',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    });
  },

  warning: (message: string): void => {
    Swal.fire({
      icon: 'warning',
      title: '¡Atención!',
      text: message,
    });
  },

  info: (message: string): void => {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      text: message,
    });
  },

  confirm: async (message: string, title: string = '¿Estás seguro?'): Promise<boolean> => {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5', // Indigo-600
      cancelButtonColor: '#ef4444', // Red-500
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: true,
      customClass: {
        confirmButton: 'swal2-confirm-button',
        cancelButton: 'swal2-cancel-button',
        popup: 'swal2-popup',
      },
      background: '#ffffff',
      width: 'auto',
      padding: '2em',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    });
    return result.isConfirmed;
  },

  validationErrors: (errors: ValidationErrors): void => {
    const errorMessages = Object.values(errors).flat().join('\n');
    Swal.fire({
      icon: 'error',
      title: 'Error de validación',
      text: errorMessages,
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-confirm-button',
      },
      confirmButtonColor: '#4f46e5',
      background: '#ffffff',
      width: 'auto',
      padding: '2em',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    });
  }
};
