import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async (): Promise<void> => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/dashboard" 
              className={`text-white transition-all duration-200 ${
                location.pathname === '/dashboard' 
                  ? 'font-bold text-white border-b-2 border-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/products" 
              className={`ml-4 transition-all duration-200 ${
                location.pathname.includes('/products') 
                  ? 'font-bold text-white border-b-2 border-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Productos
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
