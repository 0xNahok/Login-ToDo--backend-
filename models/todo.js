let mongoose = require('mongoose');
let db = require('../libs/db');

module.exports = (()=>
{
let todoSchema = new mongoose.Schema({	
	title: String,
	completed: {type: Boolean, default: false},
	userID: String
});
return mongoose.model('todo', todoSchema);
})();