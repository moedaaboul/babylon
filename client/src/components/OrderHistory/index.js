import * as React from 'react';
import SingleOrderHistory from '../../components/SingleOrderHistory';

export default function OrderHistory({ orderArr }) {
  return (
    <>
      {orderArr.map((singleOrder, index) => {
        return <SingleOrderHistory key={index} order={singleOrder} />;
      })}
    </>
  );
}
