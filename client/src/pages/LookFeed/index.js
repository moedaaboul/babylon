import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LOOKS } from '../../utils/queries';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardActionArea from '@mui/material/CardActionArea';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { FavoriteBorderOutlined } from '@mui/icons-material';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function LookImageList() {
  const { loading, error, data } = useQuery(QUERY_LOOKS);
  const looks = data?.looks || [];

  if (error) return `Error! ${error.message}`;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ width: '100vw', height: '100vh', overflowY: 'scroll' }}>
      <ImageList
        variant="masonry"
        rowHeight={200}
        gap={1}
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        sx={{ transform: 'translateZ(0)', pt: 10 }}>
        {looks.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;

          return (
            <ImageListItem key={item.image} cols={cols} rows={rows}>
              <CardActionArea component={RouterLink} to={`/look/${item._id}`}>
                <img {...srcset(item.image, 250, 200, rows, cols)} alt={item.description} loading="lazy" />
              </CardActionArea>
              <ImageListItemBar
                sx={{
                  background:
                    `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ` + `rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)`,
                }}
                title={item.influencer}
                position="top"
                actionIcon={
                  <IconButton sx={{ color: 'white' }} aria-label={`like ${item.description}`}>
                    <FavoriteBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
