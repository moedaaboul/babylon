import * as React from 'react';
import PropTypes from 'prop-types';
// MUI Materials
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
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
  const { title, description, price, discountedPrice, image } = product;

  return (
    <Card>
      <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1">
              &nbsp;
              {(discountedPrice && fCurrency(discountedPrice)) || fCurrency(price)}
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: '#FF0000',
                  textDecoration: 'line-through',
                  m: 1,
                }}>
                {discountedPrice && fCurrency(price)}
              </Typography>
            </Typography>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 151 }} image={image} alt={description} />
      </CardActionArea>
    </Card>
  );
}
