![Build Status](https://drone.dayler.io/api/badges/iknpx/nodejs-express-starter/status.svg)
---
# nodejs-express-starter
[Example](http://nodejs-express-starter.tk)

### Stack
* [Express.js](http://expressjs.com)
* [Mongoose](http://mongoosejs.com)
* [Joi](https://github.com/hapijs/joi)
* [ESLint](https://eslint.org)
* [Jest](https://facebook.github.io/jest)
* [Drone CI](https://drone.io/)

### Quick start
* Clone this repo using `git clone git@github.com:iknpx/nodejs-express-starter.git`
* Move to the appropriate directory: cd nodejs-express-starter.
* Run `yarn` or `npm install` to install dependencies.
* Run `npm start` to see the example app at http://localhost:5000.

### Docker start
``docker-compose up --build``

### Run Tests
* `npm test` - default
* `npm test -- -coverage` - coverage

You can `coverageThreshold` props in `package.json` as you need.

### License
MIT license, Copyright (c) 2018 Iakov Salikov. [github.com/iknpx](https://github.com/iknpx)
