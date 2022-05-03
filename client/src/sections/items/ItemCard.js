import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Label from '../../components/Label';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// utils
import { fCurrency } from '../../utils/formatNumber';

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
  const { _id, title, image, price, discountedPrice } = product;

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardActionArea>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {discountedPrice && (
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
        <Link to={`/item/${_id}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
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
