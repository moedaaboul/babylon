import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

//Card
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

//List
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// Button
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Payment() {
  const [alignment, setAlignment] = React.useState('left');

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
