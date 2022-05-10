import ImageList from '@mui/material/ImageList';
import React from 'react';

const ImageGrid = ({ item, setIndex, index }) => {
  return (
    <ImageList cols={10} rowHeight={164}>
      {item.map((e, index) => {
        return (
          <img
            key={index}
            src={e}
            height={150}
            onClick={() => setIndex(index)}
            style={{
              // border: index === index ? 'solid 2px black' : 'solid 2px #eee',
              // border: index ? 'solid 2px black' : 'solid 2px #eee',
              border: 'solid 1px lightGrey',
              cursor: 'pointer',
            }}
            alt="product images"
          />
        );
      })}
    </ImageList>
  );
};

export default ImageGrid;
