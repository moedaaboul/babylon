module.exports = {
  urlCompiler: (str, query) => {
    return (recompiled = str.split(/upload/)[0] + `upload/${query}` + str.split(/upload/)[1]);
  },
  formatDate: (str) => {
    const split = str.split(',');
    const number = parseInt(split[0].split(' ')[1]);
    const day = [1, 21, 31].includes(number)
      ? `${split[0]}st,`
      : [2, 22].includes(number)
      ? `${split[0]}nd,`
      : [3, 23].includes(number)
      ? `${split[0]}rd,`
      : `${split[0]}th,`;
    const year = split[1].trim();
    const time = split[2].length === 8 ? `at 0${split[2].toLowerCase().trim()}` : `at ${split[2].toLowerCase().trim()}`;
    return `${day} ${year} ${time}`;
  },
};
