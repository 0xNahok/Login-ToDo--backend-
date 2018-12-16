'use strict';

let router = require('express').Router();
let UserCtrl = require('../../controllers/user.ctrl');

var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
  });

router.get('/:email', UserCtrl.one);
router.get('/profilee',auth, UserCtrl.profile);
router.get('/todo', auth, UserCtrl.todolist);
router.get('/', UserCtrl.all);
//router.post('/',UserCtrl.create);


module.exports = router;