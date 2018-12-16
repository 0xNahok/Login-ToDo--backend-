'use strict';

let router = require('express').Router();
let UserCtrl = require('../../controllers/user.ctrl');
let TodoCtrl = require('../../controllers/todo.ctrl');


router.get('/:userID', TodoCtrl.recordsby);
router.get('/', TodoCtrl.all);
router.get('/delete/:id', TodoCtrl.deleteTodo);
router.post('/create', TodoCtrl.create);

module.exports = router;