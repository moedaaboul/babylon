import React from "react";
import { useQuery } from "@apollo/client";
import ItemList from "../../components/ItemCard";
import { QUERY_ITEMS } from "../../utils/queries";

const AllItems = () => {
  const { loading, data } = useQuery(QUERY_ITEMS);
  const items = data?.items || [];
  return (
    <div className="all-items-container">
      <ItemList items={items} title="Here's the current roster of friends..." />
    </div>
  );
};

export default AllItems;
