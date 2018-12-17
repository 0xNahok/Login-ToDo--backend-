'use strict';

let router = require('express').Router();
let UserCtrl = require('../../controllers/user.ctrl');
let TodoCtrl = require('../../controllers/todo.ctrl');


router.get('/:userID', TodoCtrl.recordsby);
router.get('/', TodoCtrl.all);
router.get('/update/:id&:status', TodoCtrl.updateTodo);
router.post('/create', TodoCtrl.create);
router.get('/delete/:id', TodoCtrl.deleteTodo);

module.exports = router;