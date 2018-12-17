
let User = require("../models/user");
let Todo = require("../models/todo");

const nodemailer = require('nodemailer');

ejs = require('ejs');

module.exports = {
    all,
    one,
    create,
    profile,
    todolist
}

function todolist(req, res){
    console.log(req);
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Todo
      .find({"userID" : req.payload._id})
      .exec(function(err, todo) {
        res.status(200).json(todo);
      });

  }

};


    function all(req, res){
        User.find({}, function(err, found_users)
        {  
            if(err){
            console.log(err);
            res.sendStatus(500);
            return
        }
    return res.send(found_users);

    })
    };

    function create(req, res){
    let newuser = new User(req.body);
    console.log(req.body);
    newuser.save(function(err) {
        if(err)
    {
    console.log(err);
    res.sendStatus(500);
    return
    }
    res.sendStatus(200);
    })
    };

    function one(req, res){
        console.log(req.params);
        User.findOne({ email: req.params.email}, function(err, found_users)
        {  
            if(err){
            console.log(err);
            res.sendStatus(500);
            return
        }
    return res.send(found_users);

    })
    };

  

function profile(req, res) {
  console.log(req.payload)
  
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};


 