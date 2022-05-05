export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function timeConverter(UNIX_timestamp) {
  var a = new Date(+UNIX_timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDay();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var output = date + ' ' + month + ' ' + year;
  return output;
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('babylonCart', 1);
    let db, tx, store;

    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function (e) {
      console.log('There was an error');
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

export function mergy(oldCart, newItem) {
  console.log(newItem);

  const thisId = newItem.productId;
  const thisSize = newItem.productSize;
  const thisAmount = newItem.productAmount;

  let sortedCartItemArr = oldCart;

  //check repeat
  // debugger;
  if (oldCart.length === 0) {
    sortedCartItemArr.push(newItem);
    return sortedCartItemArr;
  } else {
    let repeatId = sortedCartItemArr.findIndex((oldItem) => {
      return oldItem.productId === thisId && oldItem.productSize === thisSize;
    });

    if (repeatId > -1) {
      sortedCartItemArr[repeatId].productAmount += thisAmount;
    } else {
      sortedCartItemArr.push(newItem);
    }
  }
  return sortedCartItemArr;
}

export function getSingleItemById(checkId) {
  const productDB = require('../components/SideCart/testSeed.json');

  let product;

  productDB.forEach((item, id) => {
    if (id === checkId) {
      product = item;
    }
  });

  return product;
}

export function updateSummary(state) {
  console.log('in getSummary', state);

  let newSummary = 0;
  let newSaving = 0;

  state.cart.forEach((item) => {
    newSummary += item.productDiscountedPrice * item.productAmount;
    newSaving += (item.productOriginalPrice - item.productDiscountedPrice) * item.productAmount;
  });
  return { ...state, summary: newSummary, saving: newSaving };
}
