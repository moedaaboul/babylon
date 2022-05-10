import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BRAND_ITEMS } from '../../../utils/queries';
import { DELETE_ITEM } from '../../../utils/mutations';
import { UPDATE_ITEM } from '../../../utils/mutations';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function DataGridDemo() {
  const [snackbar, setSnackbar] = React.useState(null);
  const { loading, data } = useQuery(GET_BRAND_ITEMS);
  const [deleteItem] = useMutation(DELETE_ITEM, {
    update(cache, { data: { deleteItem } }) {
      try {
        const { brandItems } = cache.readQuery({ query: GET_BRAND_ITEMS });
        let newBrandItems = brandItems.filter((item) => {
          return item._id !== deleteItem._id;
        });
        cache.writeQuery({
          query: GET_BRAND_ITEMS,
          data: { brandItems: newBrandItems },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  const [updateItem] = useMutation(UPDATE_ITEM);
  const handleCloseSnackbar = () => setSnackbar(null);

  const productData = data?.brandItems || {};
  if (loading) {
    return <h2>loading...</h2>;
  }

  const handleDeleteItem = async (itemId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      await deleteItem({
        variables: { itemId: itemId },
      });
      setSnackbar({ children: 'Product successfully deleted', severity: 'success' });
    } catch (err) {
      setSnackbar({ children: 'An error occurred. Please try again.', severity: 'error' });
      console.error(err);
    }
  };

  const handleUpdateItem = async (input, itemId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      await updateItem({
        variables: { input: input, itemId: itemId },
      });
      setSnackbar({ children: 'Product successfully updated', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ children: 'An error occurred. Please try again.', severity: 'error' });
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Name',
      width: 120,
      editable: true,
    },
    {
      field: 'stock',
      headerName: 'In Stock',
      type: 'number',
      width: 80,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Original Price',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',
      type: 'number',
      width: 130,
      editable: true,
    },
    {
      field: 'featured',
      headerName: 'Featured',
      type: 'boolean',
      width: 80,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          onClick={() =>
            handleUpdateItem(
              {
                description: params.getValue(params.id, 'description'),
                price: params.getValue(params.id, 'price'),
                stock: params.getValue(params.id, 'stock'),
                title: params.getValue(params.id, 'title'),
                discountedPrice: params.getValue(params.id, 'discountedPrice'),
                featured: `${params.getValue(params.id, 'featured')}`,
              },
              params.id
            )
          }
        />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteItem(params.id)} />,
      ],
    },
  ];

  return (
    <>
      <DataGrid
        sx={{ height: 430, width: 1000 }}
        rows={productData}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        disableColumnMenu
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}
