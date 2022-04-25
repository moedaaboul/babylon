import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Container';
import Avatar from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material//Grid';
import TextField from '@mui/material//TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import './index.css';
const AddProduct = () => {
  return (
    <Box
      sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography component="h1" variant="h5">
        Add New Product
      </Typography>
      <Box
        component="form"
        // noValidate
        //   onSubmit={handleSubmit}
        sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="product"
              // onChange={handleInputChange}
              // value={userFormData.username}
              required
              fullWidth
              id="productName"
              label="Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '99%' }}>
              <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                //   value={age}
                label="Category"
                //   onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-name"
              name="stock"
              // onChange={handleInputChange}
              // value={userFormData.username}
              required
              fullWidth
              multiline
              rows={4}
              id="stockItems"
              label="Description"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="price"
              // onChange={handleInputChange}
              // value={userFormData.username}
              required
              fullWidth
              id="price"
              label="Regular Price"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="stock"
              // onChange={handleInputChange}
              // value={userFormData.username}
              required
              fullWidth
              id="stockItems"
              label="Stock"
              autoFocus
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Save Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
