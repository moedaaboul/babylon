import MainImage from '../../components/MainImage';
import Info from '../../components/Info';
// import ImageGrid from '../../components/ImageGrid';
// import BasicTabs from '../../components/Tabs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_ITEM } from '../../utils/queries';
import Navbar from '../../components/Navbar';

import './index.css';

const SingleItem = () => {
  const [index, setIndex] = useState(0);

  const { itemId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_ITEM, {
    variables: { itemId: itemId },
  });

  const item = data?.item || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Box className="item-page-container">
        <section className="placeHolder"></section>
        {/* <Grid container spacing={10} style={{ maxWidth: '1100', margin: '0 auto' }}> */}
        <Grid container spacing={1}>
          {/* <Grid item xs={0} md={1}></Grid> */}
          <Grid item xs={12} md={6}>
            <Box sx={{ ml: 3, mr: 3 }}>
              <MainImage item={item.image} index={index} />
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={0} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}></Grid>
          {/* <Grid item md={1}></Grid> */}
          <Grid item xs={10} sm={10} md={5}>
            <Info item={item} />
          </Grid>
          <Grid item xs={1} sm={1} md={0}></Grid>
          {/* <Grid item xs={12} sm={12}>
            <Box sx={{ ml: 3, mr: 3 }}>
              <ImageGrid item={item.image} setIndex={setIndex} />
              <BasicTabs />
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default SingleItem;
