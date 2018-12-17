var passport = require('passport');
var mongoose = require('mongoose');
var User = require("../models/user");

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = {
    register,
    login,
    update
}

function register(req, res){

  var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  var ValidEmail = req.body.email.match( pattern );


      console.log(req.body);
      
   if(req.body.username == '')
   {
     res.status(400);
     res.json({
       "type": "error",
       "message" : "Username required!"
     });
   return;
   }

   if(req.body.name == '')
   {
     res.status(400);
     res.json({
       "type": "error",
       "message" : "Name required!"
     });
   return;
   }
   
  if(req.body.email == '')
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Email required!"
    });
  return;
  }

  if(!ValidEmail)
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Please enter a valid email address!"
    });
  return;
  }


  if(req.body.password == '')
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Password required!"
    });
  return;
  }

  if ((req.body.password.length)  < 5 || (req.body.password.length) > 15 ) {
       res.status(400);
       res.json({
        "type": "error",
        "message" : "Password must be between 5 and 15 characters long"
      });
    return;
    
  }
 
    var user = new User();
  
    user.username = req.body.username;
    user.email = req.body.email;
    user.name = req.body.name
    user.setPassword(req.body.password);
    console.log(user);
    user.save(function(err) {
        if(err)
    {
    console.log(err);
    res.sendStatus(500);
    return
    }
      var token;
      token = user.generateJwt();
      res.json({
        "token" : token
      });
      res.status(200);
    });

};

function update(req, res){

  var newpass = false;
  console.log(req.body);
  
  var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  
  var ValidEmail = req.body.email.match( pattern );

  
      
   if(req.body.username == '')
   {
     res.status(400);
     res.json({
       "type": "error",
       "message" : "Username required!"
     });
   return;
   }

   if(req.body.name == '')
   {
     res.status(400);
     res.json({
       "type": "error",
       "message" : "Name required!"
     });
   return;
   }
   
  if(req.body.email == '')
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Email required!"
    });
  return;
  }

  if(!ValidEmail)
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Please enter a valid email address!"
    });
  return;
  }


  if(req.body.password != '')
  {  console.log('hola')
    newpass = true;
  }

  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.name = req.body.name

 

  if(!newpass)
  { console.log("No password")

    console.log(req.body.userID);
    console.log(req.body.email);
    console.log(req.body.name);
    console.log(req.body.username);
    User.findByIdAndUpdate(req.body.userID, { $set:
       { username: req.body.username,
        email: req.body.email,
        name: req.body.name, }
      })
    .then(user => { 
      res.status(200).json( {
          'type' : 'success', 
          'message': 'Updated profile (No password changed)!'
      } );
  })
  .catch(err => {
    
      res.status(400).send('Failed to create new record');
  });
  }
   if(newpass)
  { console.log("New Password ")
    user.setPassword(req.body.password);
   console.log(user);
   User.findByIdAndUpdate(req.body.userID, { $set:
    { username: req.body.username,
      email: req.body.email,
      name: req.body.name, 
      salt : user.salt,
      hash : user.hash 
  }
   })
 .then(user => {
   res.status(200).json( {
       'type' : 'success', 
       'message': 'Updated (Password changed)!'
   } );
})
.catch(err => {
 
   res.status(400).send('Failed to create new record');
});
  }

};


function login(req , res, next){
  var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  var ValidEmail = req.body.email.match( pattern );


      console.log(req.body);
  if(req.body.email == '')
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Email required!"
    });
  return;
  }

  if(!ValidEmail)
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Please enter a valid email address!"
    });
  return;
  }


  if(req.body.password == '')
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Password required!"
    });
  return;
  }

  if ((req.body.password.length)  < 5 || (req.body.password.length) > 15 ) {
       res.status(400);
       res.json({
        "type": "error",
        "message" : "Password must be between 5 and 15 characters long"
      });
    return;
    
  }

  passport.authenticate('local', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
  

}

