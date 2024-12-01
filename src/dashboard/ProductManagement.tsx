import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@mui/material';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products
  const fetchProducts = async (query: string = '') => {
    try {
      const response = await axiosInstance.get(`/products/list/?name=${query}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = () => {
    fetchProducts(searchQuery);
  };

  return (
    <div>
      <h2>Product Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>₸{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductManagement;
