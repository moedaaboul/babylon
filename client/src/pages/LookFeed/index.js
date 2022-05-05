import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LOOKS } from '../../utils/queries';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardActionArea from '@mui/material/CardActionArea';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

export default function LookImageList() {
  const { loading, error, data } = useQuery(QUERY_LOOKS);
  const looks = data?.looks || [];

  if (error) return `Error! ${error.message}`;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ImageList sx={{ width: '100vw', height: '100vh' }} variant="woven" cols={2} gap={4}>
      {looks.map((item) => (
        <ImageListItem key={item.image}>
          <CardActionArea component={RouterLink} to={`/look/${item._id}`}>
            <img
              src={`${item.image}?w=161&fit=crop&auto=format`}
              srcSet={`${item.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={item.description}
              loading="lazy"
            />
          </CardActionArea>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
