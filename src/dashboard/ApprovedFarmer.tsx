import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { Farmer } from '../types/Farmer';

const ApprovedFarmer: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  const fetchApprovedFarmers = async () => {
    try {
      const response = await axiosInstance.get('/users/farmers/');
      setFarmers(response.data);
    } catch (error) {
      console.error('Error fetching approved farmers:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/users/farmer/${id}`);
      fetchApprovedFarmers();
    } catch (error) {
      console.error('Error deleting farmer:', error);
    }
  };

  useEffect(() => {
    fetchApprovedFarmers();
  }, []);

  return (
    <div>
      <h1>Approved Farmers</h1>
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
          {farmers.map((farmer: Farmer) => (
            <TableRow key={farmer.id}>
              <TableCell>{farmer.name}</TableCell>
              <TableCell>{farmer.location}</TableCell>
              <TableCell>{farmer.contact_info}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(farmer.id)}>
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

export default ApprovedFarmer;
