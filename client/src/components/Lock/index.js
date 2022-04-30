import React from 'react';
// import Button from '@mui/material/Button';
import Auth from '../../utils/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import './index.css';

const Lock = () => {
  const location = useLocation();
  const isBrand = Auth.isBrand();
  console.log(isBrand, 'Lock');
  return Auth.loggedIn() && isBrand ? <Outlet /> : <Navigate to="/" replace state={{ location }} />;
};

export default Lock;
