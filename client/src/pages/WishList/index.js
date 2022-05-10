import React from 'react';
import { useQuery } from '@apollo/client';
import WishCard from './WishCard';
import { QUERY_WISH_LIST } from '../../utils/queries';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useBadgeContext } from '../../providers/BadgesStateProvider';
import Navbar from '../../components/Navbar';

const WishList = () => {
  const { loading, data, error } = useQuery(QUERY_WISH_LIST);
  const { setWishListCount } = useBadgeContext();
  if (loading) return <h6>loading...</h6>;
  if (error) return `Error! ${error.message}`;
  const likedData = data?.wishList || [];
  const likedItems = likedData.map((e) => e.item);
  setWishListCount(likedItems?.length || 0);
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h3" sx={{ my: 5 }}>
          Liked Items
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {loading ? (
              <h6>is loading...</h6>
            ) : (
              <Grid container spacing={3}>
                {likedItems.map((item) => (
                  <Grid key={item.id} item xs={12} sm={6} md={4}>
                    <WishCard item={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WishList;
