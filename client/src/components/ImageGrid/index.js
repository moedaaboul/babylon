import { Grid } from '@mui/material';
import React from 'react';

const ImageGrid = ({ item, setIndex, index }) => {
  console.log(item, 'item');
  return (
    <Grid container direction="column">
      {item.map((e, index) => {
        console.log(e, 'see what e is');
        return (
          <img
            key={index}
            src={e}
            height={100}
            onClick={() => setIndex(index)}
            style={{
              border: index === index ? 'solid 10px black' : 'solid 5px #eee',
              cursor: 'pointer',
            }}
            alt="product images"
          />
        );
      })}
    </Grid>
  );
};

export default ImageGrid;
