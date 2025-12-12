import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Login Pages
import DriverLoginPage from './pages/DriverLoginPage';
import OwnerLoginPage from './pages/OwnerLoginPage';

// Main Pages (Driver)
import LoadsFeedPage from './pages/LoadsFeedPage';
import ServicesPage from './pages/ServicesPage';
import DocumentsPage from './pages/DocumentsPage';
import MapsPage from './pages/MapsPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import SubscriptionPage from './pages/SubscriptionPage';

// Owner Pages
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage';
import OwnerDriversPage from './pages/owner/OwnerDriversPage';
import OwnerAnalyticsPage from './pages/owner/OwnerAnalyticsPage';
import OwnerChatPage from './pages/owner/OwnerChatPage';
import OwnerDocumentsPage from './pages/owner/OwnerDocumentsPage';
import OwnerMapsPage from './pages/owner/OwnerMapsPage';
import OwnerSettingsPage from './pages/owner/OwnerSettingsPage';
import PostLoadPage from './pages/owner/PostLoadPage';

function ProtectedRoute({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login/driver" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Routes */}
        <Route path="/login/driver" element={<DriverLoginPage />} />
        <Route path="/login/owner" element={<OwnerLoginPage />} />
        <Route path="/login" element={<Navigate to="/login/driver" replace />} />
        
        {/* Root redirect */}
        <Route 
          path="/" 
          element={
            user 
              ? user.role === 'owner'
                ? <Navigate to="/owner/dashboard" replace />
                : <Navigate to="/loads" replace />
              : <Navigate to="/login/driver" replace />
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/loads" 
          element={
            <ProtectedRoute>
              <LoadsFeedPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/services" 
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/documents" 
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/maps" 
          element={
            <ProtectedRoute>
              <MapsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/subscription" 
          element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          } 
        />

        {/* Owner Routes */}
        <Route 
          path="/owner/dashboard" 
          element={
            <ProtectedRoute>
              <OwnerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/drivers" 
          element={
            <ProtectedRoute>
              <OwnerDriversPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/analytics" 
          element={
            <ProtectedRoute>
              <OwnerAnalyticsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/chat" 
          element={
            <ProtectedRoute>
              <OwnerChatPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/documents" 
          element={
            <ProtectedRoute>
              <OwnerDocumentsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/maps" 
          element={
            <ProtectedRoute>
              <OwnerMapsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/settings" 
          element={
            <ProtectedRoute>
              <OwnerSettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/post-load" 
          element={
            <ProtectedRoute>
              <PostLoadPage />
            </ProtectedRoute>
          } 
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
