'use strict';

let router = require('express').Router();

let AuthCtrl = require('../../controllers/authentication');
const { check, validationResult } = require('express-validator/check');



router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/update', AuthCtrl.update);
router.post('/reset', AuthCtrl.ForgotP);

module.exports = router;