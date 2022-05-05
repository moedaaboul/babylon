import {
  AutoAwesome as AutoAwesomeIcon,
  Search as SearchIcon,
  Favorite as FavouriteIcon,
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
} from '@mui/icons-material';

import { useBadgeContext } from '../../providers/BadgesStateProvider';

import { useStoreContext } from '../../state/store/provider';

import {
  AppBar,
  Box,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
} from '@mui/material';

import React, { useEffect, useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Auth from '../../utils/auth';

import SideCart from '../SideCart';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledIconButton = styled(IconButton)({
  color: 'inherit',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const Navbar = () => {
  const [navigateLogout, setNavigateLogout] = useState(false);
  const { wishListCount } = useBadgeContext();
  const [state] = useStoreContext();
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const redirectToOrders = (e) => {
    navigate('/MyOrders');
  };

  const redirectToHome = (e) => {
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (navigateLogout) {
      const timeout = setTimeout(() => {
        navigate('/login');
        setNavigateLogout(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [navigateLogout, navigate]);

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={redirectToHome}>
            🅱🅰🅱🆈🅻🅾🅽
          </Typography>
          <AutoAwesomeIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
          <Search>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase placeholder="search..." />
          </Search>
          <Icons>
            <Tooltip title="Profile">
              <StyledIconButton onClick={handleClick}>
                <PersonIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Wish list">
              <StyledIconButton onClick={() => navigate('/wardrobe/lists/liked')}>
                <Badge badgeContent={wishListCount} color="secondary">
                  <FavouriteIcon />
                </Badge>
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Shopping Bag">
              <StyledIconButton>
                <Badge badgeContent={state.cart.length} color="secondary">
                  <SideCart />
                </Badge>
              </StyledIconButton>
            </Tooltip>
          </Icons>
        </StyledToolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          {!Auth.loggedIn() && (
            <MenuItem component={RouterLink} to="/login">
              Login
            </MenuItem>
          )}
          {/* <MenuItem>Profile</MenuItem> */}
          {Auth.loggedIn() ? (
            <MenuItem component={RouterLink} to="/login">
              My account
            </MenuItem>
          ) : (
            <MenuItem component={RouterLink} to="/register">
              Register
            </MenuItem>
          )}
          {Auth.loggedIn() && (
            <MenuItem
              onClick={() => {
                redirectToOrders();
              }}>
              Orders
            </MenuItem>
          )}
          {Auth.loggedIn() && (
            <MenuItem
              onClick={() => {
                Auth.logout();
                setNavigateLogout(true);
              }}>
              Logout
            </MenuItem>
          )}
          {/* <MenuItem>Logout</MenuItem> */}
        </Menu>
      </AppBar>
      <Snackbar open={navigateLogout}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Logout Success!
        </Alert>
      </Snackbar>
      {/* <Notification /> */}
    </>
  );
};

export default Navbar;
