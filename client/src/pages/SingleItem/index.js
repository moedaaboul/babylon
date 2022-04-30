import MainImage from '../../components/MainImage';
import Info from '../../components/Info';
import ImageGrid from '../../components/ImageGrid';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_ITEM } from '../../utils/queries';

const SingleItem = () => {
  const [index, setIndex] = useState(0);

  const { itemId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_ITEM, {
    variables: { itemId: itemId },
  });

  const item = data?.item || {};
  console.log(data);
  console.log(item);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid container spacing={2} style={{ maxWidth: '1100', margin: '0 auto' }}>
        <Grid item lg={2}>
          <ImageGrid item={item.image} setIndex={setIndex} />
        </Grid>
        <Grid item md={6}>
          <MainImage item={item.image} index={index} />
        </Grid>
        <Grid item md={4}>
          <Info item={item} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleItem;
