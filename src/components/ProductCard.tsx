import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-4 aspect-h-3 bg-gray-50">
        {product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="w-full h-full object-contain object-center p-2"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.nombre}</h3>
        <div className="space-y-2 mb-6">
          <p className="text-gray-700 flex items-center">
            <span className="font-medium mr-2">Precio:</span>
            <span className="text-indigo-600 font-semibold">
              ${typeof product.precio === 'number' 
                ? product.precio.toFixed(2) 
                : Number(product.precio).toFixed(2)}
            </span>
          </p>
          <p className="text-gray-700 flex items-center">
            <span className="font-medium mr-2">Stock:</span>
            <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
              {product.stock} unidades
            </span>
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Link
            to={`/products/${product.id}/edit`}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Editar
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transform transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
