'use strict';

let router = require('express').Router();
let UserCtrl = require('../../controllers/user.ctrl');
let AuthCtrl = require('../../controllers/authentication');



router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/update', AuthCtrl.update);

module.exports = router;