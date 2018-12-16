
let express = require('express');
let router = express.Router();
var app = express();
var jwt = require('express-jwt');

router
    .use('/api/user',  require ('./api/user'))
    .use('/api/auth',  require ('./api/auth'))
    .use('/api/todo',  require ('./api/todo'));
    

module.exports = router;