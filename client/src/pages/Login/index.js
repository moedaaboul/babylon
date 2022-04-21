import {
  Divider,
  Grid,
  Slide,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Grow,
  Card,
  CardHeader,
  TextField,
  CardContent,
  Button,
} from '@mui/material';
import React from 'react';
import './index.css';

const Login = () => {
  //   const isJoin = useRouteMatch(Routes.join);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Container>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify="center"
          alignItems="center"
          spacing={6}
        >
          <Grid item sm={12} lg={6}>
            <Slide direction="down" in={true} timeout={1000}>
              <div className="HomePageContainer">
                <img
                  alt="React Task board App"
                  style={{
                    height: '400px',
                    width: '500px',
                    transform: isSmallScreen ? 'scale(0.5)' : 'none',
                  }}
                  src={
                    'https://images.pexels.com/photos/1051744/pexels-photo-1051744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  }
                ></img>
              </div>
            </Slide>
          </Grid>
          <Grid item sm={12} lg={6}>
            <div className="HomePageContainer">
              {/* <CreateBoard /> */}
              <Grow in={true} timeout={1000}>
                {/* <form onSubmit={handleSubmit}> */}
                <form>
                  <Card variant="outlined" className="CreateBoardCard">
                    <CardHeader
                      className="CreateBoardCardHeader"
                      title="Hi, Welcome back"
                      titleTypographyProps={{ variant: 'h4' }}
                    />
                    <CardContent className="CreateBoardCardContent">
                      <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                          className="CreateBoardTextField"
                          required
                          id="filled-required"
                          label="Email address"
                          placeholder="Email address"
                          variant="outlined"
                          sx={{ width: '100%' }}
                        />
                        <TextField
                          className="CreateBoardTextField"
                          required
                          id="filled-required"
                          label="Password"
                          placeholder="Password"
                          variant="outlined"
                          sx={{ m: 2, width: '100%' }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="CreateBoardButton"
                          sx={{ m: 2, width: '100%' }}
                        >
                          Login
                        </Button>
                        <Divider></Divider>
                        <Typography
                          variant="button"
                          display="block"
                          gutterBottom
                        >
                          Don't have an account?
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </form>
              </Grow>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
