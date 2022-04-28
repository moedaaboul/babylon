import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from '@apollo/client';
import { GET_BRAND_ITEMS } from '../../../utils/queries';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'stock',
    headerName: 'In Stock',
    type: 'number',
    width: 70,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Sale Price',
    type: 'number',
    width: 90,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Action',
    type: 'actions',
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        // onClick={deleteUser(params.id)}
      />,
    ],
  },
];

export default function DataGridDemo() {
  const { loading, data } = useQuery(GET_BRAND_ITEMS);
  const productData = data?.brandItems || {};
  console.log(productData);
  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <DataGrid
      sx={{ height: 430, width: 730 }}
      rows={productData}
      columns={columns}
      pageSize={5}
      getRowId={(row) => row._id}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
    />
  );
}
