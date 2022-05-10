import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FilterListIcon from '@mui/icons-material/FilterList';

// useFilterDrawerContext
import { useFilterDrawerContext } from '../../providers/FilterDrawerStateProvider';
import { ItemFilter } from '../../sections/items';

export default function FilterDrawer() {
  const { filterDrawerState, toggleFilterDrawer } = useFilterDrawerContext();
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <div>
      <React.Fragment key="left">
        <FilterListIcon onClick={toggleFilterDrawer('left', true)} />
        <Drawer anchor="left" open={filterDrawerState['left']} onClose={toggleFilterDrawer('left', false)}>
          <Box sx={{ width: 170 }}>
            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="flex-end"
              justifyContent="flex-end"
              sx={{ m: 2 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ItemFilter
                  isOpenFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
              </Stack>
            </Stack>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
