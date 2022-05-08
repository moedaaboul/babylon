import PropTypes from 'prop-types';
// material
import Grid from '@mui/material/Grid';
import ItemCard from './ItemCard';
import { useQuery } from '@apollo/client';
import { QUERY_WISH_LIST } from '../../utils/queries';
import { useBadgeContext } from '../../providers/BadgesStateProvider';

// ----------------------------------------------------------------------

ItemList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ItemList({ products, ...other }) {
  const { setWishListCount } = useBadgeContext();
  const { loading, data } = useQuery(QUERY_WISH_LIST);
  const wishList = data?.wishList || {};
  console.log(wishList, 'line 16');
  if (loading) {
    return <h2>loading...</h2>;
  }
  setWishListCount(wishList?.length || 0);
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <ItemCard product={product} wishList={wishList} />
        </Grid>
      ))}
    </Grid>
  );
}
