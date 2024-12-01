// src/components/DashboardCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: number;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, color = '#3aaa58' }) => {
  return (
    <Card
      sx={{
        backgroundColor: color,
        color: 'white',
        padding: 2,
        borderRadius: 3,
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
