import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
import Label from '../../components/Label';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  // '&:hover': {
  //   src={image[1]},
  // },
  // :hover {
  //   src={image[1]}
  // }
});

ItemCard.propTypes = {
  product: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function ItemCard({ product }) {
  const { title, image, price, salePrice } = product;

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardActionArea>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {salePrice && (
            <Label
              variant="filled"
              sx={{
                color: '#FFFFFF',
                bgcolor: '#FF0000',
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}>
              Sale
            </Label>
          )}
          <ProductImgStyle alt={title} src={image[0]} />
        </Box>
      </CardActionArea>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            &nbsp;
            {(salePrice && fCurrency(salePrice)) || fCurrency(price)}
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: '#FF0000',
                textDecoration: 'line-through',
                m: 1,
              }}>
              {salePrice && fCurrency(price)}
            </Typography>
          </Typography>

          <Tooltip title="Add To Wishlist">
            <IconButton
              aria-label="add to wishlist"
              onClick={() => {
                <FavoriteIcon />;
              }}>
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}
