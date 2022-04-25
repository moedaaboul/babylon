import React from 'react';
import { useQuery } from '@apollo/client';
import ItemCard from '../../components/ItemCard';
import { QUERY_ITEMS } from '../../utils/queries';
import Box from '@mui/material/Box';
import SearchRefineSidebar from '../../components/SearchRefineSidebar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const AllItems = () => {
  const { loading, error, data } = useQuery(QUERY_ITEMS);

  const items = data?.items || [];

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Box sx={{ display: 'flex' }}>
      <SearchRefineSidebar />
      <Container sx={{ m: 0, width: '100%' }}>
        <Typography variant="h1">HOTTEST PRODUCTS</Typography>
        <ItemCard items={items} key={items._id} title="Current available items..." />
      </Container>
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
