import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { Buyer } from '../types/Buyer';

const BuyerManagement: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBuyers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/users/buyers/');
      setBuyers(response.data);
      setError(null); // Reset error if successful
    } catch (error) {
      console.error('Error fetching buyers:', error);
      setError('Failed to fetch buyers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      setError(null); // Reset any previous error
      const response = await axiosInstance.delete(`/users/buyer/${id}`);
      if (response.status === 200 || response.status === 204) {
        fetchBuyers();  // Refresh the list after deletion
      } else {
        setError('Failed to delete the buyer.');
      }
    } catch (error) {
      console.error('Error deleting buyer:', error);
      setError('An error occurred while deleting the buyer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  return (
    <div>
      <h1>Buyer Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Delivery Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buyers.map((buyer) => (
            <TableRow key={buyer.id}>
              <TableCell>{buyer.user.username}</TableCell>
              <TableCell>{buyer.user.email}</TableCell>
              <TableCell>{buyer.contact_number}</TableCell>
              <TableCell>{buyer.delivery_address}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(buyer.id)} // Delete the buyer
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuyerManagement;
