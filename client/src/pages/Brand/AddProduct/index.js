import React, { useState, useEffect } from 'react';
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
import Dashboard from '../../Dashboard';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import the plugin code
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../../utils/mutations';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);
// FilePond.registerPlugin(FilePondPluginFileEncode);

// import './index.css';
const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [addItem] = useMutation(ADD_ITEM);
  // function setMetadata(fileItems) {
  //   return fileItems.map((fileItem) => fileItem.getFileEncodeDataURL());
  // }

  const uploadImage = async (base64EncodedImage) => {
    try {
      await addItem({
        variables: {
          input: {
            title: 'asdfasdf',
            description: 'asdfasdf',
            image: base64EncodedImage,
            price: 3,
            stock: 4,
            size: ['aasdf'],
          },
        },
      });
      setImages([]);
      console.log('success');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    uploadImage(images);
  };

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
          onremovefile={(item) => {
            console.log(item);
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
  );
};

export default AddProduct;
