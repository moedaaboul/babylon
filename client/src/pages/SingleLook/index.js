import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_LOOK } from '../../utils/queries';
// MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import lookTestImg from './look1.jpg';
import lookproduct1 from './testlook1.jpg';
import lookproduct2 from './testlook2.jpg';
import lookproduct3 from './testlook3.jpg';

const LookImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
  // '&:hover': {
  //   src={image[1]},
  // },
  // :hover {
  //   src={image[1]}
  // }
});

const SingleLook = () => {
  //   const { loading, error, data } = useQuery(GET_SINGLE_LOOK, {});
  //   const look = data?.look || [];

  //   if (error) return `Error! ${error.message}`;

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" sx={{ my: 5 }}>
        INFLUENCER'S LOOK
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            <LookImgStyle alt="Influencer Look - blue coat and pigeons in fromt of a cathedral" src={lookTestImg} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h3" sx={{ my: 5 }}>
              GET THIS LOOK
            </Typography>
            <Divider />
            <Stack spacing={2}>
              <Card>
                <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        Blue Coat
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        £65
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia component="img" sx={{ width: 151 }} image={lookproduct1} alt="blue coat" />
                </CardActionArea>
              </Card>
              <Divider />
              <Card>
                <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        Pink Purse
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        £40
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia component="img" sx={{ width: 151 }} image={lookproduct2} alt="pink purse" />
                </CardActionArea>
              </Card>
              <Divider />
              <Card>
                <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Typography component="div" variant="h5">
                        White Boots
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        £45
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia component="img" sx={{ width: 151 }} image={lookproduct3} alt="white boots" />
                </CardActionArea>
              </Card>
            </Stack>
          </Box>
          <Typography variant="h2" sx={{ my: 5 }}>
            TOTAL: £150
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleLook;

{
  /* <Grid item xs={2}>
          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ItemFilter isOpenFilter={openFilter} onOpenFilter={handleOpenFilter} onCloseFilter={handleCloseFilter} />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={10}>
          {loading ? <h6>is loading...</h6> : <ItemList products={items} />}
        </Grid> */
}
