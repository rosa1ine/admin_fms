import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundImage: 'url(/farming.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          backgroundColor: 'rgba(0, 102, 51, 0.9)',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '2px 0 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div>
          <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Admin Dashboard</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <StyledLink to="/">Dashboard Overview</StyledLink>
            <StyledLink to="/pending-farmers">Pending Farmers</StyledLink>
            <StyledLink to="/approved-farmers">Approved Farmers</StyledLink>
            <StyledLink to="/buyers">Buyer Management</StyledLink>
            <StyledLink to="/products">Product Management</StyledLink>
          </nav>
        </div>
        <button
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '10px',
            backgroundColor: '#d9534f',
            color: 'white',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
 <main
   style={{
     flex: 1,
     padding: '20px',
     backgroundColor: 'rgba(255, 255, 255, 0.9)',
     margin: '20px',
     borderRadius: '10px',
     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
   }}
 >
   <Outlet /> {/* Critical for nested routes */}
 </main>

    </div>
  );
};

// Updated StyledLink Component
const StyledLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    style={{
      textDecoration: 'none',
      color: 'white',
      backgroundColor: '#2a8d48',
      padding: '10px',
      borderRadius: '5px',
      textAlign: 'center',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
      display: 'block',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e7037')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2a8d48')}
  >
    {children}
  </Link>
);

export default AdminLayout;
