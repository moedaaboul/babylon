import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ItemList, ItemFilter, ItemSort } from '../../sections/items';
import { QUERY_ITEMS } from '../../utils/queries';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import { useFilterContext } from '../../providers/FiltersStateProvider';

const AllItems = () => {
  const { maxPrice } = useFilterContext();
  const { loading, error, data } = useQuery(QUERY_ITEMS, {
    variables: {
      input: {
        filter: {
          maxPrice: maxPrice,
        },
      },
    },
  });
  const [openFilter, setOpenFilter] = useState(false);
  const items = data?.items || [];

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  if (error) return `Error! ${error.message}`;

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" sx={{ my: 5 }}>
        Products
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
        <ItemSort />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ItemFilter isOpenFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={10}>
          {loading ? <h6>is loading...</h6> : <ItemList products={items} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllItems;
