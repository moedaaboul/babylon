import MainImage from '../../components/MainImage';
import Info from '../../components/Info';
import ImageGrid from '../../components/ImageGrid';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_ITEM } from '../../utils/queries';

const SingleItem = () => {
  const [selectedImage, setSelectedImage] = useState([]);

  const { itemId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_ITEM, {
    variables: { itemId: itemId },
  });

  const item = data?.item || {};
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  const mainImage = item.image[selectedImage];

  return (
    <Box>
      <Grid container spacing={2} style={{ maxWidth: '1100', margin: '0 auto' }}>
        <Grid item lg={2}>
          <ImageGrid item={item.image} setSelectedImage={setSelectedImage} />
        </Grid>
        <Grid item md={6}>
          <MainImage selectedImage={mainImage} />
        </Grid>
        <Grid item md={4}>
          <Info {...item} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleItem;
