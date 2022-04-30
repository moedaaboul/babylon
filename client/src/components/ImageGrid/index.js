import { Grid } from '@mui/material';
import { findIndex } from 'lodash';
import React from 'react';

const ImageGrid = ({ item, setSelectedImage, selectedImage }) => {
  return (
    <Grid container direction="column">
      {item.map((e, index) => (
        <img
          src={e.image[index]}
          height={100}
          onClick={() => setSelectedImage(index)}
          style={{
            border: index === selectedImage ? 'solid 10px black' : 'solid 5px #eee',
            cursor: 'pointer',
          }}
          alt="product images"
        />
      ))}
    </Grid>
  );
};

export default ImageGrid;
