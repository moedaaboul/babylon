import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../state/store/provider';
// import { ADD_MULTIPLE_TO_CART } from '../../state/store/actions';
import Button from '@mui/material/Button';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutButton = () => {
  // const [state, dispatch] = useStoreContext();
  const cart = [
    {
      productAmount: 2,
      productId: '626ea60c6191c15e3a62c814',
      // productTitle: 'adidas',
      // productDescription: 'asdfasf',
      // productDiscountedPrice: 89.99,
    },
    {
      productAmount: 3,
      productId: '626dff3fdf979270542e182d',
      // productTitle: 'AIRMAX-877',
      // productDescription: '2ALKSDJFA',
      // productDiscountedPrice: 29,
    },
  ];
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        // ou must provide one of lineItems, items, or sessionId.
        console.log(data);
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // useEffect(() => {
  //   async function getCart() {
  //     const cart = await idbPromise('cart', 'get');
  //     dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
  //   }

  //   if (!state.cart.length) {
  //     getCart();
  //   }
  // }, [state.cart.length, dispatch]);

  function submitCheckout() {
    const itemIds = [];

    cart.forEach((item) => {
      for (let i = 0; i < item.productAmount; i++) {
        itemIds.push(item.productId);
      }
      console.log(itemIds);
    });

    getCheckout({
      variables: { items: itemIds },
    });
  }

  return (
    <>
      <Button onClick={submitCheckout}>Checkout</Button>
    </>
  );
};

export default CheckoutButton;
