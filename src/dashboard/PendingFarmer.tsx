import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

interface Farmer {
  id: number;
  name: string;
  location: string;
  contact_info: string;
}

const PendingFarmer: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    const fetchPendingFarmers = async () => {
      try {
        const response = await axiosInstance.get('/users/admin/pending-farmers/');
        setFarmers(response.data);
      } catch (error) {
        console.error('Error fetching pending farmers:', error);
        setFeedbackMessage('Failed to fetch pending farmers.');
        setFeedbackType('error');
      }
    };

    fetchPendingFarmers();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await axiosInstance.patch(`/users/admin/pending-farmers/${id}/`, { approve: true });
      setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer.id !== id));
      setFeedbackMessage('Farmer approved successfully!');
      setFeedbackType('success');
    } catch (error) {
      console.error('Error approving farmer:', error);
      setFeedbackMessage('Failed to approve farmer.');
      setFeedbackType('error');
    }
  };

  const handleReject = async (id: number) => {
    const reason = prompt('Please enter a reason for rejection:');
    if (!reason) return;

    try {
      await axiosInstance.patch(`/users/admin/pending-farmers/${id}/`, { reject: true, reason });
      setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer.id !== id));
      setFeedbackMessage('Farmer rejected successfully!');
      setFeedbackType('success');
    } catch (error) {
      console.error('Error rejecting farmer:', error);
      setFeedbackMessage('Failed to reject farmer.');
      setFeedbackType('error');
    }
  };

  return (
    <div>
      <h2>Pending Farmers</h2>
      {feedbackMessage && (
        <div style={{ color: feedbackType === 'success' ? 'green' : 'red', marginBottom: '10px' }}>
          {feedbackMessage}
        </div>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Contact Info</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {farmers.map((farmer) => (
            <TableRow key={farmer.id}>
              <TableCell>{farmer.name}</TableCell>
              <TableCell>{farmer.location}</TableCell>
              <TableCell>{farmer.contact_info}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleApprove(farmer.id)}
                  sx={{ marginRight: 1 }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleReject(farmer.id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingFarmer;
