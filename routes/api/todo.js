'use strict';

let router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
let TodoCtrl = require('../../controllers/todo.ctrl');


router.get('/:userID', TodoCtrl.recordsby);
router.get('/', TodoCtrl.all);
router.get('/update/:id&:status', TodoCtrl.updateTodo);
router.post('/create', [check('title').isAlphanumeric()], TodoCtrl.create);
router.get('/delete/:id', TodoCtrl.deleteTodo);
router.post('/modify', TodoCtrl.modify);

module.exports = router;