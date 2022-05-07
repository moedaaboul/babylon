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

// ItemCard.propTypes = {
//   product: PropTypes.object,
//   wishlist: PropTypes.object,
// };

// ----------------------------------------------------------------------

export default function ItemCard({ product, wishList }) {
  const { _id, title, image, price, discountedPrice, featured } = product;
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    refetchQueries: [{ query: QUERY_WISH_LIST }],
  });
  console.log(product, wishList);
  const likedByUser = wishList.map((e) => e.item._id).includes(_id);

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
          <Link to={`/item/${_id}`} component={RouterLink}>
            <ProductImgStyle alt={title} src={image[0]} />
          </Link>
          <Tooltip title="Add To Wishlist" style={{ position: 'absolute', top: 3, right: 3 }} color={'secondary'}>
            <IconButton aria-label="add to wishlist" onClick={() => handleToggleLike(_id)}>
              {likedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
              {(discountedPrice !== price && fCurrency(price)) || null}
            </Typography>
          </Typography>
          {discountedPrice < price && (
            <Label
              variant="filled"
              sx={{
                color: '#FFFFFF',
                bgcolor: '#FF0000',

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

                textTransform: 'uppercase',
              }}>
              Featured
            </Label>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
