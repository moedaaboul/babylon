import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_LOOK } from '../../utils/queries';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import lookTestImg from './look1.jpg';

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
          <Box sx={{ pt: '100%', position: 'relative' }}>
            <Typography variant="h3" sx={{ my: 5 }}>
              GET THIS LOOK
            </Typography>
          </Box>
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
