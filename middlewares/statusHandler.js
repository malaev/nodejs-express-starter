const moment = require('moment');

module.exports = (request, response) => {
    response.json({
        time: moment().format(),
        status: 'ok',
    });
};
