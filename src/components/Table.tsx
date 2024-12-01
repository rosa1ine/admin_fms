// src/components/Table.tsx
import React from 'react';
import './Table.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TableProps {
  headers: string[];
  data: Array<{ [key: string]: any }>;
  renderActions?: (row: { [key: string]: any }) => React.ReactNode;
}

const ReusableTable: React.FC<TableProps> = ({ headers, data, renderActions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
            {renderActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header}>{row[header]}</TableCell>
              ))}
              {renderActions && <TableCell>{renderActions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
