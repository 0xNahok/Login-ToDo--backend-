let mongoose = require('mongoose');
let db = require('../libs/db');

module.exports = (()=>
{
let todoSchema = new mongoose.Schema({	
	title: String,
	status: {type: Number, default: 0}, // 0 is new, 1 in progress, 2 Done
	userID: String
});
return mongoose.model('todo', todoSchema);
})();