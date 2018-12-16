let mongoose = require('mongoose'),
    config = require('./DB'),
    singleConnection =  false;

module.exports = function() {
    
    if(!singleConnection){
        singleConnection = mongoose.connect("mongodb://admin:admin23@ds247648.mlab.com:47648/todo-app", function(err, result){
           if(err) {
               console.log(err);
               console.error("Error connecting");
           }
           console.log("Connected to DB");
        });

        return singleConnection;
    }
};