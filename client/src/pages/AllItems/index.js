import React from 'react';
import { useQuery } from '@apollo/client';
import ItemCard from '../../components/ItemCard';
import { QUERY_ITEMS } from '../../utils/queries';
import Box from '@mui/material/Box';

const AllItems = () => {
  const { loading, error, data } = useQuery(QUERY_ITEMS);

  const items = data?.items || [];

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Box sx={{ display: 'flex' }}>
      <ItemCard items={items} key={items._id} title="Current available items..." />
    </Box>
  );
};

export default AllItems;
