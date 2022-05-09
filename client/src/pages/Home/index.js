import React from 'react';
// import Button from '@mui/material/Button';
// import SaveIcon from '@mui/icons-material/Save';
import Carousel from '../../components/Carousel';
import Container from '@mui/material/Container';
import Navbar from '../../components/Navbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import SideCart from "../../components/SideCart";
// import './index.css';
const Home = () => {
  return (
    <>
      <Navbar />
      <Box style={{ background: '#F2CD3C', width: '100vw' }}>
        <Grid
          container
          rowSpacing={1}
          style={{ paddingTop: '50px', paddingLeft: '20px' }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <Stack alignItems="flex-start" justifyContent="center" direction="column" spacing={1}>
              <Typography style={{ fontWeight: 'bolder' }} variant="h5">
                This just in
              </Typography>
              <Typography variant="h5">The freshest arrivals</Typography>
              <Link component={RouterLink} to="/items" variant="body2" style={{ textDecoration: 'none' }}>
                <Button
                  variant="text"
                  disableRipple
                  style={{ textTransfrom: 'inherit', color: 'black', fontWeight: 'bolder' }}>
                  Discover now <ArrowForwardIcon style={{ marginLeft: '5px' }} />
                </Button>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Container>
              <img
                src="./images/influencer5.jpg"
                alt="look"
                width="500px"
                height="auto"
                style={{ aspectRatio: 16 / 9 }}></img>
            </Container>
          </Grid>
        </Grid>
      </Box>
      {/* <Container maxWidth="xl">
        <Carousel />
      </Container> */}
    </>
  );
};

export default Home;
