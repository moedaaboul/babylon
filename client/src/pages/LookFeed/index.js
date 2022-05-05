import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LOOKS } from '../../utils/queries';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { FavoriteBorderOutlined } from '@mui/icons-material';

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
        cols={3}
        gap={8}
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        sx={{ transform: 'translateZ(0)', pt: 10 }}>
        {looks.map((item) => (
          <ImageListItem key={item.image}>
            <CardActionArea component={RouterLink} to={`/look/${item._id}`}>
              <img
                src={`${item.image}?w=200&fit=crop&auto=format`}
                srcSet={`${item.image}?w=200&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
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
        ))}
      </ImageList>
    </Box>
  );
}
