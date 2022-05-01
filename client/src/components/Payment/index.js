import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>

        <CardActions align="left" sx={{ position: 'relative', left: 0, bottom: 0, margin: 2 }}>
          <Button variant="contained">Confirm and Pay</Button>
        </CardActions>
      </Card>
    </>
  );
}
