import React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
// import './index.css';
const Home = () => {
  return (
    <Button
      startIcon={<SaveIcon />}
      // endIcon={<SaveIcon />}
      size="small"
      href="#"
      variant="contained"
      color="primary"
      // m: margin and p: padding
      // sx={{ m: 2, p: 2 }}
      // disabled
    >
      SAVE
    </Button>
  );
};

export default Home;
