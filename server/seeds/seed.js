const db = require('../config/connection');
const { Item } = require('../models');

const itemData = require('./itemData.json');
// const lookData = require('./lookData.json');

db.once('open', async () => {
  // clean database
  await Item.deleteMany({});
  // await Look.deleteMany({});

  // bulk create each model
  await Item.create(itemData);
  // await Look.create(lookData);

  console.log(itemData);
  // console.log(lookData);
  console.log('all done!');
  process.exit(0);
});
