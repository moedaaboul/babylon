const db = require('../config/connection');
const { Item, Look } = require('../models');

db.once('open', async () => {
  // clean database
  await Item.deleteMany({});
  await Look.deleteMany({});

  // Create Items
  const items = await Item.insertMany([
    {
      title: 'Revolt Free',
      description: 'Comfortable and stylish shoes.',
      image: ['/images/blacktrainer.jpg', '/images/blacktrainer2.jpg'],
      price: 60,
      discountedPrice: 60,
      stock: 30,
      colour: 'black',
      category: 'Men',
      featured: true,
    },
    {
      title: 'Sandstorm Belt',
      description: 'Brown thick set faux-leather belt.',
      image: ['/images/brownbelt.jpg', '/images/brownbelt1.jpg'],
      price: 35,
      discountedPrice: 27,
      stock: 20,
      colour: 'brown',
      category: 'Men',
    },
    {
      title: 'Moonlight Monochrome Shirt',
      description: 'Grayscale monochrome shirt. 100% cotton.',
      image: ['/images/checkshirt.jpg'],
      price: 45,
      discountedPrice: 45,
      stock: 25,
      colour: 'grey',
      category: 'Men',
      featured: true,
    },
    {
      title: 'Spring Fling Heels',
      description: 'Bright floral heels.',
      image: ['/images/flowerheels.jpg'],
      price: 30,
      discountedPrice: 20,
      stock: 15,
      colour: 'blue',
      category: 'Women',
    },
    {
      title: 'Heartbreak T-Shirt',
      description: 'Light white cotton t-shirt with faded black broken-heart logo. Screen printed with natural dye.',
      image: ['/images/heartbreakt.jpg'],
      price: 20,
      discountedPrice: 10,
      stock: 15,
      colour: 'white',
      category: 'Men',
    },
    {
      title: 'Osaka T-Shirt',
      description: 'White and blue t-shirt with large lucky-cat design. 100% cotton. ',
      image: ['/images/kiikiiluckycat.jpg'],
      price: 30,
      discountedPrice: 20,
      stock: 15,
      colour: 'blue',
      category: 'Men',
    },
    {
      title: 'Classics',
      description: 'Stonewashed denim skinny fit jeans.',
      image: ['/images/levijeans.jpg', '/images/levijeans1.jpg'],
      price: 55,
      discountedPrice: 38,
      stock: 15,
      colour: 'blue',
      category: 'Men',
    },
    {
      title: 'Cruz Oversized Sweater',
      description: 'Soft, loose, overwized boyfriend sweater. Perfect for snuggling up.',
      image: ['/images/orangesweater.jpg'],
      price: 35,
      discountedPrice: 35,
      stock: 15,
      colour: 'orange',
      category: 'Women',
    },
    {
      title: 'Dusty Dancer Leggings',
      description: 'Dusty pink loose leggings with tapered ankle.',
      image: ['/images/pinktrousers.jpg'],
      price: 75,
      discountedPrice: 49,
      stock: 15,
      colour: 'pink',
      category: 'Women',
    },
    {
      title: 'AK-720 Gliders',
      description: 'Slim black RayBan sunglasses, slips right in the pocket.',
      image: ['/images/raybans.jpg'],
      price: 80,
      discountedPrice: 65,
      stock: 15,
      colour: 'black',
      category: 'Men',
    },
    {
      title: 'Summer Breeze Dress',
      description: 'Virbant flowing red dress with eye-catching petal pattern.',
      image: ['/images/reddress.jpg'],
      price: 50,
      discountedPrice: 50,
      stock: 15,
      colour: 'red',
      category: 'Women',
      featured: true,
    },
    {
      title: 'SeaSkimmer Timepiece',
      description: 'Suave and stylish Seiko watch, because your time is important.',
      image: ['/images/seikowatch.jpg'],
      price: 75,
      discountedPrice: 75,
      stock: 70,
      colour: 'black',
      category: 'Men',
    },
    {
      title: 'Winter Wonderland Coat',
      description: 'Warm woolen coat with wraparound belt. 100% cashmere.',
      image: ['/images/testlook1.jpg'],
      price: 55,
      discountedPrice: 55,
      stock: 40,
      colour: 'blue',
      category: 'Women',
    },
    {
      title: 'Rose-Tinted Purse',
      description: 'Dusty pink rose half-moon purse with gold zipper.',
      image: ['/images/testlook2.jpg'],
      price: 30,
      discountedPrice: 30,
      stock: 40,
      colour: 'pink',
      category: 'Women',
    },
    {
      title: 'Chunky Swinging Boots',
      description: 'White chunky calf-length boots with square toe.',
      image: ['/images/testlook3.jpg'],
      price: 45,
      discountedPrice: 45,
      stock: 60,
      colour: 'white',
      category: 'Women',
    },
  ]);

  console.log(items);
  console.log('items seeded');

  // await Look.create(lookData);
  const looks = await Look.create({
    influencer: 'Selina',
    image: '/images/look1.jpg',
    description:
      'Being swept away by the beautiful pigeons outside the cathedral. @Dior @Chanel @Balenciaga #WindyFashion',
    items: [items[12]._id, items[13]._id, items[14]._id],
  });
  console.log(looks);
  console.log('Looks data seeded!');
  console.log('all done!');
  process.exit(0);
});
