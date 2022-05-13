import React from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box style={{ background: '#F2CD3C', width: '100vw' }}>
            <Grid
              container
              rowSpacing={0}
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

              <Grid
                item
                xs={12}
                sm={6}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <img src="./images/influencer5.jpg" alt="look" style={{ aspectRatio: 16 / 9 }}></img>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box style={{ background: 'white', margin: 50 }}></Box>
        </Grid>
        <Grid item xs={12}>
          <Box style={{ background: 'rgb(250, 234, 173)', width: '100vw' }}>
            <Grid
              container
              rowSpacing={1}
              style={{ paddingTop: '50px', paddingLeft: '20px' }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={6}>
                <Stack alignItems="flex-start" justifyContent="center" direction="column" spacing={1}>
                  <Typography style={{ fontWeight: 'bolder' }} variant="h5">
                    Fashion with a cause
                  </Typography>
                  <Typography variant="h5">Support reduced emissions</Typography>
                  <Link component={RouterLink} to="/items" variant="body2" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="text"
                      disableRipple
                      style={{ textTransfrom: 'inherit', color: 'black', fontWeight: 'bolder' }}>
                      Shop now <ArrowForwardIcon style={{ marginLeft: '5px' }} />
                    </Button>
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Container>
                  <Carousel />
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box style={{ background: 'white', margin: 50 }}></Box>
        </Grid>

        <Grid item xs={12}>
          <Box style={{ background: 'rgb(70, 154, 200)', width: '100vw' }}>
            <Grid
              container
              rowSpacing={1}
              style={{ paddingTop: '50px', paddingLeft: '20px' }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={6}>
                <Stack alignItems="flex-start" justifyContent="center" direction="column" spacing={1}>
                  <Typography style={{ fontWeight: 'bolder' }} variant="h5">
                    Joyful experience
                  </Typography>
                  <Typography variant="h5">More precious moments</Typography>
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
              <Grid item xs={12} sm={5}>
                <Container>
                  <Box>
                    <img
                      width="51%"
                      height="auto"
                      src={`https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
                      srcSet={`https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80 2x`}
                      alt="hats"
                      loading="lazy"
                    />

                    <img
                      width="49%"
                      height="auto"
                      src={`https://images.unsplash.com/flagged/photo-1573496760140-f15e236b5801?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
                      srcSet={`https://images.unsplash.com/flagged/photo-1573496760140-f15e236b5801?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80 2x`}
                      alt="hats"
                      loading="lazy"
                    />
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Footer />
      {/* <Container maxWidth="xl">
        <Carousel />
      </Container> */}
      <></>
    </>
  );
};

export default Home;
