import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// MUI Materials
import { styled } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import IconButton from '@mui/material/IconButton';
import Label from '../../components/Label';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useMutation } from '@apollo/client';
import { TOGGLE_LIKE } from '../../utils/mutations';
import { QUERY_WISH_LIST } from '../../utils/queries';
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

// ----------------------------------------------------------------------

export default function WishCard({ item }) {
  const { _id, title, image, price, discountedPrice, brand, featured } = item;
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    refetchQueries: [{ query: QUERY_WISH_LIST }],
  });
  //   console.log(product, wishList);
  //   const likedByUser = wishList.map((e) => e.item._id).includes(_id);

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

  const handleToggleLike = async (item) => {
    console.log(item, 'line 57');
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      await toggleLike({
        variables: { item: item },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardActionArea>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {/* onMouseOver={(this.src = handleImageChange())} */}
          <Link to={`/item/${_id}`} component={RouterLink}>
            <ProductImgStyle alt={title} src={image[0]} />
          </Link>
          <Tooltip title="Remove from Wish list" style={{ position: 'absolute', top: 0, right: 3, color: 'white' }}>
            <IconButton aria-label="remove from wishlist" onClick={() => handleToggleLike(_id)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
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
          <Tooltip title="Add to Bag">
            <IconButton aria-label="add to bag" onClick={() => handleToggleLike(_id)}>
              <ShoppingBagIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}