import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../../components/Copyright';

import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
    },
  },
});

export default function Login() {
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [redirectOnLoginSuccess, setRedirectOnLoginSuccess] = useState(false);

  useEffect(() => {
    if (redirectOnLoginSuccess) {
      const timeout = setTimeout(() => {
        navigate('/dashboard');
        setRedirectOnLoginSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [redirectOnLoginSuccess, navigate]);

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
      console.log(Auth.getToken());
      setRedirectOnLoginSuccess(true);
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
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: { lg: 'none', xl: 'none' } }}>
          <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button disableRipple>
              <Link component={RouterLink} to="/" variant="body2" style={{ textDecoration: 'none' }}>
                <CloseIcon />
              </Link>
            </Button>
            <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90vw' }}>
              <Button disableRipple style={{ fontWeight: 'bolder', color: 'black' }} disabled>
                Login
              </Button>
              <Link component={RouterLink} to="/register" variant="body2" style={{ textDecoration: 'none' }}>
                <Button
                  disableRipple
                  disableFocusRipple
                  style={{
                    fontWeight: 'bolder',
                    color: '#6328e0',
                  }}>
                  Register
                </Button>
              </Link>
            </Box>
          </Box>
          <Divider />
        </Box>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ ml: { xs: '1rem', sm: '5rem', md: '10rem', lg: '15rem', xl: '20rem' }, mt: '1rem' }}>
          <img src="./images/logo-orange.png" alt="logo" style={{ height: '30px' }}></img>
          <Typography style={{ fontWeight: 'bolder' }}>BABYLON</Typography>
        </Stack>
        <Grow in={true} timeout={1000}>
          <Box component="main" style={{ overflowY: 'hidden', width: '100vw' }}>
            <CssBaseline />
            <Container maxWidth="sm">
              <Box
                sx={{
                  marginLeft: { xs: 8, sm: 4, md: 0 },
                  marginRight: { xs: 8, sm: 4, md: 0 },
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  // alignItems: 'center',
                }}>
                <Typography component="h1" variant="h5">
                  <strong>Welcome back</strong>
                </Typography>
                <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
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
                            edge="end">
                            {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="current-password"
                  />
                  <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      '&:hover': {
                        backgroundColor: '#66676e',
                        color: '#fff',
                      },
                      lineHeight: 2.75,
                    }}>
                    Sign In
                  </Button>
                  {/* <Grid container justifyContent="flex-end">
                    <Link component={RouterLink} to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid> */}
                  {/* <Divider></Divider> */}
                </Box>
              </Box>
            </Container>
            <Divider />
            <Container maxWidth="sm">
              <Box
                sx={{
                  marginLeft: { xs: 8, sm: 4, md: 0 },
                  marginRight: { xs: 8, sm: 4, md: 0 },
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  // alignItems: 'center',
                }}>
                <Typography component="h1" variant="h5">
                  <strong>I'm new here</strong>
                </Typography>
                <Link component={RouterLink} to="/register" variant="body2" style={{ textDecoration: 'none' }}>
                  <Button
                    type="submit"
                    fullWidth
                    disableRipple
                    variant="outlined"
                    sx={{
                      mt: 3,
                      mb: 2,
                      '&:hover': {
                        backgroundColor: '#66676e',
                        color: '#fff',
                      },
                      lineHeight: 2.75,
                    }}>
                    Register
                  </Button>
                </Link>
              </Box>

              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </Box>
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
    </>
  );
}
