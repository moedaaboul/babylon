import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { CLEAR_CART } from '../../state/store/actions';
import { useStoreContext } from '../../state/store/provider';

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
