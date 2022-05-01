import { useState } from 'react';
import { useSortContext } from '../../providers/SortStateProvider';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ShopProductSort() {
  const { setPriceAsc, setPriceDesc, setSortNewest, setSortFeatured } = useSortContext();
  const [selected, setSelected] = useState('featured');
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (value) => {
    setOpen(null);
    if (!value) {
      return;
    }
    setSelected(value);
    if (value === 'priceDesc') {
      setSortFeatured(false);
      setSortNewest(false);
      setPriceAsc(false);
      setPriceDesc(true);
    }
    if (value === 'priceAsc') {
      setSortNewest(false);
      setSortFeatured(false);
      setPriceDesc(false);
      setPriceAsc(true);
    }
    if (value === 'newest') {
      setPriceDesc(false);
      setSortFeatured(false);
      setPriceAsc(false);
      setSortNewest(true);
    }
    if (value === 'featured') {
      setPriceDesc(false);
      setPriceAsc(false);
      setSortNewest(false);
      setSortFeatured(true);
    }
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}>
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {selected}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value}
            onClick={() => handleClose(option.value)}
            sx={{ typography: 'body2' }}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
