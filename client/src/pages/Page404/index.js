import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  //   backgroundColor: 'rgb(249, 250, 251)',
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
          spelling.
        </Typography>

        <Box
          component="img"
          src="https://media0.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif?cid=ecf05e471sdqcmxykoz15h6szjnk2n9vysu6rle0d46ftijg&rid=giphy.gif&ct=g"
          sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
        />

        <Button to="/" size="large" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </ContentStyle>
    </Container>
  );
}
