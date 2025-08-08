import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import api from '../services/api';
import { Product, DashboardStats } from '../types';
import { alertService } from '../services/alert';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<{ data: Product[] }>('/productos');
        const products = response.data.data;
        setStats({
          totalProducts: products.length,
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
        alertService.error('Error al cargar las estadísticas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Cargando estadísticas..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Gestiona tus productos de manera eficiente
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div 
            onClick={() => navigate('/products')}
            className="group bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100"
          >
            <div className="px-8 py-10">
              <div className="flex items-center justify-between">
                <dt className="text-xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  Total Productos
                </dt>
                <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              <dd className="mt-6 text-5xl font-bold text-indigo-600">
                {stats.totalProducts}
              </dd>
              <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Click para ver todos los productos
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/products/new')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Producto
          </button>
          <button
            onClick={() => navigate('/products')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Ver Lista de Productos
          </button>
        </div>
      </div>
    </div>
  );
}
