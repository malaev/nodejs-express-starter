const util = require('util');

module.exports = (data, deep = 4) => {
    console.log(util.inspect(data, false, deep, true));
};
