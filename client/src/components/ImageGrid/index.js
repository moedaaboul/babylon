import { Grid } from '@mui/material';
import React from 'react';

const ImageGrid = ({ images, onSelect, selectedImage }) => {
  return (
    <Grid container direction="column">
      {images.map((image, index) => (
        <img
          src={image}
          height={100}
          onClick={() => onSelect(index)}
          style={{
            border:
              index === selectedImage ? 'solid 10px black' : 'solid 5px #eee',
            cursor: 'pointer',
          }}
          alt="product images"
        />
      ))}
    </Grid>
  );
};

export default ImageGrid;
