import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_LOOK } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { LookCard } from '../../sections/looks';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
  const { lookId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_LOOK, { variables: { lookId: lookId } });

  const look = data?.look || {};

  const sumTotal = () => {
    let sum = 0;
    console.log(sum, 'LINE 40');
    for (let i = 0; i < look.items.length; i++) {
      if (look.items[i].discountedPrice) {
        sum++;
        console.log(sum, 'LINE 44');
      } else {
        sum = sum + look.items[i].price;
        console.log(sum, 'LINE 47');
      }
    }
    console.log(sum, 'LINE 50');
    return sum;
  };
  sumTotal();
  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) return `Error! ${error.message}`;

  return (
    <Container maxWidth="xl">
      <Box sx={{ justifyContent: 'center' }}>
        <Typography variant="h2" sx={{ my: 5 }}>
          {look.influencer}'s LOOK
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            <LookImgStyle alt="Influencer Look - blue coat and pigeons in fromt of a cathedral" src={look.image} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h4" sx={{ my: 5 }}>
              GET THIS LOOK FOR £{sumTotal()}
            </Typography>
            <Divider />
            <Stack spacing={2}>
              {look.items.map((item) => (loading ? <h6>is loading...</h6> : <LookCard items={item} />))}
            </Stack>
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
