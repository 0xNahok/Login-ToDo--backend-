'use strict';

let router = require('express').Router();

let AuthCtrl = require('../../controllers/authentication');
const { check, validationResult } = require('express-validator/check');



router.post('/register', 
[   check('username').isAlphanumeric().withMessage("Only Alpanumeric is allowed! "),
    check('email').isEmail(),
    check('name').isAlphanumeric().withMessage("Only Alpanumeric is allowed! "),
    check('password').isAlphanumeric().withMessage("Only Alpanumeric is allowed! "),
], AuthCtrl.register);
router.post('/login',
[
    check('email').isEmail(),
    check('password').isAlphanumeric().withMessage("Only Alpanumeric is allowed!")
], AuthCtrl.login);
router.post('/update', AuthCtrl.update);
router.post('/reset', AuthCtrl.ForgotP);

module.exports = router;