import MainImage from '../../components/MainImage';
import Info from '../../components/Info';
import ImageGrid from '../../components/ImageGrid';
import BasicTabs from '../../components/Tabs';
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
  // console.log(data);
  // console.log(item);

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
          <Grid item xs={0} md={2}></Grid>
          <Grid item xs={12} md={3}>
            <MainImage item={item.image} index={index} />
          </Grid>
          {/* sx={{ display: { xs: 'block', sm: 'block' } }} */}
          <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }} md={1}>
            <section className="vertical-divider"></section>
            <section className="vertical-divider-place-holder"></section>
          </Grid>
          <Grid item xs={1} sm={0} md={0} sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}></Grid>
          {/* <Grid item md={1}></Grid> */}
          <Grid item xs={10} sm={10} md={4}>
            <Info item={item} />
            <ImageGrid item={item.image} setIndex={setIndex} />
            <BasicTabs />
          </Grid>
          <Grid item xs={1} sm={1} md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SingleItem;
