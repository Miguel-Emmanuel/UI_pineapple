import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { alertService } from '../services/alert';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import api from '../services/api';
import { Product } from '../types';

interface FormData {
  nombre: string;
  precio: string | number;
  stock: string | number;
  descripcion: string;
}

interface FormErrors {
  nombre?: string;
  precio?: string;
  stock?: string;
}

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<{ data: Product }>(`/productos/${id}`);
      const { data } = response.data;
      
      if (!data) {
        alertService.error('No se encontró el producto');
        navigate('/products');
        return;
      }

      setFormData({
        nombre: data.nombre || '',
        precio: data.precio || '',
        stock: data.stock || '',
        descripcion: data.descripcion || '',
      });

      if (data.imagen_url) {
        setImagePreview(data.imagen_url);
      }
    } catch (error: any) {
      console.error('Error al cargar el producto:', error);
      alertService.error('Error al cargar el producto: ' + (error.response?.data?.message || error.message));
      navigate('/products');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.nombre) errors.nombre = 'El nombre es requerido';
    if (!formData.precio || Number(formData.precio) <= 0) errors.precio = 'El precio debe ser mayor a 0';
    if (!formData.stock || Number(formData.stock) < 0) errors.stock = 'El stock no puede ser negativo';
    return errors;
  };

  const validateImage = (file: File): boolean => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      alertService.error('Formato de imagen no válido. Use JPEG, PNG o WebP');
      return false;
    }
    if (file.size > 2097152) {
      alertService.error('La imagen no debe exceder 2MB');
      return false;
    }
    return true;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const selectedFile = files[0];
    if (validateImage(selectedFile)) {
      setFile(selectedFile);
      const preview = URL.createObjectURL(selectedFile);
      setImagePreview(preview);
    } else {
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append('nombre', formData.nombre);
      fd.append('precio', formData.precio.toString());
      fd.append('stock', formData.stock.toString());
      fd.append('descripcion', formData.descripcion);
      if (file) {
        fd.append('imagen', file);
      }

      if (id) {
        await api.put(`/productos/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alertService.success('Producto actualizado correctamente');
      } else {
        await api.post('/productos', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alertService.success('Producto creado correctamente');
      }
      navigate('/products');
    } catch (error: any) {
      if (error.response?.status === 422) {
        alertService.validationErrors(error.response.data.errors);
      } else {
        alertService.error('Error al guardar el producto');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen message={id ? "Cargando producto..." : "Preparando formulario..."} />;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {id ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              step="0.01"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.precio && <p className="mt-1 text-sm text-red-600">{errors.precio}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 w-32 object-cover rounded-md"
              />
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
