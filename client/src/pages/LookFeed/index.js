import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LOOKS } from '../../utils/queries';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export default function LookImageList() {
  const { loading, error, data } = useQuery(QUERY_LOOKS);
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
  let columns = 3;
  if (isSmallScreen) {
    columns = 1;
  } else if (isMediumScreen) {
    columns = 2;
  }

  const looks = data?.looks || [];

  if (error) return `Error! ${error.message}`;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Box>
        <Typography variant="h2" sx={{ my: 5, textAlign: 'center' }}>
          Latest Babylon Looks
        </Typography>
      </Box>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <ImageList sx={{ width: '90vw', height: 'auto' }} cols={columns} rowHeight={850} gap={8}>
          {looks.map((look) => (
            <ImageListItem key={look.image} sx={{ overflow: 'hidden' }}>
              <CardActionArea component={RouterLink} to={`/look/${look._id}`}>
                <img
                  style={{ minWidth: '100%', minHeight: '850px' }}
                  src={`${look.image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${look.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={look.description}
                  loading="lazy"
                />
              </CardActionArea>
              <ImageListItemBar
                sx={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)`,
                }}
                title={look.influencer}
                position="top"
                actionIcon={
                  <IconButton sx={{ color: 'white' }} aria-label={`like ${look.description}`}>
                    {/* <FavoriteBorderIcon /> */}
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </>
  );
}
