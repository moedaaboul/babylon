import * as React from 'react';
import SingleOrderHistory from '../../components/SingleOrderHistory';

export default function OrderHistory({ data }) {
  return (
    <>
      {data.orders.map((singleOrder, index) => {
        return <SingleOrderHistory key={index} order={singleOrder} />;
      })}
    </>
  );
}
