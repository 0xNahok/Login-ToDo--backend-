var passport = require('passport');
var mongoose = require('mongoose');
var User = require("../models/user");
const nodemailer = require('nodemailer');

ejs = require('ejs');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = {
    register,
    login,
    update,
    ForgotP
}



function register(req, res){

  var Emailpattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  var ValidEmail = req.body.email.match( Emailpattern );


  
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

  if(req.body.password != req.body.repassword)
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Passwords don't matched!"
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

    user.save(function(err) {
      if(err){
          if(err.code == 11000 )
          { 
            res.status(400);
            res.json({
              "type": 'error',
              "message" : "Email used!"
            });
            
          console.log(err);
        
          return
          }else{
            res.status(400);s
            res.json({
              "type": 'error',
              "message" : "Database down!"
            });
          }

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

function ForgotP(req, res){

  if(req.body.email == '')
  {
    res.status(400);
    res.json({
      "type": "error",
      "message" : "Email required!"
    });
  return;
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    auth: {
        user: 'no-reply@johanmarin.tech',
        pass: 'hola12321'
    }
  });

  var user = new User();
  var randomstring = Math.random().toString(36).slice(-8);
  console.log(req.body);
  console.log(randomstring);
  
  User.findOne({
    email: req.body.email
  },function (err, user) {
    if (user == null)
    {
      res.status(400);
      res.json({
        "type": "error",
        "message" : "Email incorrect!"
      });
      return;
    } 

    // Prints "Space Ghost is a talk show host".
   
    console.log(user);
  }).then((user) => {
     user.setPassword(randomstring);
    user.save().then(() => {
        

            ejs.renderFile(__dirname + "/templates/resetPassword/html.ejs", 
          { name: user.name, username: user.username,
            email: user.email, password: randomstring
          }, function (err, data) {
              if (err) {
                  console.log(err);
              } else {
                  var mainOptions = {
                      from: '"No-reply" no-reply@johanmarin.tech',
                      to: user.email,
                      subject: 'Information recovery',
                      html: data
                  };
                  //console.log("html data ======================>", mainOptions.html);
                  transporter.sendMail(mainOptions, function (err, info) {
                      if (err) {
                          console.log(err);
                      } else 
                      {
                          console.log('Message sent: ' + info.response);
                          res.status(400);
                          res.json({
                            "type": "success",
                            "message" : "Password reset, check your email!"
                          });
                          return;
                      }
                  });
            }
            
            });
            console.log(user) 
          });
  });


};//UserBy

