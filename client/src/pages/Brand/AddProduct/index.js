import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material//Grid';
import TextField from '@mui/material//TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import the plugin code
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../../utils/mutations';
import { GET_BRAND_ITEMS } from '../../../utils/queries';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);
// FilePond.registerPlugin(FilePondPluginFileEncode);

// import './index.css';
const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [userFormData, setUserFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountedPrice: '',
    stock: '',
    category: '',
  });
  const [addItem] = useMutation(ADD_ITEM, {
    update(cache, { data: { addItem } }) {
      try {
        const { brandItems } = cache.readQuery({ query: GET_BRAND_ITEMS });

        cache.writeQuery({
          query: GET_BRAND_ITEMS,
          data: { brandItems: [addItem, ...brandItems] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = value;
    if (name === 'price' || name === 'discountedPrice') {
      parsedValue = parseFloat(value);
    }
    if (name === 'stock') {
      parsedValue = parseInt(value);
    }
    setUserFormData({ ...userFormData, [name]: parsedValue });
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await addItem({
        variables: {
          input: {
            ...userFormData,
            image: base64EncodedImage,
          },
        },
      });
      setImages([]);
      setSnackbar({ children: 'Product successfully added', severity: 'success' });
    } catch (err) {
      setSnackbar({ children: 'An error occurred. Please try again.', severity: 'error' });
      console.error(err);
    }
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    uploadImage(images);
  };

  return (
    <>
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
          <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="title"
                onChange={handleInputChange}
                value={userFormData.title}
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
                  value={userFormData.category}
                  name="category"
                  label="Category"
                  onChange={handleInputChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Men'}>Men</MenuItem>
                  <MenuItem value={'Women'}>Women</MenuItem>
                  <MenuItem value={'Kids'}>Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="description"
                onChange={handleInputChange}
                value={userFormData.description}
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
                type="number"
                onChange={handleInputChange}
                value={userFormData.price}
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
                name="discountedPrice"
                type="number"
                onChange={handleInputChange}
                value={userFormData.discountedPrice}
                required
                fullWidth
                id="discountedPrice"
                label="Selling Price"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="stock"
                type="number"
                onChange={handleInputChange}
                value={userFormData.stock}
                required
                fullWidth
                id="stockItems"
                label="Stock"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="colour"
                type="number"
                // onChange={handleInputChange}
                // value={userFormData.stock}
                required
                fullWidth
                id="stockItems"
                label="Colour"
                autoFocus
              />
            </Grid>
          </Grid>
          <FilePond
            files={files}
            allowReorder={true}
            allowMultiple={true}
            maxFiles={3}
            onupdatefiles={setFiles}
            onpreparefile={(item) => {
              console.log(item.getFileEncodeDataURL());
              console.log(files.map((e) => e.getFileEncodeDataURL()));
              const images = files.map((e) => e.getFileEncodeDataURL());
              setImages(images);
            }}
            onremovefile={(error, item) => {
              console.log(item.file);
              const reader = new FileReader();
              reader.readAsDataURL(item.file);
              reader.onloadend = () => {
                const newImages = images.filter((e) => e !== reader.result);
                setImages(newImages);
              };
            }}
            // onupdatefiles={(fileItems) => {
            //   // Set currently active file objects to this.state

            //   console.log(fileItems.map((fileItem) => fileItem.getFileEncodeDataURL()));
            // }}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          <Button onClick={handleSubmitFile} variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save Product
          </Button>
        </Box>
      </Box>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};

export default AddProduct;
