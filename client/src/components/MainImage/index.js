import React from 'react';

const MainImage = ({ selectedImage }) => {
  return (
    <div>
      <img src={selectedImage} width="100%" alt="main product"></img>
    </div>
  );
};

export default MainImage;
