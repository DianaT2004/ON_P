import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Pages
import LoginPage from './pages/LoginPage';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import LoadDetailPage from './pages/owner/LoadDetailPage';
import PostLoadPage from './pages/owner/PostLoadPage';
import DriverLoadsPage from './pages/driver/DriverLoadsPage';

function ProtectedRoute({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode; 
  allowedRole?: 'driver' | 'owner';
}) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user?.role !== allowedRole) {
    const redirectPath = user?.role === 'driver' ? '/driver/loads' : '/owner/dashboard';
    return <Navigate to={redirectPath} replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Root redirect based on role */}
        <Route 
          path="/" 
          element={
            user?.role === 'driver' 
              ? <Navigate to="/driver/loads" replace /> 
              : user?.role === 'owner'
              ? <Navigate to="/owner/dashboard" replace />
              : <Navigate to="/login" replace />
          } 
        />

        {/* Owner Routes */}
        <Route 
          path="/owner/dashboard" 
          element={
            <ProtectedRoute allowedRole="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/load/:loadId" 
          element={
            <ProtectedRoute allowedRole="owner">
              <LoadDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/post-load" 
          element={
            <ProtectedRoute allowedRole="owner">
              <PostLoadPage />
            </ProtectedRoute>
          } 
        />

        {/* Driver Routes */}
        <Route 
          path="/driver/loads" 
          element={
            <ProtectedRoute allowedRole="driver">
              <DriverLoadsPage />
            </ProtectedRoute>
          } 
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
