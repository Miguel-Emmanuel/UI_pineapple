import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosError, InternalAxiosRequestConfig, AxiosHeaders, AxiosResponse } from 'axios';
import { AxiosInstance } from 'axios';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock axios
const mockAxiosInstance = {
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() }
  },
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn()
};

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios');
  return {
    ...(actual as object),
    default: {
      create: () => mockAxiosInstance
    }
  };
});

describe('API Service', () => {
  let api: AxiosInstance;
  let requestCallback: ((config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig);
  let responseCallback: ((response: AxiosResponse) => AxiosResponse);
  let errorCallback: ((error: AxiosError) => Promise<never>);

  const mockLocation = {
    href: ''
  };

  beforeEach(async () => {
    // Reset mocks y módulos
    vi.resetModules();
    vi.clearAllMocks();
    localStorage.clear();
    mockLocation.href = '';

    // Capturar los callbacks
    mockAxiosInstance.interceptors.request.use.mockImplementation((callback) => {
      requestCallback = callback;
      return 1;
    });

    mockAxiosInstance.interceptors.response.use.mockImplementation((onFulfilled, onRejected) => {
      responseCallback = onFulfilled;
      errorCallback = onRejected;
      return 1;
    });

    // Importar api después de configurar los mocks
    api = (await import('../services/api')).default;
  });

  describe('Request Interceptor', () => {
    it('debería incluir el token en las cabeceras si existe', () => {
      const mockToken = 'test-token';
      localStorage.getItem = vi.fn().mockReturnValue(mockToken);
      
      const headers = new AxiosHeaders();
      const mockConfig: InternalAxiosRequestConfig = { headers };
      
      const result = requestCallback(mockConfig);
      expect(result.headers?.Authorization).toBe(`Bearer ${mockToken}`);
    });

    it('no debería incluir el token en las cabeceras si no existe', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null);
      
      const headers = new AxiosHeaders();
      const mockConfig: InternalAxiosRequestConfig = { headers };
      
      const result = requestCallback(mockConfig);
      expect(result.headers?.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    it('debería manejar errores 401 correctamente', async () => {
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true
      });

      const mockError: AxiosError = {
        response: {
          status: 401,
          data: {},
          statusText: '',
          headers: {},
          config: {} as InternalAxiosRequestConfig
        },
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: ''
      };

      try {
        await errorCallback(mockError);
        // Si no lanza error, la prueba debería fallar
        expect(true).toBe(false);
      } catch (error) {
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        expect(mockLocation.href).toBe('/login');
      }
    });

    it('debería dejar pasar errores que no son 401', async () => {
      const mockError: AxiosError = {
        response: {
          status: 500,
          data: {},
          statusText: '',
          headers: {},
          config: {} as InternalAxiosRequestConfig
        },
        isAxiosError: true,
        toJSON: () => ({}),
        name: '',
        message: ''
      };

      try {
        await errorCallback(mockError);
        // Si no lanza error, la prueba debería fallar
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe(mockError);
        expect(localStorage.removeItem).not.toHaveBeenCalled();
        expect(mockLocation.href).toBe('');
      }
    });

    it('debería manejar correctamente las respuestas exitosas', () => {
      const mockResponse: AxiosResponse = {
        data: { some: 'data' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
      };

      const result = responseCallback(mockResponse);
      expect(result).toBe(mockResponse);
    });
  });
});
