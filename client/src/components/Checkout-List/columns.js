const columns = [
  { id: 'productImg', label: '', minWidth: 200, align: 'center' },
  { id: 'productName', label: 'Product', minWidth: 200, align: 'center' },
  { id: 'productQuantity', label: 'Quantity', minWidth: 200, align: 'center' },
  {
    id: 'productTotalPrice',
    label: 'Price',
    minWidth: 200,
    align: 'center',
    format: (value) => value,
  },
];

module.exports = columns;
