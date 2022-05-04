import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// MUI Materials
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
});

// ItemCard.propTypes = {
//   product: PropTypes.object,
//   wishlist: PropTypes.object,
// };

// ----------------------------------------------------------------------

export default function ItemCard({ product, wishList }) {
  const { _id, title, image, price, discountedPrice, brand, featured } = product;
  console.log(product, wishList);
  const likedByUser = wishList.map((e) => e.item._id).includes(_id);
  // const handleImageChange = () => {
  //   let imageSrc;
  //   for (let i = 0; i < image.length; i++) {
  //     if (image.length > 1) {
  //       imageSrc = image[1];
  //     } else {
  //       imageSrc = image[0];
  //     }
  //   }
  //   console.log(imageSrc);
  //   return imageSrc;
  // };
  // handleImageChange();

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardActionArea component={RouterLink} to={`/item/${_id}`}>
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
          {featured && (
            <Label
              variant="filled"
              sx={{
                color: '#FFFFFF',
                bgcolor: '#FFAC1C',
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}>
              Featured
            </Label>
          )}
          {/* onMouseOver={(this.src = handleImageChange())} */}
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
            <IconButton aria-label="add to wishlist" onClick={() => {}}>
              {likedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}
