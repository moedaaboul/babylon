import React, { useState, useEffect } from 'react';
import './index.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../utils/mutations';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isUploadLimitExceeded, setIsUploadLimitExceeded] = useState(false);
  const [addItem] = useMutation(ADD_ITEM);

  // const handleImageChange = (e) => {
  //   // console.log(e.target.files[])
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

  //     // console.log("filesArray: ", filesArray);

  //     setSelectedFiles((prevImages) => prevImages.concat(filesArray));
  //     Array.from(e.target.files).map(
  //       (file) => URL.revokeObjectURL(file) // avoid memory leak
  //     );
  //   }
  // };

  const deleteImage = (item) => {
    const newImages = previewSource.filter((e) => e !== item);
    setPreviewSource(newImages);
  };

  const handleFileInputChange = (e) => {
    setFileInputState(e.target.value);
    if (previewSource.length >= 3) {
      setIsUploadLimitExceeded(true);
      return;
    }
    setIsUploadLimitExceeded(false);
    const file = e.target.files[0];
    console.log(file);
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([...previewSource, reader.result]);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    console.log(reader.result);
    reader.onloadend = () => {
      uploadImage(previewSource);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
      setErrMsg('something went wrong!');
    };
  };

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

      setFileInputState('');
      setPreviewSource('');
      setSuccessMsg('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong!');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUploadLimitExceeded(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isUploadLimitExceeded]);

  return (
    <div>
      <h1 className="title">Upload an Image</h1>
      {/* <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" /> */}
      <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          accept="image/*"
          className="form-input"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {previewSource.map((item) => (
            <>
              <ImageListItem key={item}>
                <img src={`${item}`} srcSet={`${item}`} alt={item} loading="lazy" />
              </ImageListItem>
              <Fab onClick={() => deleteImage(item)}>
                <DeleteIcon />
              </Fab>
            </>
          ))}
        </ImageList>
      )}
      <Snackbar open={isUploadLimitExceeded} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Your limit of 3 images per product has been exceeded.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
