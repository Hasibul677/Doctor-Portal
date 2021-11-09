import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const Service = ({ service }) => {
  const { name, description, img } = service;
  return (
    <Card sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
      <CardContent>
          <CardMedia
            component="img"
            style={{ width: 'auto', height: '80px', margin: '0 auto' }}
            image={img}
            alt="Paella dish"
          />
          <Typography sx={{ fontWeight: 400, my: 2 }} variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color='text.secondary'>
            {description.slice(0, 80)}
          </Typography>
      </CardContent>
    </Card>
  );
};

export default Service;