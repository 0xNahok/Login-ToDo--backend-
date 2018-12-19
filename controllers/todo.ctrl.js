
let User = require("../models/user");
let Todo = require("../models/todo");

module.exports = {
    create,
    recordsby,
    updateTodo,
    all,
    deleteTodo
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
     console.log();

     if(req.body.title)
     {

     }
    NewTodo.save()
        .then(issue => {
            res.status(200).json(
                {   'type' : 'success',
                    'message': 'Added successfully'
                }
            );
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
    };

function recordsby(req, res){
    console.log(req.params);
    
        Todo.find({"userID" : req.params.userID}, function(err, found_todo)
        {  
            if(err){
            console.log(err);
            res.sendStatus(500);
            return
        }
    return res.send(found_todo);

    })
};



function all(req, res){
    console.log(req.params);
    
        Todo.find({}, function(err, found_todo)
        {  
            if(err){
            console.log(err);
            res.sendStatus(500);
            return
        }
    return res.send(found_todo);

    })
};

    function updateTodo(req, res){
        console.log( req.params.id);
        console.log(req.params);
   
        Todo.findByIdAndUpdate(req.params.id, { $set: { status: req.params.status }})
        .then(todo => {
            res.status(200).json( {
                'type' : 'success', 
                'message': 'Task updated!'
            } );
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
         
        }   
