import React from 'react';
import { Box, Divider, Grid, Typography, Button } from '@mui/material';

const Info = ({ title, description, price, color }) => {
  return (
    <Grid container direction="column" style={{ height: '50%' }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h4">{description}</Typography>
        <Typography variant="h5">£{price}</Typography>
        <Typography variant="h6">{color}</Typography>
      </Box>
      <Button variant="contained" color="primary" style={{ marginTop: 'auto' }}>
        Purchase
      </Button>
    </Grid>
  );
};

export default Info;
