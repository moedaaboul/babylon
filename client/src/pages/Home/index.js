import React from 'react';
// import Button from '@mui/material/Button';
// import SaveIcon from '@mui/icons-material/Save';
import Carousel from '../../components/Carousel';
import Container from '@mui/material/Container';
import Navbar from '../../components/Navbar';
// import SideCart from "../../components/SideCart";
// import './index.css';
const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Carousel />
      </Container>
    </>
  );
};

export default Home;
