import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { CLEAR_CART } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import './styles.css';
function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [state, dispatch] = useStoreContext();
  let navigate = useNavigate();
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const items = cart.map((item) => item._id);
      console.log(items);
      if (items.length) {
        const { data } = await addOrder({ variables: { items: items } });
        console.log(data);
        const itemsData = data.addOrder.items;

        itemsData.forEach((item) => {
          console.log(item);
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        dispatch({ type: CLEAR_CART });
        navigate('/');
      }, 5000);
    }

    saveOrder();
  }, []);

  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.pexels.com/photos/7430717/pexels-photo-7430717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
                <button class="btn animating" data-btn>
                  Submit
                </button>
                <div class="checkmark-container">
                  <svg x="0px" y="0px" fill="none" class="checkmark-svg" viewBox="0 0 25 30">
                    <path d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2" />
                  </svg>
                </div>
                <h2>Payment Successful!</h2>
                <h2>You will now be redirected to the home page</h2>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Success;
