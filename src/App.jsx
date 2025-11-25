import { Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './layout/SiteLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './admin/Login';
import Dashboard from './admin/Dashboard';
import Properties from './admin/Properties';
import PropertyForm from './admin/PropertyForm';
import Leads from './admin/Leads';
import Settings from './admin/Settings';
import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import SEO from './components/SEO';

const isAuthenticated = () => {
  return Boolean(localStorage.getItem('rsv_admin_token'));
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  const adminRoutes = useMemo(
    () => (
      <Route element={<AdminLayout />}>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties/new"
          element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/properties/:id"
          element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
    ),
    []
  );

  return (
    <AnimatePresence mode="wait">
      <SEO />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        {adminRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
