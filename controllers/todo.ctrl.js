

let Todo = require("../models/todo");
const { check, validationResult } = require('express-validator/check');

module.exports = {
    create,
    recordsby,
    updateTodo,
    all,
    deleteTodo,
    modify
}

function deleteTodo(req, res)
{   
    console.log(req.params);
    Todo.remove({ _id: req.params.id })
        .then(todo => {
            res.status(200).json({
                'type': 'success',
                'message': 'Delete it!'
            });
        })
        .catch(err => {
            res.status(400).send('Error');
        });
}

function create(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log();
      
        return res.status(422).json(
            {   'type' : 'warning',
                'message': errors.array()[0].msg
            }
        );
      }
    console.log(errors);
    console.log(req.body);
    if(req.body.title == '' )
    {
        res.status(400).json(
            {   'type' : 'warning',
                'message': 'Title required!'
            }
        );
        return
    }
     let NewTodo = new Todo(req.body);

    NewTodo.save()
        .then(ntodo => {
            console.log(ntodo);
            res.send(ntodo);
            /*
            res.status(200).json(
                {   'type' : 'success',
                    'message': 'Added successfully'
                }
            );
            */
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
    };

function recordsby(req, res){

    
        Todo.find({"userID" : req.params.userID}, function(err, found_todo)
        {  
            if(err){
      
            res.sendStatus(500);
            return
        }
    return res.send(found_todo);

    })
};



function all(req, res){

    
        Todo.find({}, function(err, found_todo)
        {  
            if(err){
      
            res.sendStatus(500);
            return
        }
    return res.send(found_todo);

    })
};

    function updateTodo(req, res){

   
        Todo.findByIdAndUpdate(req.params.id, { $set: { status: req.params.status }})
        .then(todo => {
            console.log(todo);
            res.status(200).json( {
                'type' : 'success', 
                'message': 'Task updated!'
            } );
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
         
        };   

function modify(req, res){
        
            let idtodo = req.body.todoID;
            let newtittle = req.body.titledit;
           console.log(newtittle);
                    Todo.findByIdAndUpdate(idtodo, { $set: { title: newtittle }}, { new : true})
                    .then(todo => {
                        console.log(todo);
                        //res.send(todo);
                        res.status(200).json( {
                            'response': { 
                                'todo': todo,
                                'msg': {
                                    'type' : 'success', 
                                    'message': 'Task updated!'
                                        }
                                    }
                        } );
                    })
                    .catch(err => {
                        res.status(400).send('Failed to create new record');
                    });
           
            }   
    