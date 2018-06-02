const body = require('body-parser');
const cors = require('cors');
const Express = require('express');
const morgan = require('morgan');
const useragent = require('express-useragent');

const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

const app = new Express();
const TEST = process.env.NODE_ENV === 'test';

app.disable('x-powered-by');
app.use(cors(config.get('CORS')));
app.use(morgan(TEST ? () => {} : config.get('LOGGER')));
app.use(useragent.express());
app.use(body.urlencoded(config.get('BODY:URLENCODED')));
app.use(body.json(config.get('BODY:JSON')));
app.use(router);
app.use(errorHandler);

module.exports = app;
