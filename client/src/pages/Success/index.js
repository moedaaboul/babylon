import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../../utils/mutations';
// import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      // const cart = await idbPromise('cart', 'get');
      const cart = [
        {
          productAmount: 2,
          productId: '626ea60c6191c15e3a62c814',
        },
        {
          productAmount: 3,
          productId: '626dff3fdf979270542e182d',
        },
      ];
      const items = cart.map((item) => item.productId);
      console.log(items);
      if (items.length) {
        const { data } = await addOrder({ variables: { items: items } });
        console.log(data);
        const itemsData = data.addOrder.items;

        itemsData.forEach((item) => {
          console.log(item);
          //   idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, []);

  return (
    <div>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
    </div>
  );
}

export default Success;
