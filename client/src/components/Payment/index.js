import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

//Card
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

//List
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// Button
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function Payment() {
  const [alignment, setAlignment] = React.useState('left');

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <Card sx={{ height: '100%', minWidth: 200 }}>
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            Payment Info
          </Typography>

          <Divider />
          <br></br>
          <Typography align="left" variant="caption" component="div" color="text.secondary">
            Choose your payment method
          </Typography>

          <Typography sx={{ margin: 2 }} variant="h5" component="div">
            <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
              <ToggleButton sx={{ width: 100 }} value="creditCard" aria-label="left aligned">
                <CreditCardIcon />
              </ToggleButton>
              <ToggleButton sx={{ width: 100 }} value="paypal" aria-label="centered">
                Paypal
              </ToggleButton>
            </ToggleButtonGroup>
          </Typography>
        </CardContent>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <TextField
              label="Card Number (16-digit)"
              id="outlined-start-adornment"
              sx={{ m: 1, width: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </ListItem>

          <ListItem alignItems="flex-start">
            <TextField
              label="Name on Card"
              id="outlined-start-adornment"
              sx={{ m: 1, width: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </ListItem>

          <ListItem alignItems="flex-start">
            <TextField
              label="CVV"
              id="outlined-start-adornment"
              sx={{ m: 1, width: 200 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
            <TextField
              label="Month (MM)"
              id="outlined-start-adornment"
              sx={{ m: 1, width: 200 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
            <TextField
              label="Year (YYYY)"
              id="outlined-start-adornment"
              sx={{ m: 1, width: 200 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />
          </ListItem>
        </List>

        <CardActions align="left" sx={{ position: 'relative', right: 0, bottom: 0, margin: 2 }}>
          <Button variant="contained">Confirm and Pay</Button>
        </CardActions>
      </Card>
    </>
  );
}
