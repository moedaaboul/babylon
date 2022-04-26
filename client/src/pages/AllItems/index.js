import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ItemCard from '../../sections/products/ItemCard';
import { QUERY_ITEMS } from '../../utils/queries';
import Box from '@mui/material/Box';
import SearchRefineSidebar from '../../sections/products/ProductSidebar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

const AllItems = () => {
  const { loading, error, data } = useQuery(QUERY_ITEMS);

  const items = data?.items || [];

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Box sx={{ display: 'flex' }}>
      <SearchRefineSidebar />
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid key={items.id} item xs={12} sm={6} md={3}>
          <Typography variant="h1">HOTTEST PRODUCTS</Typography>

          <ItemCard items={items} key={items.id} title="Current available items..." />
        </Grid>
      </Grid>
      <Box sx={{ border: 1, textAlign: 'center', mt: 16 }}>
        <Typography variant="h3" sx={{ p: 2 }}>
          LATEST LOOKS
        </Typography>
        {/* <LatestLookList/> */}
      </Box>
    </Box>
  );
};

export default AllItems;
