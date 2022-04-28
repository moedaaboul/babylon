import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ItemList, ItemFilter, ItemSort } from '../../sections/items';
import { QUERY_ITEMS } from '../../utils/queries';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// import { Grid } from '@mui/material';

const AllItems = () => {
  const { loading, error, data } = useQuery(QUERY_ITEMS);
  const [openFilter, setOpenFilter] = useState(false);
  const items = data?.items || [];

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Box title="Dashboard: Products">
      <Container>
        <Typography variant="h2" sx={{ mt: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ItemFilter isOpenFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} />
            <ItemSort />
          </Stack>
        </Stack>

        <ItemList products={items} />
      </Container>
    </Box>
  );
};

export default AllItems;
