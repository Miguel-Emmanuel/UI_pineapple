import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductsList from './pages/ProductsList';
import ProductForm from './pages/ProductForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
