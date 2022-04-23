import {
  AutoAwesome as AutoAwesomeIcon,
  Search as SearchIcon,
  Favorite as FavouriteIcon,
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";

import {
  AppBar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
<<<<<<< HEAD
} from "@mui/material";

import SideCart from "../SideCart";
import React from "react";

=======
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
>>>>>>> f0ee1371e019f60c4bf07cf2469a8eed9f5884d0
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledIconButton = styled(IconButton)({
  color: "inherit",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = () => {
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BABYLON
          </Typography>
          <AutoAwesomeIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Search>
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase placeholder="search..." />
          </Search>
          <Icons>
            <Tooltip title="Profile">
              <StyledIconButton>
                <PersonIcon onClick={handleClick} />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Wish list">
              <StyledIconButton>
                <FavouriteIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Shopping Bag">
              <StyledIconButton>
                <SideCart location="Right" />
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
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem component={RouterLink} to="/login">
            Login
          </MenuItem>
          {/* <MenuItem>Profile</MenuItem> */}
          <MenuItem>My account</MenuItem>
          <MenuItem>Orders</MenuItem>
          {/* <MenuItem>Logout</MenuItem> */}
        </Menu>
      </AppBar>
      {/* <Notification /> */}
    </>
  );
};

export default Navbar;
