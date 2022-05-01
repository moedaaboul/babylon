const columns = [
  { id: 'productImg', label: 'Image', minWidth: 200 },
  { id: 'productName', label: 'Product', minWidth: 200 },
  { id: 'productQuantity', label: 'Quantity', minWidth: 200 },
  {
    id: 'productTotalPrice',
    label: 'Price',
    minWidth: 200,
    format: (value) => value,
  },
];

module.exports = columns;
