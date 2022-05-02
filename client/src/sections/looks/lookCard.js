import * as React from 'react';
import PropTypes from 'prop-types';
// MUI Materials
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// utils
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

SmallItemCard.propTypes = {
  product: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function SmallItemCard({ product }) {
  const { title, image, price, description } = product;

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {fCurrency(price)}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={image} alt={description} />
    </Card>
  );
}
