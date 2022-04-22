import React from "react";
import { useQuery } from "@apollo/client";
import ItemCard from "../../components/ItemCard";
import { QUERY_ITEMS } from "../../utils/queries";
// import { Grid } from

const AllItems = () => {
  const { loading, error, data } = useQuery(QUERY_ITEMS);
  // const dataDestruct = { ...data };
  console.log(data);
  const items = data?.items || [];
  console.log(items);
  // const destruct = { ...data };
  // console.log("DESTRUCTURED", destruct);
  // const items = { ...data };
  // console.log(items);
  // const items = data?.items || [];
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  // console.log(items);
  return (
    <div className="all-items-container">
      <ItemCard items={items} title="Here's the current roster of friends..." />
    </div>
  );
};

export default AllItems;
