import React from 'react';
import { useQuery } from '@apollo/client';
import ItemCard from '../../components/ItemCard';
import { QUERY_ITEMS } from '../../utils/queries';

const AllItems = () => {
  const { loading, error, data } = useQuery(QUERY_ITEMS);

  const items = data?.items || [];

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="all-items-container">
      <ItemCard items={items} key={items._id} title="Current available items..." />
    </div>
  );
};

export default AllItems;
