# nodejs-express-starter
Node.js Express starter with MongoDB

### Features
* [Express.js](http://expressjs.com)
* [Mongoose](http://mongoosejs.com)
* [Joi](https://github.com/hapijs/joi)

### Usage
Just add your own models and routes and have a fun!

### Default enpoints
* ``[GET]: /auth/:email`` - check if email is exist
* ``[POST]: /auth/in`` - authorize user by `email` and `password`
* ``[POST]: /auth/up`` - create user by `email` and `password`
* ``[GET]: /user`` - get user
* ``[PATCH]: /user`` - update user
* ``[DELETE]: /user/session/:uuid`` - remove user session

### TODO
* Socket support
* Tests coverage
