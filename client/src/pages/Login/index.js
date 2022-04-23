import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Grow,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../../components/Copyright';

import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { Link as RouterLink } from 'react-router-dom';
import './index.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function Login() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState({
  //   email: false,
  //   password: false,
  // });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoginError(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isLoginError]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setErrorMessage({
  //       email: false,
  //       password: false,
  //     });
  //   }, 1000);
  //   return () => clearTimeout(timeout);
  // }, [errorMessage]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(userFormData);
    try {
      // const response = await loginUser(userFormData);
      const { data } = await loginUser({
        variables: { ...userFormData },
      });
      setIsLoginSuccess(true);
      console.log(data);
      Auth.login(data.loginUser.token);
    } catch (err) {
      setIsLoginError(true);
      console.error(err.message);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grow in={true} timeout={1000}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                label="Password"
                type={passwordVisibility ? 'text' : 'password'}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {passwordVisibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Grow>
      <Snackbar open={isLoginSuccess} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Login Success!
        </Alert>
      </Snackbar>
      <Snackbar open={isLoginError} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Incorrect credentials have been provided.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
