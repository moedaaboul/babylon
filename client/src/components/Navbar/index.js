//--------REACT COMPONENTS
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

//--------PROVIDERS
import { useDrawerContext } from '../../providers/DrawerStateProvider';
import { useBadgeContext } from '../../providers/BadgesStateProvider';
import { useStoreContext } from '../../state/store/provider';
import { useFilterContext } from '../../providers/FiltersStateProvider';

//--------MUI ELEMENTS
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiAlert from '@mui/material/Alert';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material';

//------FILE IMPORTS
import './styles.css';
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

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Navbar = () => {
  let navigate = useNavigate();
  //------------------------------------------------------

  //------------------------------------------------------
  const [navigateLogout, setNavigateLogout] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const { setDrawerState } = useDrawerContext();
  const { wishListCount } = useBadgeContext();
  const [state] = useStoreContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let drawerDefault = { bottom: false, right: false };
  let drawerDirection = { bottom: false, right: false };

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (navigateLogout) {
      const timeout = setTimeout(() => {
        navigate('/login');
        setNavigateLogout(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [navigateLogout, navigate]);

  const redirectToOrders = (e) => {
    navigate('/wardrobe/lists/owned');
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

  if (windowDimensions.width < 700) {
    console.log('window width < 700', windowDimensions.width);
    drawerDirection = { bottom: true, right: false };
    console.log(drawerDirection);
  } else {
    console.log('window width > 700', windowDimensions.width);
    drawerDirection = { bottom: false, right: true };
    console.log(drawerDirection);
  }

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? 'white' : 'black',
      backgroundColor: isActive ? 'black' : 'white',
    };
  };

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Grid container spacing={0}>
            <Grid item xs={0} sm={0} md={4} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              <Grid container spacing={1}>
                <Grid item md={3} className="ild-grid-col">
                  <NavLink exact={'true'} to="/items" className="category-link">
                    Items
                  </NavLink>
                </Grid>
                <Grid item md={3} className="ild-grid-col">
                  <NavLink item md={3} exact={'true'} to="/lookfeed" className="category-link">
                    Looks
                  </NavLink>
                </Grid>
                <Grid item md={3} className="ild-grid-col">
                  <NavLink item md={3} exact={'true'} to="/dashboard" className="category-link">
                    Dashboard
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              {/* <Stack spacing={2} direction="row" sx={{ display: { xs: 'block' } }}> */}
              {/* <Link component={RouterLink} to="/" variant="body2" style={{ textDecoration: 'none' }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  alignContent="center"
                  sx={{ ml: { sm: '1rem', md: '9rem', lg: '15rem', xl: '20rem' }, mt: '1rem' }}> */}
              <section className="logo-wrapper">
                <img src="./images/logo-orange.png" alt="logo" style={{ height: '30px' }}></img>
                <Typography style={{ fontWeight: 'bolder', color: 'black' }}>BABYLON</Typography>
              </section>
              {/* </Stack>
              </Link> */}
              {/* </Stack> */}
            </Grid>
          </Grid>

          <Grid item xs={8} sm={8} md={4} className="icon-group">
            <Tooltip title="Profile">
              <StyledIconButton onClick={handleClick}>
                <PersonOutlineIcon />
              </StyledIconButton>
            </Tooltip>

            <Tooltip title="Wish list">
              <StyledIconButton onClick={() => navigate('/wardrobe/lists/liked')}>
                <Badge badgeContent={wishListCount} color="secondary">
                  <FavoriteBorderIcon />
                </Badge>
              </StyledIconButton>
            </Tooltip>

            <Tooltip title="Shopping Bag">
              <StyledIconButton>
                <ClickAwayListener
                  onClick={() => {
                    setDrawerState(drawerDirection);
                  }}
                  onClickAway={() => {
                    setDrawerState(drawerDefault);
                  }}>
                  <Badge className="badge" badgeContent={state.cart.length} color="secondary">
                    <SideCart />
                  </Badge>
                </ClickAwayListener>
              </StyledIconButton>
            </Tooltip>
          </Grid>
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
          {Auth.loggedIn() ? (
            <>
              <MenuItem component={RouterLink} to="/login">
                My account
              </MenuItem>
              <MenuItem component={RouterLink} to="/items" sx={{ display: { sx: 'block', sm: 'block', md: 'none' } }}>
                All Items
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/lookfeed"
                sx={{ display: { sx: 'block', sm: 'block', md: 'none' } }}>
                Looks
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/dashboard"
                sx={{ display: { sx: 'block', sm: 'block', md: 'none' } }}>
                Dashboard
              </MenuItem>
            </>
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
        </Menu>
      </AppBar>
      <Snackbar open={navigateLogout}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Logout Success!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
