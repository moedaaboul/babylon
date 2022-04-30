import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

//Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../../utils/mutations';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import './index.css';
// const messageExamples = require('./messageExamples.json');

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const columns = require('./columns');
const createData = require('./createData');

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CheckOut() {
  return (
    <Box sx={{ margin: 10, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}></Grid>
        <Grid sx={{ height: getWindowDimensions().height * 0.5 }} item xs={12} md={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
