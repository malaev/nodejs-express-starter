[![Build Status](https://travis-ci.org/salikovpro/nodejs-express-starter.svg?branch=master)](https://travis-ci.org/salikovpro/nodejs-express-starter)
[![GitHub issues](https://img.shields.io/github/issues/salikovpro/nodejs-express-starter.svg)](https://GitHub.com/salikovpro/nodejs-express-starter/issues/)

# nodejs-express-starter
Node.js Express starter with MongoDB

### Features
* [Express.js](http://expressjs.com)
* [Cors](https://github.com/expressjs/cors)
* [Mongoose](http://mongoosejs.com)
* [Joi](https://github.com/hapijs/joi)
* [Jest](https://facebook.github.io/jest)

### Usage
* Just add your own models and routes
* ``docker-compose up --build``
* Have a fun!

### Running
You must have runned your local MongoDB daemon at `:27017`
* ``make`` - run develop server
* ``make test`` - run local tests

### Default enpoints
* ``[GET]: /auth/:email`` - check if email is exist
* ``[POST]: /auth/in`` - authorize user by `email` and `password`
* ``[POST]: /auth/up`` - create user by `email` and `password`
* ``[GET]: /user`` - get user
* ``[PATCH]: /user`` - update user
* ``[DELETE]: /user/session/:uuid`` - remove user session

### Test
``npm test``

### TODO
* Socket support
* Swagger documentation
* GrpahQL support
