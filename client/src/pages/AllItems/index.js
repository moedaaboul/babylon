import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ItemList, ItemFilter, ItemSort } from '../../sections/items';
import { QUERY_ITEMS } from '../../utils/queries';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { ClickAwayListener } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import { useFilterDrawerContext } from '../../providers/FilterDrawerStateProvider';
import { useFilterContext } from '../../providers/FiltersStateProvider';
import { useSortContext } from '../../providers/SortStateProvider';
import './styles.css';

import Navbar from '../../components/Navbar';
import FilterDrawer from '../../components/FilterDrawer';

const AllItems = () => {
  const { filterDrawerState, setFilterDrawerState, toggleFilterDrawer } = useFilterDrawerContext();
  const { maxPrice, minPrice, categories, colours } = useFilterContext();
  const { priceAsc, priceDesc, sortNewest, sortFeatured } = useSortContext();
  const { loading, error, data } = useQuery(QUERY_ITEMS, {
    variables: {
      input: {
        filter: {
          minPrice: minPrice,
          maxPrice: maxPrice,
          categories: categories,
          colours: colours,
        },
        sort: {
          priceAsc: priceAsc,
          priceDesc: priceDesc,
          newest: sortNewest,
          featured: sortFeatured,
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
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ my: 5 }}>
          Products
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={0} sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}>
              <Tooltip title="Filters">
                <ClickAwayListener
                  onClick={() => {
                    setFilterDrawerState({ left: false });
                  }}>
                  <FilterDrawer />
                </ClickAwayListener>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={8} sm={12}>
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
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid sm={1} sx={{ height: '100%', display: { xs: 'flex', sm: 'none', md: 'none' } }}></Grid>
          <Grid item sm={2} md={2} sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}>
            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="flex-end"
              justifyContent="flex-end"
              sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ItemFilter
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item sm={1} md={1}></Grid>
          <Grid item xs={11} sm={8} md={9}>
            {loading ? <h6>is loading...</h6> : <ItemList products={items} />}
          </Grid>
        </Grid>
        a
      </Container>
    </>
  );
};

export default AllItems;
