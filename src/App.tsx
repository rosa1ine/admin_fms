import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Overview from './dashboard/Overview';
import PendingFarmer from './dashboard/PendingFarmer';
import ApprovedFarmer from './dashboard/ApprovedFarmer';
import BuyerManagement from './dashboard/BuyerManagement';
import ProductManagement from './dashboard/ProductManagement';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure correct path

const App: React.FC = () => {
  return (
    <Routes>
      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="pending-farmers" element={<PendingFarmer />} />
        <Route path="approved-farmers" element={<ApprovedFarmer />} />
        <Route path="buyers" element={<BuyerManagement />} />
        <Route path="products" element={<ProductManagement />} />
      </Route>

      {/* Public Route for Login */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* Fallback */}
    </Routes>
  );
};

export default App;
