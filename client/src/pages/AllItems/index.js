import React from "react";
import { useQuery } from "@apollo/client";
import ItemCard from "../../components/ItemCard";
import { QUERY_ITEMS } from "../../utils/queries";

const AllItems = () => {
  const { loading, data } = useQuery(QUERY_ITEMS);
  const items = data?.items || [];
  console.log(items);
  return (
    <div className="all-items-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ItemCard items={items} title="All Items" />
      )}
    </div>
  );
};

export default AllItems;
