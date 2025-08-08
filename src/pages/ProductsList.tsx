import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertService } from '../services/alert';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import LoadingScreen from '../components/LoadingScreen';
import api from '../services/api';
import { Product } from '../types';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get<{ data: Product[] }>('/productos');
      setProducts(response.data.data);
    } catch (error) {
      alertService.error('Error al cargar los productos');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = await alertService.confirm(
      'Esta acción no se puede deshacer. ¿Deseas continuar?',
      '¿Eliminar producto?'
    );
    if (!isConfirmed) return;

    try {
      await api.delete(`/productos/${id}`);
      alertService.success('Producto eliminado correctamente');
      fetchProducts();
    } catch (error) {
      alertService.error('Error al eliminar el producto');
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Cargando lista de productos..." />;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <button
            onClick={() => navigate('/products/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Nuevo Producto
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No hay productos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
