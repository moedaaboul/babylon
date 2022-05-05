import React from 'react';
// import Button from '@mui/material/Button';
import Auth from '../../utils/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import './index.css';

const LockGeneral = () => {
  const location = useLocation();
  return Auth.loggedIn() ? <Outlet /> : <Navigate to="/login" replace state={{ location }} />;
};

export default LockGeneral;
