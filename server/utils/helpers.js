module.exports = {
  urlCompiler: function (str, query) {
    return (recompiled = str.split(/upload/)[0] + `upload/${query}` + str.split(/upload/)[1]);
  },
};
