import Navbar from './Navbar';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  showNavbar?: boolean;
}

export default function LoadingScreen({ 
  message = 'Cargando...', 
  size = 'medium',
  fullScreen = true,
  showNavbar = false 
}: LoadingScreenProps) {
  const spinnerSizes = {
    small: 'h-8 w-8 border-2',
    medium: 'h-12 w-12 border-2',
    large: 'h-16 w-16 border-3'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const containerStyles = fullScreen ? 'min-h-screen' : 'min-h-[400px]';

  const LoadingContent = () => (
    <div className="flex flex-col items-center">
      <div className={`animate-spin rounded-full border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent ${spinnerSizes[size]}`} />
      <p className={`mt-4 ${textSizes[size]} text-gray-600 text-center`}>{message}</p>
    </div>
  );

  if (showNavbar) {
    return (
      <div>
        <Navbar />
        <div className={`flex items-center justify-center ${containerStyles}`}>
          <LoadingContent />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-gray-50 ${containerStyles}`}>
      <LoadingContent />
    </div>
  );
}
