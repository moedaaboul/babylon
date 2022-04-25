import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function itemCard({ items }) {
  return (
    <Grid container spacing={0} sx={{ p: 0 }}>
      {items &&
        items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ pl: 0, mx: 0 }}>
            <Card sx={{ p: 0, mx: 'auto', mt: 2, maxWidth: 345, boxShadow: 2, border: 1 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="400"
                  src={process.env.PUBLIC_URL + item.image}
                  alt="img placeholder"
                />
                <CardContent sx={{ height: 150 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ textAlign: 'center', fontWeight: 'bold', justifyContent: 'center' }}>
                <CardActions sx={{ m: 0, justifyContent: 'center' }}>
                  <Tooltip title="Add To Wishlist">
                    <IconButton aria-label="add to wishlist">
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body3" color="text.secondary">
                    £{item.price}
                  </Typography>
                </CardActions>
              </Box>
              <br></br>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
