const createData = require('./createData');
const dataSeedingAmount = 10;
let rows = [];

for (let i = 0; i < dataSeedingAmount; i++) {
  rows.push(
    createData(
      'https://toptshirt.co.uk/wp-content/uploads/2016/06/m3.jpg',
      'A random Product Name',
      Math.floor(Math.random() * 100),
      (Math.random() * 100).toFixed(2)
    )
  );
}

module.exports = rows;
